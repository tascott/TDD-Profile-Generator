const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamMembers = [];

// Block to select the type of employee
let selectEmployeeType = function() {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members"
            ]
        }
    ]).then(function(data) {
        if (data.role === "Engineer") {
            createEngineer();
        } else if (data.role === "Intern") {
            createIntern();
        } else {
            let html = render(teamMembers);
            // Write the HTML file
            fs.writeFile(outputPath, html, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("Success!");
            });
        }
    });
};

// Block to add a manager
let promptManager = function() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "number",
            name: "id",
            message: "What is your id?",
            validate: function(value) {
                const valid = !isNaN(parseInt(value));
                return valid || "Please enter a number";
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?",
            validate: function (email) {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

                return valid || "Please enter a valid email";
            }
        },
        {
            type: "number",
            name: "officeNumber",
            message: "What is your office number?",
            validate: function(value) {
                const valid = !isNaN(parseInt(value));
                return valid || "Please enter a number";
            }
        },
    ]).then(function(data) {
        teamMembers.push(new Manager(data.name, data.id, data.email, data.officeNumber));
        // Add an employee
        selectEmployeeType();
    });
}

// Block to create an engineer and push to teamMembers array
let createEngineer = function() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is their name?"
        },
        {
            type: "number",
            name: "id",
            message: "What is their id?",
            validate: function(value) {
                const valid = !isNaN(parseInt(value));
                return valid || "Please enter a number";
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is their email?",
            validate: function (email) {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

                return valid || "Please enter a valid email";
            }
        },
        {
            type: "input",
            name: "github",
            message: "What is their github?"
        },
    ]).then(function (data) {
        // Add the engineer to the teamMembers array
        teamMembers.push(new Engineer(data.name, data.id, data.email, data.github));
        // Back to add an employee menu
        selectEmployeeType();
    });
}

let createIntern = function () {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is their name?"
        },
        {
            type: "number",
            name: "id",
            message: "What is their id?",
            validate: function(value) {
                const valid = !isNaN(parseInt(value));
                return valid || "Please enter a number";
            }
        },
        {
            type: "input",
            name: "email",
            message: "What is their email?",
            validate: function (email) {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

                return valid || "Please enter a valid email";
            }
        },
        {
            type: "input",
            name: "school",
            message: "What is their school?"
        },
    ]).then(function (data) {
        // Add the intern to the teamMembers array
        teamMembers.push(new Intern(data.name, data.id, data.email, data.school));
        // Back to add an employee menu
        selectEmployeeType();
    });
};

promptManager();
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
            type: "input",
            name: "id",
            message: "What is your id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your office number?"
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
            message: "What is your name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is your github?"
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
            message: "What is your name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
        {
            type: "input",
            name: "school",
            message: "What is your school?"
        },
    ]).then(function (data) {
        teamMembers.push(new Intern(data.name, data.id, data.email, data.school));
        selectEmployeeType();
    });
};

promptManager();
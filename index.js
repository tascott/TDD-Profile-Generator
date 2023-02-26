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

// TODO: add validation to the inquirer prompts

// TODO: Write Code to gather information about the development team members, and render the HTML file.

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
        console.log(data);
        if (data.role === "Engineer") {
            createEngineer();
        } else if (data.role === "Intern") {
            createIntern();
        } else {
            console.log('DONE!!!');
            console.log(teamMembers);
            let html = render(teamMembers);
            fs.writeFile(outputPath, html, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("Success!");
            });
        }
    });
};

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
        console.log(data.role);
        teamMembers.push(new Manager(data.name, data.id, data.email, data.officeNumber));
        selectEmployeeType();
    });
}

let createEngineer = function() {
    console.log('createEngineer!!!')
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
        teamMembers.push(new Engineer(data.name, data.id, data.email, data.github));
        selectEmployeeType();
    });
}

let createIntern = function() {
    console.log('CREATEINTERN!!!')
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
}

promptManager();
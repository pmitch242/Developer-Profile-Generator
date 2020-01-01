const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser(){
    return inquirer.prompt([
        {
            type: "list", 
            message: "What is your favorite color?",
            choies: ["red", "blue", "green", "purple", "black", "orange", "yellow"],
            name: "favColor"
        },
        {
            type: "input",
            message: "What is your github user name?",
            name: "github"
        }
    ]);
}

function generateHTML(answers){
    return `
    
    `
}

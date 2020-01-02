const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "list",
            message: "What is your favorite color?",
            choices: ["red", "blue", "green", "purple", "black", "orange", "yellow"],
            name: "favColor"
        },
        {
            type: "input",
            message: "What is your github user name?",
            name: "username"
        }
    ]);
}

// function generateHTML(answers) {
//     const queryURL = "https://api.github.com/users/" + answers.username;

//     axios.get(queryURL)
//         .then(function (response) {
//             console.log(response);
//         })
// }

promptUser()
    .then(function (answers) {
        const queryURL = "https://api.github.com/users/" + answers.username;

        axios.get(queryURL)
            .then(function (response) {
                console.log(response);
            })
    })

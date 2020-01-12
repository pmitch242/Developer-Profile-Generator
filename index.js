const inquirer = require("inquirer");
const axios = require("axios");
const htmpPDF = require("html-pdf");

// Array of color themes
const colors = {
    green: {
        wrapperBackground: "#E6E1C3",
        headerBackground: "#C1C72C",
        headerColor: "black",
        photoBorderColor: "black"
    },
    blue: {
        wrapperBackground: "#5F64D3",
        headerBackground: "#26175A",
        headerColor: "white",
        photoBorderColor: "#73448C"
    },
    pink: {
        wrapperBackground: "#879CDF",
        headerBackground: "#FF8374",
        headerColor: "white",
        photoBorderColor: "#FEE24C"
    },
    red: {
        wrapperBackground: "#DE9967",
        headerBackground: "#870603",
        headerColor: "white",
        photoBorderColor: "white"
    }
};

// function that askes user for favorite color and github user name
function promptUser() {
    return inquirer.prompt([
        {
            type: "list",
            message: "What is your favorite color?",
            choices: ["red", "blue", "green", "pink"],
            name: "favColor"
        },
        {
            type: "input",
            message: "What is your github user name?",
            name: "username"
        }
    ]);
}

// Function to create html
function generateHTML(answers, response) {

// Return html
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" />
    <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <title>PDF Profile</title>
    <style>

        @page {
            margin: 0;
        }

        *,
        *::after,
        *::before {
            box-sizing: border-box;
        }

        html,
        body {
            padding: 0;
            margin: 0;
        }

        body {
            -webkit-print-color-adjust: exact !important;
            font-family: 'Cabin', sans-serif;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            font-family: 'BioRhyme', serif;
            margin: 0;
        }

        h1 {
            font-size: 3em;
        }

        h2 {
            font-size: 2.5em;
        }

        h3 {
            font-size: 2em;
        }

        h4 {
            font-size: 1.5em;
        }

        h5 {
            font-size: 1.3em;
        }

        h6 {
            font-size: 1.2em;
        }

        html,
        body,
        .wrapper {
            height: 100%;
        }

        .wrapper {
            background-color: ${colors[answers.favColor].wrapperBackground};
            padding-top: 100px;
        }


        .main-div {
            position: relative;
            margin: 0 auto;
            margin-bottom: -50px;
            display: flex;
            margin-right: auto;
            margin-left: auto;
            flex-wrap: wrap;
            background-color: ${colors[answers.favColor].headerBackground};
            color: ${colors[answers.favColor].headerColor};
            padding: 10px;
            width: 95%;
            border-radius: 6px;
        }

        .main-div h1,
        .main-div h2,
        .main-div h5 {
            width: 100%;
            text-align: center;
        }

        .main-div h1 {
            margin-top: 10px;
        }

        .links-nav {
            width: 100%;
            text-align: center;
            padding: 20px 0;
            font-size: 1.1em;
        }

        .nav-link {
            display: inline-block;
            margin: 5px 10px;
        }

        i{
            margin-right: 8px;
        }

        .main-div img {
            width: 250px;
            height: 250px;
            border-radius: 50%;
            object-fit: cover;
            margin-top: -75px;
            display: block;
            margin-left: auto;
            margin-right: auto;
            border: 6px solid ${colors[answers.favColor].photoBorderColor};
            box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
        }

        .info-div {
            background-color: #E9EDEE;
            height: auto;
            padding-top: 30px;
        }

        .container {
            padding: 50px;
            padding-left: 100px;
            padding-right: 100px;
        }

        .row {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .col {
            flex: 1;
            text-align: center;
        }


        .card {
            padding: 20px;
            border-radius: 6px;
            background-color: ${colors[answers.favColor].headerBackground};
            color: ${colors[answers.favColor].headerColor};
            margin: 20px;
        }

        a,
        a:hover {
            text-decoration: none;
            color: inherit;
            font-weight: bold;
        }

        @media print {
            body {
                zoom: .75;
            }
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <div class="main-div">
            <img src="${response.data.avatar_url}" alt="Profile Picture">

            <h1>Hi!</h1>
            <h1>My name is ${response.data.name}!</h1>
            <h5>Currently @ ${response.data.company}</h5>
            <ul class="links-nav">
                <a href="https://www.google.com/maps/search/?api=1&query=${response.data.location}" class="nav-link" target="_blank">
                <h6><i class="fas fa-location-arrow"></i>${response.data.location}</h6>
                </a>
                <a href="https://github.com/pmitch242" class="nav-link" target="_blank">
                    <h6><i class="fab fa-github"></i>GitHub</h6>
                </a>
                <a href="https://pmitch242.github.io" class="nav-link" target="_blank">
                    <h6><i class="fas fa-rss"></i>Blog</h6>
                </a>
            </ul>

        </div>

        <div class="info-div">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h3 style="color: black">${response.data.bio}</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="card">
                            <h3>Public Repositories</h3>
                            <h4>${response.data.public_repos}</h4>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <h3>Followers</h3>
                            <h4>${response.data.followers}</h4>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="card">
                            <h3>GitHub Stars</h3>
                            <h4>7</h4>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <h3>Following</h3>
                            <h4>${response.data.following}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>

</html>`
}

// run promptUser function
promptUser()
    .then(function (answers) {
        // GitHub api link
        const queryURL = "https://api.github.com/users/" + answers.username;

        // axios call for user's github api
        axios.get(queryURL)
            .then(function (response) {
                // User's username
                let username = response.data.login;

                // store the generatered html page
                let html = generateHTML(answers, response);

                // Covert html to a pdf
                htmpPDF.create(html).toFile(`./${username}.pdf`, function (err, res) {
                    if (err) return console.log(err);
                });
                console.log(`Successfully wrote to ${username}.pdf`);
            })

    })
    .catch(function (err) {
        console.log(err);
    });
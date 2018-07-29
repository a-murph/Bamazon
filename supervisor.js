var mysql = require("mysql");
var inquirer = require("inquirer");

//read database password from .env
require("dotenv").config();

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: process.env.ROOT_PASSWORD,
	database: "bamazon_db"
});

inquirer.prompt([
	{
		name: "action",
		message: "What action would you like to take?",
		type: "list",
		choices: ["View Product Sales by Department", "Create New Department"]
	}
]).then(function(answers) {
	switch (answers.action) {
		case "View Product Sales by Department":

			break;

		case "Create New Department":
			
			break;
	}
})
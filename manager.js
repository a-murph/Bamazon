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
		message: "Which action would you like to perform?",
		type: "list",
		options: ["View All Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}
]).then(function(answers) {
	switch (answers.action) {
		case "View All Products":
			break;

		case "View Low Inventory":
			break;

		case "Add to Inventory":
			break;

		case "Add New Product":
			break;
	}
});
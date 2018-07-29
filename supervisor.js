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
		conn
			break;

		case "Create New Department":
			inquirer.prompt([
				{
					name: "name",
					message: "Enter the name of the new department."
				},
				{
					name: "overhead",
					message: "Enter the overhead costs of the new department."
				}
			]).then(function(answers) {
				connection.connect(function(error) {
					var query = connection.query(
						"INSERT INTO departments SET ?",
						{
							name: answers.name,
							overhead: answers.overhead
						},
						function(err, data) {
							console.log("Department added!");
							connection.end();
						}
					);
				});
			});
			break;
	}
})
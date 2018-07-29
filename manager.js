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
		choices: ["View All Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}
]).then(function(answers) {
	switch (answers.action) {
		case "View All Products":
			connection.connect(function(error) {
				if (error) throw error;

				var query = connection.query(
					"SELECT * FROM products",
					function(err, data) {
						for (var i = 0; i < data.length; i++) {
							var item = data[i]; //convenience variable
							console.log("ID: " +item.id +" NAME: " +item.name +" PRICE: $" +item.price +" STOCK: " +item.stock);
						}
						connection.end();
					}
				)
			});
			break;
			
		case "View Low Inventory":
			connection.connect(function(error) {
				if (error) throw error;
	
				var query = connection.query(
					"SELECT * FROM products WHERE stock < 5",
					function(err, data) {
						for (var i = 0; i < data.length; i++) {
							var item = data[i]; //convenience variable
							console.log("ID: " +item.id +" NAME: " +item.name +" STOCK: " +item.stock);
						}
						connection.end();
					}
				)
			});
			break;

		case "Add to Inventory":
			inquirer.prompt([
				{
					name: "itemId",
					message: "Enter the ID of the product you would like to restock."
				},
				{
					name: "numberAdded",
					message: "Enter the number you would like to add to the stock."
				}
			]).then(function(answers) {
				query = connection.query(
					"UPDATE products SET ? + stock WHERE ?",
					[
						{
							stock: answers.numberAdded
						},
						{
							id: answers.itemId
						}
					],
					function(err, data) {
						console.log("Stock updated!");
					}
				);
				console.log(query.sql);
			});
			break;

		case "Add New Product":
			break;
	}
});
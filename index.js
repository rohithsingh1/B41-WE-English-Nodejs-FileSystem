//IIFE TO GENERATE APIS
(() => {
	const express = require("express");

	const app = express();

	const fs = require("fs");

	const location = "dataBase";

	const path = require("path");
	console.log("__dirname = ",__dirname);
	const databasePath = path.join(__dirname,"/database");
	console.log("databasePath = ",databasePath);

	const port = process.env.PORT || 5000;

	const fileData = [];
	app.use(express.static(databasePath));

	function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

	app
		.get("/", (req, res) => {

            //API FOR LANDING AND ALL API INFO.

			res
				.status(200)
				.send(
					"<h1>Welcome to File System</h1><h2>Api 1: /createFile</h2><h2>Api 2: /getAllFiles</h2>"
				);
		})
		.get("/createFile", (req, res) => {

            //API FOR CREATING FILES AT A GIVEN LOCATION.
			const requiredDateFormat = formatDate(new Date())
			const filePath = path.join(databasePath,`${requiredDateFormat}.txt`);
			console.log("filepath = ",filePath);
			fs.writeFile(filePath,
				`${new Date()}`,
				function (err) {
					if (err) throw err;
					console.log("Saved!");
				}
			);

			console.log(new Date());
			res.status(200).send(new Date());
		})
		.get("/getAllFiles", (req, res) => {

            //API FOR SHOWING ALL FILES CREATED USING CREATE API.

			fs.readdir(databasePath, (err, files) => {
				res.status(200).send(files);
				files.forEach((file) => {
					console.log(file);
				});
			});
		})

		.listen(port);
})();

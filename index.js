const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'to_do_db'

});
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (required,response)=>{
	
	response.send("First Program in React by Shaju");
});
app.post("/addwork", (required,response)=>{
	const small_header = required.body.small_header;
	const brief_description = required.body.brief_description;
	const status = required.body.status;
	const insertSql = "INSERT INTO my_to_do_lists (work_title, description, status) VALUES(?,?,?)";
	db.query(insertSql, [small_header, brief_description, status], (error, result)=>{
			console.log(result);
	
	});

});

app.delete("/deletework", (requered,responsed)=>{
	const work_id = requered.query.id;
	console.log(work_id);
	const deleteSql = "Delete FROM my_to_do_lists WHERE id = ?";
	db.query(deleteSql, work_id, (error, result)=>{
			console.log(error);
	
	});


})

app.get("/getworks", (required,response)=>{
	const feachSql = "SELECT * FROM my_to_do_lists";
	db.query(feachSql, (error, result)=>{
			console.log(result);
			response.send(result);
	
	});

});

app.put("/updatestatus", (required,response)=>{

	const nstatus = required.body.newstatus;
	const work_id = required.body.work_id;
	const updatestatusSql = "UPDATE my_to_do_lists SET status = ? WHERE id = ?";
	db.query(updatestatusSql, [nstatus, work_id], (error, result)=>{
			console.log(result);
			
	
	});

});

app.put("/updatedescription", (required,response)=>{

	const ndescription = required.body.newbrief_description;
	const work_id = required.body.work_id;
	const updatestatusSql = "UPDATE my_to_do_lists SET description = ? WHERE id = ?";
	db.query(updatestatusSql, [ndescription, work_id], (error, result)=>{
			console.log(result);
			
	
	});

});

app.listen(3001,() => {
	console.log("Running from 3001");

});
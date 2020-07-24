var express=require("express"); 
var bodyParser=require("body-parser"); 

const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://mittalabhyu:Mittal@cluster0.ocodw.mongodb.net/register?retryWrites=true&w=majority'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

var app=express() 


app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 

app.post('/signup', function(req,res){ 
	var name = req.body.name; 
	var email =req.body.email; 
	var link = req.body.link; 
	var position =req.body.position; 
	var qualification =req.body.qualification; 

	var data = { 
		"name": name, 
		"email":email, 
		"resume":link, 
		"position":position, 
		"qualification":qualification
	} 
db.collection('details').insertOne(data,function(err, collection){ 
		if (err) throw err; 
		console.log("Record inserted Successfully"); 
			
	}); 
		
	return res.redirect('index.html'); 
}) 


app.get('/',function(req,res){ 
res.set({ 
	'Access-control-Allow-Origin': '*'
	}); 
return res.redirect('index.html'); 
}).listen(3000) 


console.log("server listening at port 3000"); 

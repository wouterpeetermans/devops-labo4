var express = require('express');
var mysql      = require('mysql');
var bodyparser = require('body-parser');

var connection = mysql.createConnection({
  host     : 'mysql',
  user     : 'root',
  password : 'supersecret',
  database : 'employees'
});




var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('client'));
app.use(bodyparser.json());

app.get('/api/employees', function(req,res){
  connection.query('SELECT * FROM employees', function (error, results, fields) {
    if (error){
      console.log("connection failed" + error);
      res.status(500).json(null);
      return
    }
    res.status(200).json(results);
  });
});

app.get('/api/:id', function(req,res){
  connection.query('SELECT * FROM employees WHERE emp_no = ' + req.params.id, function (error, results, fields) {
    if (error){
      console.log("connection failed" + error);
      res.status(500).json(null);
      return
    }
    res.status(200).json(results);
  });
});

app.listen(3000);

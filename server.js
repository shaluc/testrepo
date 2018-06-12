
	
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql= require('mysql');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tejamahi@143',
    database: 'nodeapidatabase',   
     multipleStatements: true,
     insecureAuth : true
    
});


 
// connect to database
mc.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

// default route
app.get('/', function (req, res) {
    mc.query('SELECT * FROM tasks', function (error, results, fields) {
        if (error) {
           // throw error;
            console.log('Get connection failed \n Error : ' + JSON.stringify(error, undefined, 2));
            mc.connect();
        }else{
        return res.send({ error: false, data: results, message: 'Todos list.' });
        console.log("Hiii"+results);
        }
    });
});
/*app.post('/', function (req, res) {
    const product={
        name:req.body.name,
        price:req.body.price
    }
  res.status(201).json({
      message:"posting todos api",
     data: product
     
  })
});
app.post('/', function (req, res) {
       let task = req.body;
        console.log("task:"+''+task);
       if (!task) {
        console.log('post api error');
         
       }
    
       mc.query("INSERT INTO tasks SET ? ", { task: task }, function (error, results, fields) {
           if (error) throw error;
           return res.send({ error: false, data: results, message: 'New task has been created successfully.' });
       });
   });
    */
   app.post('/tgtgt', function (req, res) {
    let task = 
    {
        "id":req.body.id,
        "candname":req.body.candname,  
        "candphn":req.body.candphn,
        "candfax":req.body.candfax,
        "candemail":req.body.candemail,
        "candstreet1":req.body.candstreet1,
        "candstreet2":req.body.candstreet2,
        "candcity":req.body.candcity,
        "candstate":req.body.candstate,
        "candzipcode":req.body.contzipcode,
        "contfname":req.body.contfname,
        "contlname":req.body.contlname,
        "contphn":req.body.contphn,
        "contemail":req.body.contemail,
        "logemail":req.body.logemail,
        "logpwd":req.body.logpwd
    }
    
     console.log("task id:"+''+task.id);
    if (!task) {
     console.log('post api error');
      
    }
 
    mc.query("INSERT INTO candidateregform (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,)", [task.id,
        task.candname,  
        task.candphn,
        task.candfax,
        task.candemail,
        task.candstreet1,
        task.candstreet2,
        task.candcity,
        task.candstate,
        task.contzipcode,
        task.contfname,
        task.contlname,
        task.contphn,
        task.contemail,
        task.logemail,
        task.logpwd
    ], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New task has been created successfully.' });
    });
});
app.post('/candidate', function (req, res) {
    var postData  = req.body;
    mc.query('INSERT INTO candidateregform SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
 });
 
 
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
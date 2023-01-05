const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3001
app.use(bodyParser.json())
var cors = require('cors')
require('dotenv').config();


app.use(cors())

let mysql = require('mysql');
const { json } = require('body-parser')

let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});


connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/getUsers', (req, res) => {
    connection.query('SELECT * FROM userdata', function(err, result) {
        console.log("get user", result)
        if (err) {
            res.status(200).send(JSON.stringify([]));
        }
        res.status(200).send(JSON.stringify(result));
    });
});

app.post('/addUser', (req, res) => {
    console.log('Got body:', req.body);
    const query = `insert into userdata (first_name, last_name, age, course) VALUES ('${req.body.first_name}', '${req.body.last_name}', ${req.body.age}, '${req.body.course}');`
    console.log("query", query)
    connection.query(query, function(err, result) {
        console.log("add user", result)
        if (err) {
            console.log("error", err)
            res.status(200).send({
                status: false,
                message: err.sqlMessage
            });
        }
        res.status(200).send({
            status: true,
            message: "User has been added successfully"
        });
    });
});

app.post('/multiAddUser', (req, res) => {
    console.log('Got body:', req.body);
    const data = req.body.user_data
    data.forEach(element => {
        const query = `insert into userdata (first_name, last_name, age, course) VALUES ('${element.first_name}', '${element.last_name}', ${element.age}, '${element.course}');`
        console.log("query", query)
        connection.query(query, function(err, result) {
            console.log("add user", result)
            if (err) {
                console.log("error", err)
                res.status(200).send({
                    status: false,
                    message: err.sqlMessage
                });
            }
        });
    });
        res.status(200).send({
            status: true,
            message: "User has been added successfully"
        });
});

app.put('/updateUser', (req, res) => {
    console.log('Got body:', req.body);
    const query = `update userdata set first_name='${req.body.first_name}', last_name='${req.body.last_name}', age=${req.body.age}, course='${req.body.course}' where id=${req.body.id};`
    connection.query(query, function(err, result) {
        console.log("add user", result)
        if (err) {
            console.log("error", err)
            res.status(200).send({
                status: false,
                message: err.sqlMessage
            });
        }
        res.status(200).send({
            status: true,
            message: "User has been update successfully"
        });
    });
});

app.delete('/deleteUser', (req, res) => {
    console.log('Got body:', req.body);
    const query = `delete from userdata where id=${req.body.id};`
    connection.query(query, function(err, result) {
        console.log("add user", result)
        if (err) {
            console.log("error", err)
            res.status(200).send({
                status: false,
                message: err.sqlMessage
            });
        }
        res.status(200).send({
            status: true,
            message: "User has been deleted successfully"
        });
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
var mysql = require('mysql');

const con=mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'simpleapi',
    password:'basak'
})
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
}); 

module.exports=con;
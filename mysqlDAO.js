const { resolve } = require('promise');
var mysql = require('promise-mysql');

//connect to mysql
var pool
mysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: '0865663393',
    database: 'PPit'
})
    .then((result) => {
        pool = result
    })
    .catch((error) => {
        console.log(error)
    });

//display food recipe details
var getFood = function () {
    return new Promise((resolve, reject) => {

        pool.query('select * from food')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//display employee details
var getEmp = function () {
    return new Promise((resolve, reject) => {

        pool.query("select Empno, name, lname, job, salary, Date_Format(hiredate, '%d/%m/%Y') AS hiredate FROM employee;")
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//display supplier details
var getSup = function () {
    return new Promise((resolve, reject) => {

        pool.query('select * from supplier')
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//display booking details
var getBook = function () {
    return new Promise((resolve, reject) => {

        pool.query("select bookingNo, Date_Format(bookingDate, '%d/%m/%Y') AS bookingDate, name, quantity, bookedBy,phone, tableNo FROM booking;")
            .then((result) => {
                resolve(result)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

//add food function
var addFood = function(fid, fname, ingredient, method){
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: "INSERT INTO food VALUES(?, ?, ?, ?)",
            values: [fid,fname, ingredient, method]
        }
        pool.query(myQuery)
        .then((result) => {
            resolve(result)

        })
        .catch((error) =>{
            reject(error)
        })
    })
}

//function to check if co_code in use
var isFidInUse = function(fid){
    return new Promise((resolve,reject)=>{
        pool.query('select COUNT(*) AS total FROM food WHERE fid = ?',
        [fid], function(error, result, fields){
            if(!error){
                console.log("Food Code COUNT : "+result[0].total);
                return resolve(result[0].total > 0);
            } else {
                return reject(new Error('Database error!!'));
            }
        });
    })
}

//function to update Food details
var updateFood = function(fid,fname,ingredient,method) {
    return new Promise((resolve, reject) =>{
        var myQuery = {
            sql: 'UPDATE food SET fname=?, ingredient=?, method=? WHERE fid=?',
            values:[fid,fname, ingredient,method]
        }
        pool.query(myQuery)
        .then((result) => {
            resolve(result)

        })
        .catch((error) =>{
            reject(error)
        })
    })
}

//delete food fucntion
var deleteFood = function(fid) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'delete from food where fid = ?',
            values: [fid]
        }
        pool.query(myQuery)
        .then((result) => {
            resolve(result)

        })
        .catch((error) =>{
            reject(error)
        })
    })
}


//add Emp function
var addEmp = function(Empno, name, lname, job, hiredate, salary){
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: "INSERT INTO employee VALUES(?, ?, ?, ?, ?, ?)",
            values: [Empno, name, lname, job, hiredate, salary]
        }
        pool.query(myQuery)
        .then((result) => {
            resolve(result)

        })
        .catch((error) =>{
            reject(error)
        })
    })
}

//check if employee number is in used
var isEmpnoInUse = function(Empno){
    return new Promise((resolve,reject)=>{
        pool.query('select COUNT(*) AS total FROM employee WHERE Empno = ?',
        [Empno], function(error, result, fields){
            if(!error){
                console.log("emp Code COUNT : "+result[0].total);
                return resolve(result[0].total > 0);
            } else {
                return reject(new Error('Database error!!'));
            }
        });
    })
}

//delete employee fucntion
var deleteEmp = function(Empno) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'delete from employee where Empno = ?',
            values: [Empno]
        }
        pool.query(myQuery)
        .then((result) => {
            resolve(result)

        })
        .catch((error) =>{
            reject(error)
        })
    })
}

//function to update Employee details
var updateEmp = function(Empno, name, lname, job, hiredate, salary) {
    return new Promise((resolve, reject) =>{
        var myQuery = {
            sql: 'UPDATE employee SET name=?, lname=?, job=?, hiredate=?, salary=? WHERE Empno=?',
            values:[Empno, name, lname, job, hiredate, salary]
        }
        pool.query(myQuery)
        .then((result) => {
            resolve(result)

        })
        .catch((error) =>{
            reject(error)
        })
    })
}


//export
module.exports = {getFood ,getEmp, getSup, getBook, addFood,isFidInUse, updateFood, deleteFood, addEmp, isEmpnoInUse, deleteEmp, updateEmp}
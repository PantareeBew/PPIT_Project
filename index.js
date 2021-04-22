var express = require('express')
var mysqlDAO = require('./mysqlDAO')
var bodyParser = require('body-parser')
const { body, validationResult, check } = require('express-validator')
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render("home")
})

//Get city details Page
app.get('/food', (req, res) => {
    mysqlDAO.getFood()
        .then((result) => {
            console.log("Food OK")
            res.render('food', { foods: result })
        })
        .catch((error) => {
            res.send(error)
        })
})//end get city

//get employee deatils page
app.get('/employee', (req, res) => {
    mysqlDAO.getEmp()
        .then((result) => {
            console.log("employee OK")
            res.render('employee', { employees: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

//get supplier deatils page
app.get('/supplier', (req, res) => {
    mysqlDAO.getSup()
        .then((result) => {
            console.log("supplier OK")
            res.render('supplier', { suppliers: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

//get booking deatils page
app.get('/booking', (req, res) => {
    mysqlDAO.getBook()
        .then((result) => {
            console.log("booking OK")
            res.render('booking', { bookings: result })
        })
        .catch((error) => {
            res.send(error)
        })
})

//get addfood
app.get('/addFood', (req, res) => {
    res.render("addFood", { errors: undefined, fid: req.body.fid, fname: req.body.fname, ingredient: req.body.ingredient, method: req.body.method })
})

//post addFood page
app.post('/addFood',
    [
        //check fid input length
        check('fid').isLength({ min: 1, max: 3 }).withMessage("Food Code must not exceed 3 characters or less than 1 character"),
        //check food name if input 
        check('fname').isLength({ min: 1 }).withMessage("Please enter Food name"),
        //check food ingredient if input 
        check('ingredient').isLength({ min: 1 }).withMessage("Please enter Ingredient"),
        //check food method if input 
        check('method').isLength({ min: 1 }).withMessage("Please enter Method"),
        //check id if exist
        check('fid')
            .exists()
            .custom(async fid => {
                const value = await mysqlDAO.isFidInUse(fid);
                if (value) {
                    throw new Error('Error: Food Id' + fid + ' is already exist')
                }
            })
    ],
    //,fid:req.body.fid, fname: req.body.fname, ingredient: req.body.ingredient, method: req.body.method
    (req, res) => {
        var errors = validationResult(req)
        //error in add food page
        if (!errors.isEmpty()) {
            res.render("addFood", { errors: errors.errors })
            console.log("Error in adding new food details")
            //console.log(error)
        }
        else {
            mysqlDAO.addFood(req.body.fid, req.body.fname, req.body.ingredient, req.body.method)
                .then((result) => {
                    return res.redirect('/food')
                })
                .catch((error) => {
                    res.send(error)
                    //console.log("Error in adding Food page")
                    //console.log(error)
                })
        }
    })

//GET to updating food details page
app.get('/updateFood/:fid', (req, res) => {
    var code = req.params.fid
    mysqlDAO.getFood()
        .then((result) => {
            result.forEach(foods => {
                if (code == foods.fid) {
                    res.render('updateFood', { errors: undefined, fid: code, fname: foods.fname, ingredient: foods.ingredient, method: foods.method })
                }
            })
        })
})

//POST update food details
app.post('/updateFood/:fid',
    [
        //check co_code if edited, then error message display
        check('fid').custom((value, { req }) => {
            console.log('code: ' + req.params.fid + 'updated')

            if (value !== req.params.fid) {
                throw new Error("Sorry cannot update food code")
            } else { return true }
        })
    ],
    (req, res) => {
        var errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render('updateFood', { errors: errors.errors, fid: req.body.fid, fname: req.body.fname, ingredient: req.body.ingredient, method: req.body.method })
        } else {
            mysqlDAO.updateFood(req.body.fname, req.body.ingredient, req.body.method, req.body.fid)
                .then((result) => {
                    return res.redirect('/food')
                })
                .catch((error) => {
                    res.send(error)
                    console.log(error)
                    console.log("Error in edit food page")
                })
        }
    })

//delete Food selected data
app.get('/deleteFood/:foodId', (req, res) => {
    mysqlDAO.deleteFood(req.params.foodId)
        .then((result) => {
            return res.redirect('/food')
        })
        .catch((error) => {

            /*     if (error.code == "ER_ROW_IS_REFERENCED_2") {
                     res.send("<h3>ERROR: " + error.errno + " cannot delete food with code: " + req.params.foodId + " as it has associated city table</h3> <br><br><p> <a href='http://localhost:5000' >HOME</a> </button><p>")
                 } else {*/
            res.send("<h3>ERROR: " + error.errno + " " + error.sqlMessage + "</h3>")
            //  }
            //  res.send(error)
            console.log('Error in deleting food data')
        })
})

//get addEmployee
app.get('/addEmp', (req, res) => {
    res.render("addEmp", { errors: undefined, Empno: req.body.Empno, name: req.body.name, lname: req.body.lname, job: req.body.job, hiredate: req.body.hiredate, salary: req.body.salary })
    //, Empno: req.body.Empno, name: req.body.name, lname: req.body.lname, job:req.body.job, hiredate:req.body.hiredate, salary:req.body.salary 
})

//post addEmployee page
app.post('/addEmp',
    [
        //check employee Number input length
        check('Empno').isLength({ min: 1, max: 3 }).withMessage("Employee Code must not exceed 3 characters or less than 1 character"),
        //check employee name if input 
        check('name').isLength({ min: 2 }).withMessage("Please enter Employee name"),
        //check employee Last name if input 
        check('lname').isLength({ min: 2 }).withMessage("Please enter Employee Last Name"),
        //check employee job if input 
        check('job').isLength({ min: 2 }).withMessage("Please enter Employee Job"),
        //check employee method if input 
        check('salary').isNumeric({ min: 3 }).withMessage("Please enter Employee salary"),
        //check id if exist
        check('Empno')
            .exists()
            .custom(async Empno => {
                const value = await mysqlDAO.isEmpnoInUse(Empno);
                if (value) {
                    throw new Error('Error: Employee Number' + Empno + ' is already exist')
                }
            })
    ],
    //,fid:req.body.fid, fname: req.body.fname, ingredient: req.body.ingredient, method: req.body.method
    (req, res) => {
        var errors = validationResult(req)
        //error in add food page
        if (!errors.isEmpty()) {
            res.render("addEmp", { errors: errors.errors })
            //console.log(error)
            console.log("Error in adding new employee details")
            //console.log(error)
        }
        else {
            mysqlDAO.addEmp(req.body.Empno, req.body.name, req.body.lname, req.body.job, req.body.hiredate, req.body.salary)
                .then((result) => {
                    return res.redirect('/employee')
                })
                .catch((error) => {
                    res.send(error)
                    console.log("Error in adding employee page")
                    //console.log(error)
                })
        }
    })

//delete employee selected data
app.get('/deleteEmp/:empId', (req, res) => {
    mysqlDAO.deleteEmp(req.params.empId)
        .then((result) => {
            return res.redirect('/employee')
        })
        .catch((error) => {

            /*     if (error.code == "ER_ROW_IS_REFERENCED_2") {
                     res.send("<h3>ERROR: " + error.errno + " cannot delete food with code: " + req.params.foodId + " as it has associated city table</h3> <br><br><p> <a href='http://localhost:5000' >HOME</a> </button><p>")
                 } else {*/
            res.send("<h3>ERROR: " + error.errno + " " + error.sqlMessage + "</h3>")
            //  }
            //  res.send(error)
            console.log('Error in deleting employee data')
        })
})

//GET to updating employee details page
app.get('/updateEmp/:Empno', (req, res) => {
    var code = req.params.Empno
    mysqlDAO.getEmp()
        .then((result) => {
            result.forEach(employees => {
                if (code == employees.Empno) {           //Empno: req.body.Empno, name: req.body.name, lname: req.body.lname, job: req.body.job, hiredate: req.body.hiredate, salary: req.body.salary 
                    res.render('updateEmp', { errors: undefined, Empno: code, name: employees.name, lname: employees.lname, job: employees.job, hiredate: employees.hiredate,  salary: employees.salary})
                }
            })
        })
})

//POST update employee details
app.post('/updateEmp/:Empno',
    [
        //check empno if edited, then error message display
        check('Empno').custom((value, { req }) => {
            console.log('code: ' + req.params.Empno + 'updated')

            if (value !== req.params.Empno) {
                throw new Error("Sorry cannot update employee code")
            } else { return true }
        })
    ],
    (req, res) => {
        var errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.render('updateEmp', { errors: errors.errors, Empno: req.body.Empno, name: req.body.name, lname: req.body.lname, job: req.body.job, hiredate: req.body.hiredate, salary: req.body.salary })
        } else {
            mysqlDAO.updateEmp( req.body.name, req.body.lname, req.body.job, req.body.hiredate, req.body.salary, req.body.Empno)
                .then((result) => {
                    return res.redirect('/employee')
                })
                .catch((error) => {
                    res.send(error)
                    console.log(error)
                    console.log("Error in edit employee page")
                })
        }
    })

//Listening on port 3000
app.listen(3000, (err) => {
    if (err) console.error('Unable to connect the server: ', err);
    console.log("Listening on port 3000");
})




























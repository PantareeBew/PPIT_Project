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

//Get city details Page
app.get('/food', (req, res) => {
    mysqlDAO.getSearchFood()
        .then((result) => {
            console.log("Search Food OK")
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
            res.send("<h3>ERROR: " + error.errno + " " + error.sqlMessage + "</h3>")
            console.log('Error in deleting food data')
        })
})

//get addEmployee
app.get('/addEmp', (req, res) => {
    res.render("addEmp", { errors: undefined, Empno: req.body.Empno, name: req.body.name, lname: req.body.lname, job: req.body.job, hiredate: req.body.hiredate, salary: req.body.salary })
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
        //error in add employee page
        if (!errors.isEmpty()) {
            res.render("addEmp", { errors: errors.errors })
            //console.log(error)
            console.log("Error in adding new employee details")
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
            res.send("<h3>ERROR: " + error.errno + " " + error.sqlMessage + "</h3>")
            console.log('Error in deleting employee data')
        })
})

//GET to updating employee details page
app.get('/updateEmp/:Empno', (req, res) => {
    var code = req.params.Empno
    mysqlDAO.getEmp()
        .then((result) => {
            result.forEach(employees => {
                if (code == employees.Empno) {
                    res.render('updateEmp', { errors: undefined, Empno: code, name: employees.name, lname: employees.lname, job: employees.job, hiredate: employees.hiredate, salary: employees.salary })
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
            mysqlDAO.updateEmp(req.body.name, req.body.lname, req.body.job, req.body.hiredate, req.body.salary, req.body.Empno)
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

//get add Booking
app.get('/addBook', (req, res) => {
    res.render("addBook", { errors: undefined, bookingNo: req.body.bookingNo, bookingDate: req.body.bookingDate, name: req.body.name, quantity: req.body.quantity, bookedBy: req.body.bookedBy, phone: req.body.phone, tableNo: req.body.tableNo })
})

//post add Booking page
app.post('/addBook',
    [
        //check bookingNo input length
        check('bookingNo').isLength({ min: 1, max: 3 }).withMessage("Booking Number must not exceed 3 characters or less than 1 character"),
        //check bookingDate if input 
        check('bookingDate').notEmpty().withMessage("Please enter Booking Date"),
        //check name if input 
        check('name').isLength({ min: 1 }).withMessage("Please enter Name"),
        //check quantity if input 
        check('quantity').isLength({ min: 1 }).withMessage("Please enter quantity of people"),
        //check bookedBy if input 
        check('bookedBy').isLength({ min: 1 }).withMessage("Please choose way of booking"),
        //check phone if input 
        check('phone').isLength({ min: 1, max: 10 }).withMessage("Please enter phone number"),
        //check tableNo if input 
        check('tableNo').isLength({ min: 1, max: 3 }).withMessage("Please enter table number number"),
        //check id if exist
        check('bookingNo')
            .exists()
            .custom(async bookingNo => {
                const value = await mysqlDAO.isBookingNoInUse(bookingNo);
                if (value) {
                    throw new Error('Error: Booking Number' + bookingNo + ' is already exist')
                }
            })
    ],
    (req, res) => {
        var errors = validationResult(req)
        //error in add book page
        if (!errors.isEmpty()) {
            res.render("addBook", { errors: errors.errors })
            console.log("Error in adding new Booking details")
            //  console.log(error)
        }
        else {
            mysqlDAO.addBook(req.body.bookingNo, req.body.bookingDate, req.body.name, req.body.quantity, req.body.bookedBy, req.body.phone, req.body.tableNo)
                .then((result) => {
                    return res.redirect('/booking')
                })
                .catch((error) => {
                    res.send(error)
                })
        }
    })


//delete booking data by selected id
app.get('/deleteBook/:bookingNo', (req, res) => {
    mysqlDAO.deleteBook(req.params.bookingNo)
        .then((result) => {
            return res.redirect('/booking')
        })
        .catch((error) => {
            res.send("<h3>ERROR: " + error.errno + " " + error.sqlMessage + "</h3>")
            console.log('Error in deleting booking data')
        })
})

//GET to updating booking details page
app.get('/updateBook/:bookingNo', (req, res) => {
    var code = req.params.bookingNo
    mysqlDAO.getBook()
        .then((result) => {
            result.forEach(bookings => {
                if (code == bookings.bookingNo) {
                    res.render('updateBook', { errors: undefined, bookingNo: code, bookingDate: bookings.bookingDate, name: bookings.name, quantity: bookings.quantity, bookedBy: bookings.bookedBy, phone: bookings.phone, tableNo: bookings.tableNo })
                }
            })
        })
})

//POST update booking details
app.post('/updateBook/:bookingNo',
    [
        //check bookingNo if edited, then error message display
        check('bookingNo').custom((value, { req }) => {
            console.log('code: ' + req.params.bookingNo + 'updated')

            if (value !== req.params.bookingNo) {
                throw new Error("Sorry cannot update booking number")
            } else { return true }
        }),
        //check if input 
        check('bookingDate').notEmpty().withMessage("Please fill in booking date"),
        check('name').notEmpty().withMessage("Please fill in customer name"),
        check('quantity').notEmpty().withMessage("Please fill in quantity of people"),
        check('bookedBy').notEmpty().withMessage("Please fill in bookedBy"),
        check('phone').notEmpty().withMessage("Please fill in phone number"),
        check('tableNo').notEmpty().withMessage("Please fill in table number")
    ],
    (req, res) => {
        var errors = validationResult(req)
        if (!errors.isEmpty()) { //bookingNo, bookingDate, name, quantity, bookedBy, phone, tableNo
            res.render('updateBook', { errors: errors.errors, bookingNo: req.body.bookingNo, bookingDate: req.body.bookingDate, name: req.body.name, quantity: req.body.quantity, bookedBy: req.body.bookedBy, phone: req.body.phone, tableNo: req.body.tableNo })
        } else {
            mysqlDAO.updateBook(req.body.bookingDate, req.body.name, req.body.quantity, req.body.bookedBy, req.body.phone, req.body.tableNo, req.body.bookingNo)
                .then((result) => {
                    return res.redirect('/booking')
                })
                .catch((error) => {
                    res.send(error)
                    console.log(error)
                    console.log("Error in edit booking page")
                })
        }
    })

//get add Supplier
app.get('/addSup', (req, res) => { //sid, sname, product, dday, phoneNo
    res.render("addSup", { errors: undefined, sid: req.body.sid, sname: req.body.sname, product: req.body.product, dday: req.body.dday, phoneNo: req.body.phoneNo })
})

//post add Booking page
app.post('/addSup',
    [
        //check sid input length
        check('sid').isLength({ min: 1, max: 3 }).withMessage("Supplier Number must not exceed 3 characters or less than 1 character"),
        //check sname if input 
        check('sname').isLength({ min: 1 }).withMessage("Please enter Supplier Name"),
        //check product if input 
        check('product').isLength({ min: 1 }).withMessage("Please enter Product"),
        //check dday if input 
        check('dday').isLength({ min: 1 }).withMessage("Please enter Delivery Day"),
        //check phoneNo if input 
        check('phoneNo').isLength({ min: 1, max: 10 }).withMessage("Please enter phone number"),
        //check id if exist
        check('sid')
            .exists()
            .custom(async sid => {
                const value = await mysqlDAO.isSidInUse(sid);
                if (value) {
                    throw new Error('Error: Supplier Number' + sid + ' is already exist')
                }
            })
    ],
    (req, res) => {
        var errors = validationResult(req)
        //error in add supplier page
        if (!errors.isEmpty()) {
            res.render("addSup", { errors: errors.errors })
            console.log("Error in adding new Supplier details")
            //  console.log(error)
        }
        else {
            mysqlDAO.addSup(req.body.sid, req.body.sname, req.body.product, req.body.dday, req.body.phoneNo)
                .then((result) => {
                    return res.redirect('/supplier')
                })
                .catch((error) => {
                    res.send(error)
                })
        }
    })

//delete supplier data by selected id
app.get('/deleteSup/:sid', (req, res) => {
    mysqlDAO.deleteSup(req.params.sid)
        .then((result) => {
            return res.redirect('/supplier')
        })
        .catch((error) => {
            res.send("<h3>ERROR: " + error.errno + " " + error.sqlMessage + "</h3>")
            console.log('Error in deleting supplier data')
        })
})


//GET to updating supplier details page
app.get('/updateSup/:sid', (req, res) => {
    var code = req.params.sid
    mysqlDAO.getSup()
        .then((result) => {
            result.forEach(suppliers => {
                if (code == suppliers.sid) { //sid, sname, product, dday, phoneNo
                    res.render('updateSup', { errors: undefined, sid: code, sname: suppliers.sname, product: suppliers.product, dday: suppliers.dday, phoneNo: suppliers.phoneNo })
                }
            })
        })
})

//POST update supplier details
app.post('/updateSup/:sid',
    [
        //check sid if edited, then error message display
        check('sid').custom((value, { req }) => {
            console.log('code: ' + req.params.sid + 'updated')

            if (value !== req.params.sid) {
                throw new Error("Sorry cannot update Supplier number")
            } else { return true }
        }),

        //check if input 
        check('sname').notEmpty().withMessage("Please fill in Supplier name"),
        check('product').notEmpty().withMessage("Please fill in Product"),
        check('dday').notEmpty().withMessage("Please fill in Delivery Day"),
        check('phoneNo').notEmpty().withMessage("Please fill in Phone number")
    ],
    (req, res) => {
        var errors = validationResult(req)
        if (!errors.isEmpty()) { //sid, sname, product, dday, phoneNo
            res.render('updateSup', { errors: errors.errors, sid: req.body.sid, sname: req.body.sname, product: req.body.product, dday: req.body.dday, phoneNo: req.body.phoneNo })
        } else {
            mysqlDAO.updateSup(req.body.sname, req.body.product, req.body.dday, req.body.phoneNo, req.body.sid)
                .then((result) => {
                    return res.redirect('/supplier')
                })
                .catch((error) => {
                    res.send(error)
                    console.log(error)
                    console.log("Error in edit supplier page")
                })
        }
    })

//Listening on port 3000
app.listen(3000, (err) => {
    if (err) console.error('Unable to connect the server: ', err);
    console.log("Listening on port 3000");
})




























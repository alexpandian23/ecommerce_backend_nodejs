// const express = require("express")
// const router = express.Router()

// const AuthController=require('../controller/AuthController')

// router.post("/form/signup",AuthController.signup)

// module.exports = router
const express = require('express')
const router = express.Router()

const AuthController = require('../controller/AuthController')

router.post("/form/signup",AuthController.register)
router.post("/form/login",AuthController.login)

router.get("/form/getdetails",AuthController.getdetails)

module.exports = router
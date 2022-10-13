const express = require('express')
//
const{ loginUser,signupUser}= require('../controllers/UserController')

const router = express.Router()


//login router
router.post('/login',loginUser)
//signup route
router.post('/signup',signupUser)




module.exports = router
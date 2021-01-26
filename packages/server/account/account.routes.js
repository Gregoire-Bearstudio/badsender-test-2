'use strict'

const express = require('express')
const createError = require('http-errors')
const passport = require('passport')

const router = express.Router()

const users = require('../user/user.controller.js')

router.post(
  `/login`,
  passport.authenticate(`local`),
  (req, res ) => {
    console.log("Retour login")
    res.end("TODO");
  }
)
router.get(`/:username`, users.getPublicProfile)
router.delete(`/:email/password`, users.forgotPassword)
router.put(`/:email/password/:token`, users.setPassword)

// catch anything and forward to error handler
router.use((req, res, next) => {
  console.log(req.path)
  next(new createError.NotImplemented())
})

module.exports = router

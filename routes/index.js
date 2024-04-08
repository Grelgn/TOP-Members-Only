const express = require('express');
const router = express.Router();

// Require controller modules.
const user_controller = require("../controllers/userController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Members Only' });
});

// GET request for creating a User. NOTE This must come before routes that display User (uses id).
router.get("/sign-up", user_controller.user_signup_get);

// POST request for creating a User.
router.post("/sign-up", user_controller.user_signup_post);

module.exports = router;

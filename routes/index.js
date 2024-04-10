const express = require("express");
const router = express.Router();

// Require controller modules.
const user_controller = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Members Only", user: req.user });
});

// GET request for creating a User.
router.get("/sign-up", user_controller.user_signup_get);

// POST request for creating a User.
router.post("/sign-up", user_controller.user_signup_post);

// GET request for Log-in page.
router.get("/log-in", user_controller.user_login_get);

// POST request for Log-in page.
router.post("/log-in", user_controller.user_login_post);

module.exports = router;

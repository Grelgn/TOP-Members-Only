const express = require("express");
const router = express.Router();

// Require controller modules.
const user_controller = require("../controllers/userController");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Members Only", user: res.locals.currentUser});
});

// GET request for creating a User.
router.get("/sign-up", user_controller.user_signup_get);

// POST request for creating a User.
router.post("/sign-up", user_controller.user_signup_post);

// GET request for Log-in page.
router.get("/log-in", user_controller.user_login_get);

// POST request for Log-in page.
router.post("/log-in", user_controller.user_login_post);

// GET request for Join page.
router.get("/join", user_controller.user_join_get);

// POST request for Join page.
router.post("/join", user_controller.user_join_post);

module.exports = router;

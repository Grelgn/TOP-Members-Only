const Message = require("../models/message");
const express = require("express");
const router = express.Router();

// Require controller modules.
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

/* GET home page. */
router.get("/", async function (req, res, next) {
	res.render("index", {
		title: "Members Only",
		messages: await Message.find().sort({ timestamp: -1 }).populate("user"),
	});
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

// GET request for New Message.
router.get("/new-message", message_controller.new_message_get);

// POST request for New Message.
router.post("/new-message", message_controller.new_message_post);

module.exports = router;

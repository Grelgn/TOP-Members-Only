const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

//  Create new message GET
exports.new_message_get = (req, res, next) => {
	res.render("new_message", { title: "Send a New Message" });
};

//  Create new message POST
exports.new_message_post = [
	body("title")
		.trim()
		.notEmpty()
		.escape()
		.withMessage("Title must be specified.")
		.isLength({ max: 50 })
		.withMessage("Title can't be more than 50 characters"),
	body("text")
		.trim()
		.notEmpty()
		.escape()
		.withMessage("Message must be specified.")
		.isLength({ max: 500 })
		.withMessage("Message can't be more than 500 characters"),
	// Process request after validation and sanitization.
	asyncHandler(async (req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			// There are errors. Render form again.
			res.render("new_message", {
				title: "Send a New Message",
				errors: errors.array(),
			});
			return;
		}

		// Create Message object with escaped and trimmed data
		const message = new Message({
			title: req.body.title,
			timestamp: new Date(),
			text: req.body.text,
			user: res.locals.currentUser._id,
		});

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/errors messages.
			res.render("new_message", {
				title: "Send a New Message",
				message: message,
				errors: errors.array(),
			});
			return;
		} else {
			// Save message.
			await message.save();
			res.redirect("/");
		}
	}),
];

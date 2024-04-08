const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

//  User sign up form on GET
exports.user_signup_get = (req, res, next) => {
	res.render("sign_up", { title: "Sign Up" });
};

//  User sign up form on POST
exports.user_signup_post = [
	// Validate and sanitize fields.
	body("first_name")
		.trim()
		.notEmpty()
		.escape()
		.withMessage("First name must be specified.")
		.isAlphanumeric()
		.withMessage("First name has non-alphanumeric characters.")
		.isLength({ max: 35 })
		.withMessage("First name can't be more than 35 characters."),
	body("last_name")
		.trim()
		.notEmpty()
		.escape()
		.withMessage("Last name must be specified.")
		.isAlphanumeric()
		.withMessage("Last name has non-alphanumeric characters.")
		.isLength({ max: 35 })
		.withMessage("Last name can't be more than 35 characters."),
	body("username")
		.trim()
		.notEmpty()
		.escape()
		.withMessage("Username must be specified.")
		.isAlphanumeric()
		.withMessage("Username has non-alphanumeric characters.")
		.isLength({ max: 20 })
		.withMessage("Username can't be more than 20 characters."),
	body("password")
		.trim()
		.notEmpty()
		.escape()
		.withMessage("Password must be specified.")
		.isLength({ max: 50 })
		.withMessage("Password can't be more than 50 characters."),
	body("confirm_password")
		.trim()
		.notEmpty()
		.escape()
		.withMessage("Password must be specified.")
		.custom((value, { req }) => {
			return value === req.body.password;
		})
		.withMessage("Passwords do not match."),

	// Process request after validation and sanitization.
	asyncHandler(async (req, res, next) => {
		// Extract the validation errors from a request.
		const errors = validationResult(req);
		let password;

		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		// Create User object with escaped and trimmed data
		const user = new User({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			username: req.body.username,
			password: hashedPassword,
		});

		if (!errors.isEmpty()) {
			// There are errors. Render form again with sanitized values/errors messages.
			res.render("sign_up", {
				title: "Sign Up",
				user: user,
				errors: errors.array(),
			});
			return;
		} else {
			// Save user.
			await user.save();
			res.redirect("/");
		}
	}),
];

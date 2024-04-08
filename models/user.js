const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: { type: String, required: true, maxLength: 35 },
	last_name: { type: String, required: true, maxLength: 35 },
	username: { type: String, required: true, maxLength: 20 },
	password: { type: String, required: true},
	membership_status: { type: Boolean, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);

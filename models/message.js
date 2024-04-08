const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	title: { type: String, required: true, maxLength: 50 },
	timestamp: { type: Date },
	text: { type: String, required: true, maxLength: 500 },
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Message", MessageSchema);

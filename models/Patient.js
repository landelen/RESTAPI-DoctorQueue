const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const PatienSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide name"],
		minlength: 2,
		maxlength: 20,
	},
	surname: {
		type: String,
		required: [true, "Please provide surname"],
		minlength: 4,
		maxlength: 30,
	},
	email: {
		type: String,
		required: [true, "Please provide email"],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"Please provide email",
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please provide password"],
		minlength: 8,
		maxlength: 30,
	},
});

PatienSchema.pre("save", async function () {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

PatienSchema.methods.comparePassword = async function (canditatePassword) {
	const isMatch = await bcrypt.compare(canditatePassword, this.password);
	return isMatch;
};

module.exports = mongoose.model("Patient", PatienSchema);

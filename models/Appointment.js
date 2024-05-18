const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
	doctor: {
		type: mongoose.Types.ObjectId,
		ref: "Doctor",
		required: [true, "Please provide doctor"],
	},
	patient: {
		type: mongoose.Types.ObjectId,
		ref: "Patient",
		required: [true, "Please provide patient"],
	},
	date: {
		type: String,
		required: [true, "Please provide date"],
	},
	status: {
		type: String,
		enum: ["pending", "confirmed", "completed", "cancelled"],
		default: "pending",
	},
});

AppointmentSchema.pre("save", async function () {});

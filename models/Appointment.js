const mongoose = require("mongoose");
const timeIntervals = require("../helpers/appointment-time");

const AppointmentSchema = new mongoose.Schema(
	{
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
			type: Date,
			required: [true, "Please provide date"],
		},
		timeInterval: {
			type: String,
			enum: timeIntervals,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "confirmed", "completed", "cancelled"],
			default: "pending",
		},
	},
	{ timestamps: true }
);

AppointmentSchema.index({ date: 1, timeInterval: 1 }, { unique: true });

module.exports = mongoose.model("Appointment", AppointmentSchema);

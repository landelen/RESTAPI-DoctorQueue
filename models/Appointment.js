const mongoose = require("mongoose");

const timeIntervals = [
	"10:00-10:15",
	"10:15-10:30",
	"10:30-10:45",
	"10:45-11:00",
	"11:00-11:15",
	"11:15-11:30",
	"11:30-11:45",
	"11:45-12:00",
	"12:00-12:15",
	"12:15-12:30",
	"12:30-12:45",
	"12:45-13:00",
	"13:00-13:15",
	"13:15-13:30",
	"13:30-13:45",
	"13:45-14:00",
	"14:00-14:15",
	"14:15-14:30",
	"14:30-14:45",
	"14:45-15:00",
];

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
			type: String,
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

module.exports = mongoose.model("Appointment", AppointmentSchema);

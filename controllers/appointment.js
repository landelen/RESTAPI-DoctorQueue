const Appointment = require("../models/Appointment");
const { createCustomError } = require("../errors/custom-api");

const createAppointment = async (req, res) => {
	req.body.patient = req.user.patientID;
	const appointment = await Appointment.create(req.body);
	res.status(200).json(appointment);
};

const getAllAppointments = async (req, res) => {
	const appointments = await Appointment.find({
		patient: req.user.patientID,
	}).sort("createdAt");
	res.status(200).json({ appointments, count: appointments.length });
};

const deleteAppointment = async (req, res) => {
	const {
		params: { id: appointmentID },
		user: { patientID },
	} = req;

	const appointment = await Appointment.findByIdAndDelete({
		_id: appointmentID,
		patient: patientID,
	});

	if (!appointment) {
		throw createAppointment("No", 200);
	}
	res.status(200).send();
};

module.exports = {
	createAppointment,
	getAllAppointments,
	deleteAppointment,
};

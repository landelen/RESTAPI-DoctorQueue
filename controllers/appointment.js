const Appointment = require("../models/Appointment");
const { createCustomError } = require("../errors/custom-api");

const createAppointment = async (req, res) => {
	const appointment = await Appointment.create(req.body);
	res.status(200).json(appointment);
};

module.exports = {
	createAppointment,
};

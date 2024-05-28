const Appointment = require("../models/Appointment");
const { NotFoundError } = require("../errors");

const doctorGetAppointment = async (req, res) => {
	const {
		params: { id: appointmentID },
		user: { userID },
	} = req;

	const appointment = await Appointment.findOne({
		_id: appointmentID,
		doctor: userID,
	});

	if (!appointment) {
		throw new NotFoundError(`No appointment found with ${appointmentID}`);
	}

	res.status(200).json(appointment);
};

const doctorGetAllAppointments = async (req, res) => {
	const appointments = await Appointment.find({
		doctor: req.user.userID,
	}).sort("createdAt");
	res.status(200).json({ appointments, count: appointments.length });
};

const doctorUpdateAppointment = async (req, res) => {
	const {
		params: { id: appointmentID },
		user: { userID },
	} = req;

	const { doctor, patient, ...updateData } = req.body;

	const appointment = await Appointment.findOneAndUpdate(
		{ _id: appointmentID, doctor: userID },
		updateData,
		{ new: true, runValidators: true }
	);

	if (!appointment) {
		throw new NotFoundError(`No appointment found with ${appointmentID}`);
	}

	res.status(200).json({ appointment });
};

module.exports = {
	doctorGetAppointment,
	doctorGetAllAppointments,
	doctorUpdateAppointment,
};

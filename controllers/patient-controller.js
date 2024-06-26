const Appointment = require("../models/Appointment");
const { NotFoundError } = require("../errors");

const createAppointment = async (req, res) => {
  req.body.patient = req.user.userID;
  const appointment = await Appointment.create(req.body);
  res.status(200).json(appointment);
};

const getAppointment = async (req, res) => {
  const {
    params: { id: appointmentID },
    user: { userID },
  } = req;

  const appointment = await Appointment.findOne({
    _id: appointmentID,
    patient: userID,
  });

  if (!appointment) {
    throw new NotFoundError(`No appointment found with ${appointmentID}`);
  }

  res.status(200).json(appointment);
};

const getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find({
    patient: req.user.userID,
  }).sort("createdAt");
  res.status(200).json({ appointments, count: appointments.length });
};

const deleteAppointment = async (req, res) => {
  const {
    params: { id: appointmentID },
    user: { userID },
  } = req;

  const appointment = await Appointment.findByIdAndDelete({
    _id: appointmentID,
    patient: userID,
  });

  if (!appointment) {
    throw new NotFoundError(`No appointment found with ${appointmentID}`);
  }

  res.status(200).send();
};

const updateAppointment = async (req, res) => {
  const {
    params: { id: appointmentID },
    user: { userID },
  } = req;

  const { doctor, patient, ...updateData } = req.body;

  const appointment = await Appointment.findOneAndUpdate({ _id: appointmentID, patient: userID }, updateData, {
    new: true,
    runValidators: true,
  });

  if (!appointment) {
    throw new NotFoundError(`No appointment found with ${appointmentID}`);
  }

  res.status(200).json({ appointment });
};

module.exports = {
  createAppointment,
  getAppointment,
  getAllAppointments,
  deleteAppointment,
  updateAppointment,
};

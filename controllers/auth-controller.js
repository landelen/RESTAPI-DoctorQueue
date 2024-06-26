const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const registerPatient = async (req, res) => {
  const patient = await Patient.create({ ...req.body });

  const token = patient.createJWT();

  res.json({ patient, token });
};

const loginPatient = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const patient = await Patient.findOne({ email });
  if (!patient) {
    throw new UnauthenticatedError("Patient doesn`t exist");
  }

  const isPasswordCorrect = await patient.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong password");
  }

  const token = patient.createJWT();

  res.status(200).json({ patient: { name: patient.name, surname: patient.surname }, token });
};

const registerDoctor = async (req, res) => {
  const doctor = await Doctor.create({ ...req.body });

  const token = doctor.createJWT();

  res.json({ doctor, token });
};

const loginDoctor = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    throw new UnauthenticatedError("Doctor doesn`t exist");
  }

  const isPasswordCorrect = await doctor.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong password");
  }

  const token = doctor.createJWT();

  res.status(200).json({ doctor: { name: doctor.name, surname: doctor.surname }, token });
};

module.exports = {
  registerPatient,
  loginPatient,
  registerDoctor,
  loginDoctor,
};

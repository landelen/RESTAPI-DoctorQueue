const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const { createCustomError } = require("../errors/custom-api");

const registerPatient = async (req, res) => {
	const patient = await Patient.create({ ...req.body });

	const token = patient.createJWT();

	res.json({ patient, token });
};

const loginPatient = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw createCustomError("Please provide email and password", 200);
	}

	const patient = await Patient.findOne({ email });
	const isPasswordCorrect = await patient.comparePassword(password);
	if (!isPasswordCorrect) {
		throw createCustomError("Wrong password", 200);
	}

	const token = patient.createJWT();

	res
		.status(200)
		.json({ patient: { name: patient.name, surname: patient.surname }, token });
};

const registerDoctor = async (req, res) => {
	const doctor = await Doctor.create({ ...req.body });

	const token = doctor.createJWT();

	res.json({ doctor, token });
};

const loginDoctor = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw createCustomError("Please provide email and password", 200);
	}

	const doctor = await Doctor.findOne({ email });
	const isPasswordCorrect = await doctor.comparePassword(password);
	if (!isPasswordCorrect) {
		throw createCustomError("Wrong password", 200);
	}

	const token = doctor.createJWT();

	res
		.status(200)
		.json({ doctor: { name: doctor.name, surname: doctor.surname }, token });
};

module.exports = {
	registerPatient,
	loginPatient,
	registerDoctor,
	loginDoctor,
};

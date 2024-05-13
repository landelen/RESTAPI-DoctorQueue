const Patient = require("../models/Patient");
const { createCustomError } = require("../errors/custom-api");

const registerPatient = async (req, res) => {
	const patient = await Patient.create({ ...req.body });
	res.json({ patient });
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
	res
		.status(200)
		.json({ patient: { name: patient.name, surname: patient.surname } });
};

module.exports = {
	registerPatient,
	loginPatient,
};

const express = require("express");

const router = express.Router();

const {
	registerPatient,
	loginPatient,
	registerDoctor,
	loginDoctor,
} = require("../controllers/authController");

router.post("/patient/register", registerPatient);
router.post("/patient/login", loginPatient);

router.post("/doctor/register", registerDoctor);
router.post("/doctor/login", loginDoctor);

module.exports = router;

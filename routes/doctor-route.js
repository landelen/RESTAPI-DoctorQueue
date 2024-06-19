const express = require("express");

const router = express.Router();

const {
  doctorGetAppointment,
  doctorGetAllAppointments,
  doctorUpdateAppointment,
} = require("../controllers/doctor-controller");

router.route("/").get(doctorGetAllAppointments);
router.route("/:id").get(doctorGetAppointment).patch(doctorUpdateAppointment);

module.exports = router;

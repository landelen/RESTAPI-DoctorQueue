const express = require("express");

const router = express.Router();

const {
	createAppointment,
	getAllAppointments,
	deleteAppointment,
} = require("../controllers/appointment");

router.route("/").post(createAppointment).get(getAllAppointments);
router.route("/:id").delete(deleteAppointment);

module.exports = router;

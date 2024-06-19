const express = require("express");

const router = express.Router();

const {
  createAppointment,
  getAllAppointments,
  getAppointment,
  deleteAppointment,
  updateAppointment,
} = require("../controllers/patient-controller");

router.route("/").post(createAppointment).get(getAllAppointments);
router.route("/:id").delete(deleteAppointment).get(getAppointment).patch(updateAppointment);

module.exports = router;

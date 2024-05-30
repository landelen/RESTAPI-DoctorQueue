const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const Appointment = require("../../models/Appointment");
const jwt = require("jsonwebtoken");

const mockPatientId = new mongoose.Types.ObjectId();
const mockDoctorId = new mongoose.Types.ObjectId();
const mockAppointmentId = new mongoose.Types.ObjectId();

const mockAppointment = {
	_id: mockAppointmentId,
	doctor: mockDoctorId,
	patient: mockPatientId,
	date: new Date(),
	timeInterval: "13:00-13:15",
	status: "pending",
	createdAt: new Date(),
	updatedAt: new Date(),
};

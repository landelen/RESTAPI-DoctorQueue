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

const mockToken = jwt.sign(
	{ id: mockDoctorId, role: "doctor" },
	process.env.JWT_SECRET,
	{
		expiresIn: process.env.JWT_LIFETIME,
	}
);

jest.mock("../../models/Appointment");

describe("Doctor controller", () => {
	beforeEach(() => {
		Appointment.create.mockClear();
		Appointment.findOne.mockClear();
		Appointment.find.mockClear();
		Appointment.findByIdAndDelete.mockClear();
		Appointment.findOneAndUpdate.mockClear();
	});

	test("Get appointment", async () => {
		Appointment.findOne.mockResolvedValue(mockAppointment);

		const res = await request(app)
			.get(`/api/doctor/${mockAppointmentId}`)
			.set("Authorization", `Bearer ${mockToken}`);

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("_id", mockAppointmentId.toString());
		expect(Appointment.findOne).toHaveBeenCalledTimes(1);
	});

	test("Get all appointments", async () => {
		Appointment.find.mockReturnValueOnce({
			sort: jest.fn().mockReturnValueOnce([mockAppointment]),
		});

		const res = await request(app)
			.get(`/api/doctor/`)
			.set("Authorization", `Bearer ${mockToken}`);

		expect(res.statusCode).toEqual(200);
		expect(res.body.appointments).toHaveLength(1);
		expect(res.body.count).toEqual(1);
		expect(Appointment.find).toHaveBeenCalledTimes(1);
	});

	test("Update appointment", async () => {
		const updatedAppointment = { ...mockAppointment, status: "confirmed" };
		Appointment.findOneAndUpdate.mockResolvedValue(updatedAppointment);

		const res = await request(app)
			.patch(`/api/doctor/${mockAppointmentId}`)
			.send({ status: "confirmed" })
			.set("Authorization", `Bearer ${mockToken}`);

		expect(res.statusCode).toEqual(200);
		expect(res.body.appointment.status).toEqual("confirmed");
		expect(Appointment.findOneAndUpdate).toHaveBeenCalledTimes(1);
	});
});

require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

//mongodb
const connectDB = require("./db/connect");

app.use(express.json());

//routers
const authRouter = require("./routes/auth-route");
const patientRouter = require("./routes/patient-route");
const doctorRouter = require("./routes/doctor-route");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleware = require("./middleware/authentication");
const { authorizePatient, authorizeDoctor } = require("./middleware/authorize");

app.use("/api/auth", authRouter);
app.use("/api/patient", authMiddleware, authorizePatient, patientRouter);
app.use("/api/doctor", authMiddleware, authorizeDoctor, doctorRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL);
		app.listen(port, () => {
			console.log(`Server is listening on port ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();

require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

//mongodb
const connectDB = require("./db/connect");

app.use(express.json());

//routers
const authRouter = require("./routes/authRoute");
const appointRouter = require("./routes/appointmentRoute");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleware = require("./middleware/authentication");

app.use("/api/auth", authRouter);
app.use("/api", authMiddleware, appointRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

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

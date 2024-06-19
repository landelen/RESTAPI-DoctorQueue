require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

app.use(express.json());

//routers
const authRouter = require("./routes/auth-route");
const patientRouter = require("./routes/patient-route");
const doctorRouter = require("./routes/doctor-route");

//middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleware = require("./middleware/authentication");
const { authorizePatient, authorizeDoctor } = require("./middleware/authorize");

//docs
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger-output.json");

//security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

app.use(rateLimiter({ windowsMs: 10 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//routers
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", authRouter);
app.use("/api/patient", authMiddleware, authorizePatient, patientRouter);
app.use("/api/doctor", authMiddleware, authorizeDoctor, doctorRouter);

//error-middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;

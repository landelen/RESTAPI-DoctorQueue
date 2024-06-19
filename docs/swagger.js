const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "DoctorsQueue API",
    description: "REST API application for patients to make doctor's appointments.",
  },
  host: "localhost:8080",
};

const outputFile = "../swagger-output.json";
const routes = ["../app.js"];

swaggerAutogen(outputFile, routes, doc);

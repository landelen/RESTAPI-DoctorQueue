const jwt = require("jsonwebtoken");

const { createCustomError } = require("../errors/custom-api");

const authentication = async (req, res, next) => {
	const header = req.headers.authorization;
	if (!header || !header.startsWith("Bearer ")) {
		throw createCustomError("abobA", 200);
	}

	const token = header.split(" ")[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { patientID: payload.id };
		console.log(req.user);
		next();
	} catch {
		throw createCustomError("abobA2", 200);
	}
};

module.exports = authentication;

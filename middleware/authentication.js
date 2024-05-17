const jwt = require("jsonwebtoken");

const { createCustomError } = require("../errors/custom-api");

const authentication = async (req, res, next) => {
	const header = req.headers.authorization;
	if (!header || !header.startsWith("Bearer ")) {
		throw createCustomError("abobA");
	}

	const token = header.split(" ")[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { name: payload.name, surname: payload.surname };
		next();
	} catch {
		throw createCustomError("abobA2");
	}
};

module.exports = authentication;

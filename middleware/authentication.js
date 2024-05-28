const jwt = require("jsonwebtoken");

const { UnauthenticatedError } = require("../errors");

const authentication = async (req, res, next) => {
	const header = req.headers.authorization;
	if (!header || !header.startsWith("Bearer ")) {
		throw new UnauthenticatedError("Authentication invalid");
	}

	const token = header.split(" ")[1];

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = { userID: payload.id, role: payload.role };
		next();
	} catch {
		throw new UnauthenticatedError("Authentication invalid");
	}
};

module.exports = authentication;

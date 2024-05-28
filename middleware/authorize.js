const authorizePatient = (req, res, next) => {
	if (req.user.role !== "patient") {
		return res.status(403).json({ message: "Access denied" });
	}
	next();
};

const authorizeDoctor = (req, res, next) => {
	if (req.user.role !== "doctor") {
		return res.status(403).json({ message: "Access denied" });
	}
	next();
};

module.exports = { authorizePatient, authorizeDoctor };

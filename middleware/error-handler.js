const errorHandlerMiddleware = (err, req, res, next) => {
	let errorResponse = {
		statusCode: err.statusCode || 500,
		msg: err.message || "Something went wrong",
	};

	if (err.name === "ValidationError") {
		errorResponse.msg = Object.values(err.errors)
			.map((item) => item.message)
			.join(",");
		errorResponse.statusCode = 400;
	}

	if (err.name === "CastError") {
		errorResponse.msg = `No item found with: ${err.value}`;
		errorResponse.statusCode = 404;
	}

	if (err.code && err.code === 11000) {
		errorResponse.msg = `Duplicate value entered for ${Object.keys(
			err.keyValue
		)} field, please choose another value`;
		errorResponse.statusCode = 400;
	}

	return res.status(errorResponse.statusCode).json({ msg: errorResponse.msg });
};

module.exports = errorHandlerMiddleware;

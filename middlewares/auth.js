const { getUser } = require("../services/auth");

const checkForAuthentication = (req, res, next) => {
	const tokenCookie = req.cookies?.token;
	req.user = null;
	if (!tokenCookie) {
		return next();
	}
	const token = tokenCookie;
	const user = getUser(token);

	req.user = user;
	return next();
};

//authorization
// serach it why he said this is closure
function restrictTo(roles = []) {
	return function (req, res, next) {
		if (!req.user) return res.redirect("/login");

		if (!roles.includes(req.user.role)) return res.end("Unauthorized");
		return next();
	};
}

module.exports = {
	checkForAuthentication,
	restrictTo,
};

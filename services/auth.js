// const sessionIdToUserMap = new Map();   now we removed state
const jwt = require("jsonwebtoken");
const secret = "Gulshan$#%979&";

const setUser = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			email: user.email,
			role: user.role,
		},
		secret
	);
};

const getUser = (token) => {
	if (!token) return null;
	try {
		return jwt.verify(token, secret);
	} catch (error) {
		return null;
	}
};

module.exports = {
	setUser,
	getUser,
};

const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");
const User = require("../models/user");
const handleUserSignup = async (req, res) => {
	const { name, email, password } = req.body;
	await User.create({
		name,
		email,
		password,
	});
	
	return res.redirect("/");
};

const handleUserLogin = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email, password });
	if (!user) {
		return res.render("login", { error: "Invalid Username or Passwrod" });
	}
    // const sessionId = uuidv4();
	const token = setUser(user);
	 res.cookie("token",token);
	return res.redirect("/");
	// return res.json({token})

};

module.exports = {
	handleUserSignup,
	handleUserLogin,
};

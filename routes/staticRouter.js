const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
	const allUrls = await URL.find({});

	return res.render("home", {
		urls: allUrls,
	});
});

router.get("/", restrictTo(["NORMAL","ADMIN"]), async (req, res) => {
	// if (!req.user) return res.redirect("/login");
	//console.log(req.user._id);
	const allUrls = await URL.find({ createdBy: req.user._id });

	return res.render("home", {
		urls: allUrls,
	});
});

router.get("/signup", async (req, res) => {
	return res.render("signup");
});
router.get("/login", (req, res) => {
	return res.render("login");
});

module.exports = router;

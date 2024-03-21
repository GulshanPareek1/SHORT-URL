const { nanoid } = require("nanoid");
const shortid = require("shortid");
const URL = require("../models/url");

const handleGenerateNewShortURL = async (req, res) => {
	// req.body has parsed json request and done by middleware express.json()
	const body = req.body;
	if (!body.url) {
		return res.status(400).json({ error: "url is required" });
	}
	// console.log(body.url);
	const shortID = nanoid(8);
	// console.log("Nano id is",shortID);
	await URL.create({
		shortId: shortID,
		redirectUrl: body.url,
		visitHistory: [],
		createdBy: req.user._id,
	});
	return res.render("home", {
		id: shortID,
	});
	//return res.status(200).json({ shortId: shortID });
};

const handleGetRedirectURL = async (req, res) => {
	const shortId = req.params.shortId;
	const entry = await URL.findOneAndUpdate(
		{ shortId },

		{
			$push: {
				visitHistory: {
					timeStamp: Date.now(),
				},
			},
		}
	);

	return res.redirect(entry.redirectUrl);
};

const handleGetAnalytics = async (req, res) => {
	const shortId = req.params.shortId;
	const result = await URL.findOne({ shortId });
	return res.json({
		totalClicks: result.visitHistory.length,
		analytics: result.visitHistory,
	});
};

module.exports = {
	handleGenerateNewShortURL,
	handleGetRedirectURL,
	handleGetAnalytics,
};

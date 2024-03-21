const express = require("express");
const router = express.Router();
const {
	handleGenerateNewShortURL,
	handleGetRedirectURL,
    handleGetAnalytics
} = require("../controllers/url");

router.post("/", handleGenerateNewShortURL);

router.get("/:shortId", handleGetRedirectURL);

router.get("/analytics/:shortId",handleGetAnalytics);



module.exports = router;

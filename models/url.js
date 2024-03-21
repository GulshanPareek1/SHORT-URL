const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
	{
		shortId: {
			type: String,
			required: true,
			unique: true,
		},
		redirectUrl: {
			type: String,
			required: true,
		},
		visitHistory: [{ timeStamp: Number }],
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ timestamps: true }
);

const URL = mongoose.model("url", urlSchema); // here we're basically making the modelof schema

module.exports = URL;

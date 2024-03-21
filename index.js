const express = require("express");
const { connectToMongoDB } = require("./connection");
const cookieParser = require("cookie-parser");
const URL = require("./models/url");
const path = require("path");
const { checkForAuthentication, checkAuth, restrictTo } = require("./middlewares/auth");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const app = express(); // create app
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
	.then(() => console.log("MongoDB Connected Successfully"))
	.catch((error) => console.error("Error connecting to MongoDB", error));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
//middleware
// app.use(express.static(path.join('D:','BEST PIC')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL"]),urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/", async (req, res) => {
	const allUrls = await URL.find({});
	return res.render("home", {
		urls: allUrls,
	});
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));

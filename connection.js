const mongoose = require("mongoose");
const connectToMongoDB =  async(url) => {
	 mongoose.connect(url);
};

module.exports = {
	connectToMongoDB,
};

const mongoose = require("mongoose");

const { DB_URL } = require("../config");

module.exports = async () => {
	try {
		await mongoose.connect(DB_URL, {});
		console.log("Db Connected");
		return true;
	} catch (error) {
		console.error("Error ============ ON DB Connection");
		console.log(error);
		return false;
	}
};

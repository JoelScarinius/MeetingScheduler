const mongoose = require("mongoose");

// Define a schema for the "Meeting" model
const meetingchema = new mongoose.Schema({
	organizer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	startTime: { type: String, required: true },
	endTime: { type: String, required: true },
	startDate: { type: String, required: true },
	endDate: { type: String, required: true },
	location: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String },
	hasPassed: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("Meeting", meetingchema);

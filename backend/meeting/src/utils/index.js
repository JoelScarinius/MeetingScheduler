const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");

const { APP_SECRET, EXCHANGE_NAME, USER_SERVICE, MSG_QUEUE_URL } = require("../config");
const { ValidationError } = require("./error/app-errors");

/* ==================== Utility functions ========================== */

module.exports.ValidateSignature = async req => {
	try {
		const signature = req.get("Authorization");

		if (signature === undefined) {
			throw new ValidationError("No valid session token provided.");
		}
		const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
		req.user = payload;
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

module.exports.ValidateMeetingInput = async ({
	title,
	location,
	startTime,
	endTime,
	startDate,
	endDate,
}) => {
	// Check if all required fields are provided correctly
	if (!(title && location && startTime && endTime && startDate && endDate))
		throw new ValidationError("Not all required fields were provided.");

	if (endDate < startDate) throw new ValidationError("End date cannot be before start date.");

	if (endDate === startDate && startTime > endTime)
		throw new ValidationError("Start time cannot be after (greater than) end time.");
};

module.exports.PrintFormattedMessage = message => {
	const currentDate = new Date();

	// Get hours, minutes, day, month, and year
	const hours = currentDate.getHours().toString().padStart(2, "0");
	const minutes = currentDate.getMinutes().toString().padStart(2, "0");
	const day = currentDate.getDate().toString().padStart(2, "0");
	const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
	const year = currentDate.getFullYear();

	const formattedMessage = `[${hours}:${minutes} - ${year}-${month}-${day}]: ${message}`;
	console.log(formattedMessage);
};

/* ==================== Utility functions ========================== */
/* ==================== Message Broker ========================== */

module.exports.CreateChannel = async () => {
	const connection = await amqplib.connect(MSG_QUEUE_URL);
	const channel = await connection.createChannel();
	await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
	return channel;
};

module.exports.PublishMessage = (channel, service, msg) => {
	channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
	console.log("Sent: ", msg);
};

module.exports.SubscribeMessage = async (channel, service) => {
	await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
	const q = await channel.assertQueue("", { exclusive: true });
	console.log(` Waiting for messages in queue: ${q.queue}`);

	channel.bindQueue(q.queue, EXCHANGE_NAME, USER_SERVICE);

	channel.consume(
		q.queue,
		msg => {
			if (msg.content) {
				console.log("the message is:", msg.content.toString());
				service.SubscribeEvents(msg.content.toString());
			}
			console.log("[X] received");
		},
		{
			noAck: true,
		}
	);
};

/* ==================== Message Broker ========================== */

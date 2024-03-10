const dotEnv = require("dotenv");

// if (process.env.NODE_ENV === "dev") {
// 	const configFile = `./.env.${process.env.NODE_ENV}`;
// 	dotEnv.config({ path: configFile });
// } else if (process.env.NODE_ENV === "prod") {
// 	const configFile = `./.env.${process.env.NODE_ENV}`;
// 	dotEnv.config({ path: configFile });
// } else {
// 	dotEnv.config();
// }
dotEnv.config();

const envs = {
	MEETING_SERVICE_PORT: process.env.MEETING_SERVICE_PORT,
	DB_URL: process.env.MONGODB_URI,
	APP_SECRET: process.env.APP_SECRET,
	EXCHANGE_NAME: process.env.EXCHANGE_NAME,
	MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
	MEETING_SERVICE: "meeting_service",
};

console.log(envs.toString());

module.exports = envs;

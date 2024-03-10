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
	USER_SERVICE_PORT: process.env.USER_SERVICE_PORT,
	DB_URL: process.env.MONGODB_URI,
	ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
	EXCHANGE_NAME: process.env.EXCHANGE_NAME,
	MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
	USER_SERVICE: "user_service",
};
console.log(envs.toString());

module.exports = envs;

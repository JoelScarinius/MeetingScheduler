const path = require("./setup");

module.exports = {
	// Automatically clear mock calls and instances between every test
	clearMocks: true,

	// The test environment that will be used for testing
	testEnvironment: "node",
	setupFilesAfterEnv: [path], // Path to setup file
};

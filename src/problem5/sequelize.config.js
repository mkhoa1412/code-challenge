require("ts-node/register");

module.exports = {
	development: {
		use_env_variable: "DB_URL",
		dialect: "postgres",
	},
};

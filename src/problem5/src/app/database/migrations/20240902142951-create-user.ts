"use strict";

import { QueryInterface } from "sequelize";
import userAttributes from "~/app/database/schemas/user";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface: QueryInterface) => {
		await queryInterface.createTable("user", userAttributes);
	},

	down: async (queryInterface: QueryInterface) => {
		await queryInterface.dropTable("user");
	},
};

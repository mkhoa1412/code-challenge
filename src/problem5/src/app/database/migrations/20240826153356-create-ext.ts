"use strict";

import { QueryInterface } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(query: QueryInterface) {
		await query.sequelize.query("CREATE EXTENSION IF NOT EXISTS postgis;");
		await query.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
	},

	async down() {},
};

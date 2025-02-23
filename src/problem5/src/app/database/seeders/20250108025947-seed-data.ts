"use strict";

import { QueryInterface } from "sequelize";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const seedUsers = async (queryInterface: QueryInterface) => {
	const passwordHash = await bcrypt.hash("admin@2025", 10);
	const userId = uuidv4();
	await queryInterface.bulkInsert(
		"user",
		[
			{
				userId,
				email: "admin@pvb.com",
				passwordHash,
				firstName: "Phan",
				lastName: "Binh",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		],
		{},
	);
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface: QueryInterface) {
		await seedUsers(queryInterface);
	},

	async down(queryInterface: QueryInterface) {
		await queryInterface.bulkDelete("user", {}, {});
	},
};

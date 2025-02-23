import { DataTypes, ModelAttributes, Sequelize } from "sequelize";
import { UserStatus } from "~/enums/user";

const userAttributes: ModelAttributes = {
	userId: {
		type: DataTypes.UUID,
		primaryKey: true,
		defaultValue: Sequelize.literal("uuid_generate_v4()"),
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	passwordHash: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	createdBy: {
		type: DataTypes.UUID,
		allowNull: true,
		references: {
			model: "user",
			key: "userId",
		},
	},
	updatedBy: {
		type: DataTypes.UUID,
		allowNull: true,
	},
	status: {
		allowNull: true,
		type: DataTypes.STRING(255),
		defaultValue: UserStatus.Active,
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
	},
	deletedAt: {
		type: DataTypes.DATE,
		allowNull: true,
	},
};

export default userAttributes;

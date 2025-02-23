import { Sequelize } from "sequelize";
import { DB_URL } from "~/constants/app";
import UserModel from "~/modules/user/userModel";
import userAttributes from "~/app/database/schemas/user";

const sequelize = new Sequelize(DB_URL);

export const initModels = () => {
	UserModel.init(userAttributes, { sequelize, tableName: "user", timestamps: true, paranoid: true });
};

export const setupAssociations = () => {};

export default sequelize;

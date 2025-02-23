import "dotenv/config";
import sequelize, { initModels, setupAssociations } from "~/app/database/sequelize";

export const boot = async () => {
	try {
		await sequelize.authenticate();
		initModels();
		setupAssociations();
	} catch (error: unknown) {
		console.error(error);
		process.exit(1);
	}
};

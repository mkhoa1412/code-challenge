import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { UserStatus } from "~/enums/user";

// Define the User model
class UserModel extends Model<
	InferAttributes<UserModel>,
	InferCreationAttributes<UserModel, { omit: "userId" | "createdAt" | "updatedAt" }>
> {
	declare userId: string;
	declare firstName?: string;
	declare lastName?: string;
	declare email: string;
	declare phone?: string;
	declare passwordHash: string;
	declare createdBy?: string;
	declare updatedBy?: string;
	declare status: UserStatus;

	// Timestamps
	declare createdAt: Date;
	declare updatedAt: Date;
}

export type UserAttributes = InferAttributes<UserModel>;
export type UserCreationAttributes = InferCreationAttributes<UserModel, { omit: "userId" | "createdAt" | "updatedAt" }>;

export default UserModel;

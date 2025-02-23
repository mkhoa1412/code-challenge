import bcrypt from "bcrypt";
import sequelize from "~/app/database/sequelize";
import { UserStatus } from "~/enums/user";
import { EmailAlreadyExistsError, NotFoundUserError } from "~/errors/logic/user";
import userRepository from "~/modules/user/userRepository";
import { UserInput } from "~/types/input/user";

const createUser = async (payload: UserInput) => {
	if (await userRepository.findByEmail(payload.email)) {
		throw new EmailAlreadyExistsError();
	}

	const user = await sequelize.transaction(async () => {
		const passwordHash = await bcrypt.hash(payload.password, 10);

		const user = await userRepository.createUser({
			email: payload.email,
			firstName: payload.firstName,
			lastName: payload.lastName,
			passwordHash,
			phone: payload.phone,
			status: payload.status ?? UserStatus.Pending,
		});

		return user;
	});

	return user;
};

const updateUser = async (payload: Partial<UserInput> & { userId: string }) => {
	const user = await forceGetUserById(payload.userId);

	await sequelize.transaction(async (transaction) => {
		await user.update(
			{
				email: payload.email ?? user.email,
				firstName: payload.firstName ?? user.firstName,
				lastName: payload.lastName ?? user.lastName,
				phone: payload.phone ?? user.phone,
				status: payload.status ?? user.status,
				passwordHash: payload.password ? await bcrypt.hash(payload.password, 10) : user.passwordHash,
			},
			{ transaction },
		);

		return user;
	});

	return user;
};

const forceGetUserById = async (userId: string) => {
	const user = await userRepository.findById(userId);

	if (!user) {
		throw new NotFoundUserError();
	}

	return user;
};

const destroy = async (userId: string) => {
	const user = await userRepository.findById(userId);

	if (!user) {
		throw new NotFoundUserError();
	}

	await user.destroy();

	return user;
};

const userService = { createUser, forceGetUserById, updateUser, destroy };

export default userService;

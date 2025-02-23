import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "~/modules/user/userModel";
import { APP_JWT_SECRET } from "~/constants/app";
import {
	InvalidPasswordError,
	NotFoundAuthUserError,
	UserIsInactiveError,
	UserIsPendingError,
} from "~/errors/logic/auth";
import userRepository from "~/modules/user/userRepository";
import { UserStatus } from "~/enums/user";

const forceFindUserByEmail = async (email: string) => {
	const user = await userRepository.findByEmail(email);
	if (!user) {
		throw new NotFoundAuthUserError();
	}

	return user;
};

const signUser = (user: UserModel) => {
	const token = jwt.sign({ userId: user.userId }, APP_JWT_SECRET, {
		expiresIn: "7d",
	});

	return token;
};

const loginByCredentials = async (email: string, password: string) => {
	const user = await forceFindUserByEmail(email);

	if (user.status === UserStatus.Pending) {
		throw new UserIsPendingError();
	} else if (user.status !== UserStatus.Active) {
		throw new UserIsInactiveError();
	}

	if (!(await bcrypt.compare(password, user.passwordHash))) {
		throw new InvalidPasswordError();
	}

	return {
		accessToken: signUser(user),
		user,
	};
};

const authService = { forceFindUserByEmail, signUser, loginByCredentials };

export default authService;

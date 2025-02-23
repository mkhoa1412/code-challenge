import { Includeable, Op, Transaction } from "sequelize";
import { UserStatus } from "~/enums/user";
import UserModel, { UserAttributes, UserCreationAttributes } from "~/modules/user/userModel";
import { PaginationData, PaginationInputData } from "~/types/data/pagination";
import { QueryUserOptions } from "~/types/query/user";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "~/constants/data/pagination";

const findByEmail = async (email: string) => {
	const user = await UserModel.findOne({ where: { email } });
	return user;
};

const findByEmailIgnoreId = async (email: string, ignoreId: string) => {
	const user = await UserModel.findOne({ where: { email, userId: { [Op.not]: ignoreId } } });
	return user;
};

const findById = async (userId: string) => {
	const user = await UserModel.findByPk(userId);
	return user;
};

const createUser = async (dto: UserCreationAttributes, options?: { transaction?: Transaction }) => {
	const user = await UserModel.create(
		{
			email: dto.email,
			firstName: dto.firstName,
			lastName: dto.lastName,
			phone: dto.phone,
			passwordHash: dto.passwordHash,
			status: dto.status,
		},
		{ transaction: options?.transaction },
	);

	return user;
};

const updateUser = async (user: UserModel, dto: Partial<UserAttributes>, options?: { transaction?: Transaction }) => {
	await user.update(dto, { transaction: options?.transaction });

	return user;
};

const paginate = async (
	dto: PaginationInputData<keyof UserAttributes> & QueryUserOptions,
): Promise<PaginationData<UserModel>> => {
	const { where, include } = buildQuery({ ...dto });

	const result = await UserModel.findAndCountAll({
		where,
		limit: dto.limit || DEFAULT_LIMIT,
		offset: (dto.limit || DEFAULT_LIMIT) * ((dto.page || DEFAULT_PAGE) - 1),
		order: [[dto.sortColumn || "updatedAt", dto.sortType || "DESC"]],
		include,
	});

	return {
		items: result.rows,
		page: dto.page ?? DEFAULT_PAGE,
		limit: dto.limit ?? DEFAULT_LIMIT,
		total: result.count,
	};
};

const deleteUser = async (
	userId: string,
	options?: {
		transaction: Transaction;
	},
) => {
	await UserModel.destroy({ where: { userId }, transaction: options?.transaction });
};

const updateStatus = async (dto: { userId: string; status: UserStatus }, options?: { transaction?: Transaction }) => {
	return await UserModel.update(
		{ status: dto.status },
		{ where: { userId: dto.userId }, transaction: options?.transaction },
	);
};

const getNewestUser = async (dto: { limit?: number; ignoreIds?: string[] }) => {
	const { where, include } = buildQuery({ ignoreIds: dto.ignoreIds });

	const users = await UserModel.findAll({
		where,
		order: [["createdAt", "DESC"]],
		limit: dto.limit ?? 7,
		include,
	});

	return users;
};

const count = async (dto: QueryUserOptions) => {
	const { where } = buildQuery(dto);

	return await UserModel.count({ where });
};

const query = async (dto: QueryUserOptions) => {
	const { where, include } = buildQuery(dto);
	return await UserModel.findAll({ where, include });
};

const buildQuery = (dto: QueryUserOptions) => {
	const where: any = {
		[Op.or]: [
			{ email: { [Op.iLike]: `%${dto.keyword || ""}%` } },
			{ firstName: { [Op.iLike]: `%${dto.keyword || ""}%` } },
			{ lastName: { [Op.iLike]: `%${dto.keyword || ""}%` } },
		],
	};

	if (Array.isArray(dto.ignoreIds)) {
		where.userId = { [Op.notIn]: dto.ignoreIds ?? [] };
	}

	if (dto.status) {
		where.status = dto.status;
	}

	const include: Includeable[] = [];

	return { where, include };
};

const userRepository = {
	findByEmail,
	findById,
	createUser,
	paginate,
	deleteUser,
	updateUser,
	findByEmailIgnoreId,
	updateStatus,
	getNewestUser,
	count,
	query,
};

export default userRepository;

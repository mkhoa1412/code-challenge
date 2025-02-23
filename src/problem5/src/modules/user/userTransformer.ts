import UserModel from "~/modules/user/userModel";
import { PaginationData } from "~/types/data/pagination";

const toObject = async (model: UserModel) => {
	return {
		userId: model.userId,
		email: model.email,
		firstName: model.firstName,
		lastName: model.lastName,
		phone: model.phone,
		status: model.status,
		createdAt: model.createdAt,
		updatedAt: model.updatedAt,
	};
};

const transformSingle = async (user: UserModel) => {
	return await toObject(user);
};

const transformList = async (list: UserModel[]) => {
	return await Promise.all(list.map(transformSingle));
};

const transformPaginate = async (pagination: PaginationData<UserModel>) => {
	const items = await Promise.all(pagination.items.map(transformSingle));

	return {
		items,
		total: pagination.total,
		page: pagination.page,
		limit: pagination.limit,
		lastPage: Math.ceil(pagination.total / pagination.limit),
	};
};

const userTransformer = { transformSingle, transformPaginate, transformList };

export default userTransformer;

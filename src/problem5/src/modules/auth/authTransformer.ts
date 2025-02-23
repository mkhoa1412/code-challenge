import UserModel from "~/modules/user/userModel";
import userTransformer from "~/modules/user/userTransformer";

const transformAuthUser = async (user: UserModel) => {
	return await userTransformer.transformSingle(user);
};

const authTransformer = { transformAuthUser };

export default authTransformer;

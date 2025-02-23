import UserModel from "~/modules/user/userModel";
import { APIResponseTransformOptions } from "~/types/api";

declare global {
	declare namespace Express {
		interface Response {
			api(options: APIResponseTransformOptions): Response;
		}

		interface Request {
			auth?: {
				user?: UserModel;
			};
			files: { [key: string]: UploadedFile | UploadedFile[] | undefined };
			schemaData: any;
			forceGetAuthUser(): UserModel;
			fullHostUrl: string;
		}
	}
}

export default global;

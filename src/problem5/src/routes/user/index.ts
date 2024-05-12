import * as express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../../controllers/UserController';
import validate from '../../middlewares/ValidateMiddleware';
import userBodySchema from '../../schema/UserSchema';
import { asyncHandler } from '../../utils';

const user = express.Router();

user.get(`/users`, asyncHandler(getAllUsers));
user.get(`/users/:id`, asyncHandler(getUserById));
user.post(
  `/users`,
  validate({ bodySchema: userBodySchema }),
  asyncHandler(createUser)
);
user.put(
  `/users/:id`,
  validate({ bodySchema: userBodySchema }),
  asyncHandler(updateUser)
);
user.delete(`/users/:id`, asyncHandler(deleteUser));

export default user;

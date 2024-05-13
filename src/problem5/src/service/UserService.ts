import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { User } from '../entity/User';
import { getConnection } from 'typeorm';
import { AuthRequest } from '../middlewares/AuthRequestContext';
import { BadRequestError, InternalServerError } from '../core/errorResponse';
import { OK } from '../core/successResponse';

/**
 * Service class for handling user-related operations.
 */
export default class UserService {
  /**
   * Creates a new user.
   * @param req - The request object.
   * @returns A Promise that resolves to the created user.
   */
  async create(req: Request) {
    try {
      const { firstName, lastName, password, phoneNumber, timestamp, email } =
        req.body;

      const hashPassword = await hash(password, 12);

      const user = new User();
      user.firstName = firstName;
      user.lastName = lastName;
      user.password = hashPassword;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.last_updated = new Date();
      user.timestamp = timestamp ? new Date(timestamp) : new Date();
      await user.save();

      return classToPlain(user);
    } catch (error) {
      throw new InternalServerError({ message: error.message });
    }
  }

  /**
   * Retrieves all users.
   * @returns A Promise that resolves to the list of users.
   */
  async getAll() {
    try {
      const users = await getConnection()
        .getRepository(User)
        .createQueryBuilder('user')
        .orderBy('user.timestamp', 'DESC')
        .paginate();

      const { data } = users;

      const newUsers: unknown[] = [];

      data.forEach((user: User) => {
        newUsers.push(classToPlain(user));
      });

      return newUsers;
    } catch (error) {
      throw new InternalServerError({ message: error.message });
    }
  }

  /**
   * Retrieves a user by ID.
   * @param req - The authenticated request object.
   * @returns A Promise that resolves to the retrieved user.
   */
  async getById(req: AuthRequest) {
    const user = await User.findOne(req.params.id);

    if (!user) {
      throw new BadRequestError({
        message: 'User does not found',
      });
    }

    return classToPlain(user);
  }

  /**
   * Updates a user.
   * @param req - The authenticated request object.
   * @param res - The response object.
   * @returns A Promise that resolves to the updated user.
   */
  async update(req: AuthRequest, res: Response) {
    try {
      const { firstName, lastName, phoneNumber, email } = req.body;

      const user = await User.findOne(req.params.id);
      if (!user) {
        throw new BadRequestError({
          message: 'User does not found',
        });
      }

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.email = email || user.email;

      await user.save();

      const userResponse = classToPlain(user);

      res.status(200).json({
        success: true,
        user: userResponse,
      });
    } catch (error) {
      throw new InternalServerError({ message: error.message });
    }
  }

  /**
   * Deletes a user.
   * @param req - The authenticated request object.
   * @param res - The response object.
   * @returns A Promise that resolves to a success message.
   */
  async destroy(req: AuthRequest, res: Response) {
    try {
      const user = await User.findOne(req.params.id);
      if (!user) {
        throw new BadRequestError({
          message: 'User does not found',
        });
      }
      user.remove();

      new OK({
        message: 'User deleted successfully',
      }).send(res);
    } catch (error) {
      throw new InternalServerError({ message: 'User does not found' });
    }
  }
}

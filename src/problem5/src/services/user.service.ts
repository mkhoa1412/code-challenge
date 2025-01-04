import { plainToInstance } from "class-transformer";
import { AppDataSource } from "../data-source";
import { CreateUserReqDto } from "../dtos/req/create-user-req.dto";
import { UpdateUserReqDto } from "../dtos/req/update-user-req.dto";
import { UserEntity } from "../entities/user";
import { DetailUserResDto } from "../dtos/res/detail-user-res.dto";
import { ListUserResDto } from "../dtos/res/list-user-res.dto";

export class UserService {
  private userRepository = AppDataSource.getRepository(UserEntity);

  async createUser(createUserDto: CreateUserReqDto): Promise<void> {
    const { email, name } = createUserDto;
    const user = this.userRepository.create({ name, email });

    await this.userRepository.save(user);
  }

  async getDetailUser(id: string): Promise<DetailUserResDto> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return plainToInstance(DetailUserResDto, user);
  }

  async getAllUsers(): Promise<ListUserResDto> {
    const users = await this.userRepository.find();

    return plainToInstance(ListUserResDto, { users });
  }

  async updateUser(id: string, updateUserDto: UpdateUserReqDto): Promise<void> {
    const { email, name } = updateUserDto;
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const userUpdate = this.userRepository.create({
      ...user,
      name,
      email,
    });

    await this.userRepository.save(userUpdate);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await this.userRepository.softDelete(id);
  }
}

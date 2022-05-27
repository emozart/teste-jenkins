import { Injectable ,Inject} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import { User } from '../models/user.model';
import { UserType } from './user.dto';
import {CreateUserInput, UpdateUserInput} from './user.input';

@Injectable()
export class UsersService {

  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly userRepository: typeof User,
  ) {}

  async findAll(): Promise<UserType[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneData(id: string): Promise<User> {
    return this.userRepository.findOne({
      raw:true,
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async create(createUserDto: CreateUserInput): Promise<UserType> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.isActive = true;
    return await user.save();
  }

  async update(id: number, user: UpdateUserInput): Promise<UserType | boolean> {
    const obj = await this.userRepository.findOne<User>({
      where: { id, isActive: true },
    });
    if (obj === null || Object.keys(obj).length === 0) {
      return false;
    }

    obj.firstName = user.firstName;
    obj.lastName = user.lastName;
    obj.isActive = user.isActive;
    return await obj.save();
  }

  async delete(id: number): Promise<UserType | boolean> {
    const obj = await this.userRepository.findOne<User>({
      where: { id, isActive: true },
    });
    if (obj === null || Object.keys(obj).length === 0) {
      return false;
    }
    obj.isActive = false;
    return await obj.save();
  }
}
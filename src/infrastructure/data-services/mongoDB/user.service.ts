import { Injectable } from '@nestjs/common';
import { MongoDataServices } from './mongo-data-services.service';
import { User } from '../../../domain/entity/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly mongoDataServices: MongoDataServices) {}

  async createUser(user: User): Promise<User> {
    return this.mongoDataServices.createUser(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.mongoDataServices.findUserByEmail(email);
  }
}

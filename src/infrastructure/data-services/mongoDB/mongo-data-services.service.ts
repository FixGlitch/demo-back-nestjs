import { Model } from 'mongoose';
import { User } from '../../../domain/entity/user.entity';

export class MongoDataServices {
  constructor(private readonly userModel: Model<User>) {}

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }
}

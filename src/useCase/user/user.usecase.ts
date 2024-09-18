import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entity/user.entity';
import { MongoDataServices } from '../../infrastructure/data-services/mongoDB/mongo-data-services.service';
import { CreateUserDto } from '../../domain/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly dataServices: MongoDataServices) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.fullName = createUserDto.fullName;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    return this.dataServices.createUser(newUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.dataServices.findUserByEmail(email);
  }

  //   async getUserById(userId: string): Promise<User | null> {
  //     return this.dataServices.getUserById(userId);
  //   }
}

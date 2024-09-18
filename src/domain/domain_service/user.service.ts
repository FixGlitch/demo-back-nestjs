import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserRepository } from '../abstracts/user-repository.abstract';
import { AuthService } from '../abstracts/auth-service.abstract';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserDomainService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.authService.hashPassword(
      createUserDto.password,
    );
    const newUser = new User();
    newUser.fullName = createUserDto.fullName;
    newUser.email = createUserDto.email;
    newUser.password = hashedPassword;
    return this.userRepository.createUser(newUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findUserByEmail(email);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findUserByEmail(email);
    if (
      user &&
      (await this.authService.comparePasswords(password, user.password))
    ) {
      return user;
    }
    return null;
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.userRepository.getUserById(userId);
  }

  async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
    return this.userRepository.updateUser(userId, updateData);
  }

  async deleteUser(userId: string): Promise<void> {
    return this.userRepository.deleteUser(userId);
  }
}

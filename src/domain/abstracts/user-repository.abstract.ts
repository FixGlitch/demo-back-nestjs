import { User } from '../entity/user.entity';

export abstract class UserRepository {
  abstract createUser(user: User): Promise<User>;
  abstract findUserByEmail(email: string): Promise<User | null>;
  abstract getUserById(userId: string): Promise<User | null>;
  abstract updateUser(userId: string, user: Partial<User>): Promise<User>;
  abstract deleteUser(userId: string): Promise<void>;
}

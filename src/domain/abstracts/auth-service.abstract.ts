export abstract class AuthService {
  abstract hashPassword(password: string): Promise<string>;
  abstract comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  abstract generateToken(userId: string): string;
  abstract validateToken(token: string): Promise<any>;
}

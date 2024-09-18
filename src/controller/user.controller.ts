import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../domain/domain_service/auth.service';
import { UserService } from '../useCase/user/user.usecase';
import { CreateUserDto, LoginUserDto } from '../domain/dto/user.dto';
import { User } from '../domain/entity/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.authService.hashPassword(
      createUserDto.password,
    );
    const newUser = await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser;
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (
      !user ||
      !(await this.authService.comparePasswords(
        loginUserDto.password,
        user.password,
      ))
    ) {
      throw new Error('Invalid credentials');
    }
    const token = this.authService.generateToken(user.userId);
    return { accessToken: token };
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Get('profile/:id')
  //   async getProfile(@Param('id') userId: string): Promise<User> {
  //     return this.userService.getUserById(userId);
  //   }
}

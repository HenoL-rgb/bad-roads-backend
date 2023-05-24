import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { UserDto } from './dto/user-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.generateTokens(user);
    console.log(user);
    
    return { ...tokens, user: new UserDto(user) };
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
    const tokens = await this.generateTokens(user);
    return { ...tokens, user: new UserDto(user) };
  }

  private async generateTokens(user: UserDto) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    const accessToken = this.jwtService.sign(payload, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m'});
    const refreshToken = this.jwtService.sign(payload, {secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d'});
    return { accessToken, refreshToken };
  }

  private async validateUser(dto: CreateUserDto) {
    console.log('validate user dto ', dto);
    try {
      const user = await this.userService.getUserByEmail(dto.email);
      const passwordEquals = await bcrypt.compare(dto.password, user.password);
      if (user && passwordEquals) {
        return user;
      }
    } catch (error) {
      throw new UnauthorizedException({ message: 'u r dolboeb' });
    }
  }

  private validateAccessToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {secret: process.env.JWT_ACCESS_SECRET});
      return userData;
    } catch (error) {
      return null;
    }
  }

  private validateRefreshToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {secret: process.env.JWT_REFRESH_SECRET});
      return userData;
    } catch (error) {
      return null;
    }
  }

  async refresh(refreshToken: string) {
    if(!refreshToken) {
      return new UnauthorizedException({ message: 'Unauthorized' });
    }
    console.log('got refresh', refreshToken);
    
    const userData: UserDto = this.validateRefreshToken(refreshToken);

    if(!userData) {
      return new UnauthorizedException({message: 'Unauthorized'})
    }

    const user = await this.userService.getUserById(userData.id)

    const userDto = new UserDto(user);
    console.log('Info', userDto);
    
    const tokens = await this.generateTokens(userDto);
    
    return { ...tokens, user: {...userDto, createdAt: user.createdAt} };
  }
}

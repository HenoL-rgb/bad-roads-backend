import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth controller')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {                
        return this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @Get('/refresh')
    refresh(@Req() request: Request) {     
        console.log('connected');
        
        const token: any = request.headers.refresh;   
        return this.authService.refresh(token);
    }
}

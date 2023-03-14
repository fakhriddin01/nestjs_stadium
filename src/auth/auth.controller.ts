import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() image?: any) {
    return this.authService.registration(createUserDto, image);
  }

  @HttpCode(200)
  @Post('/login')
  login(@Body() loginDto: LoginDto  ){
    return this.authService.login(loginDto)
  }

  
}

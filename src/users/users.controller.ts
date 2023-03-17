import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put, UseGuards, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger'
import { JwtGuard } from '../guards/jwt-auth.guard';
import { UserSelfGuard } from '../guards/user-self.guard';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './models/user.model';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { PhoneUserDto } from './dto/phone-user.dto';


@ApiTags('Users lar bo`limi')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  registration(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true}) res: Response) {
    return this.usersService.registration(createUserDto, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true}) res: Response) {
    return this.usersService.login(loginUserDto, res);
  }


  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@CookieGetter('refresh_token') refreshToken: string, @Res({ passthrough: true}) res: Response) {
    return this.usersService.logout(refreshToken, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':id/refresh')
  refreshToken(@Param('id') id: number, @CookieGetter('refresh_token') refreshToken: string, @Res({ passthrough: true}) res: Response) {
    return this.usersService.refreshToken(id, refreshToken, res);
  }

  @Get('activate/:link')
  activate(@Param('link') link: string){
    return this.usersService.activate(link)
  }

  @Post('/otp')
  newOtp(@Body() phoneUserDto: PhoneUserDto) {
    return this.usersService.newOtp(phoneUserDto);
  }

  @ApiOperation({summary: 'Hamma userlarni olish'})
  @UseGuards(JwtGuard)
  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({summary: 'Bitta userni olish'})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }


  @ApiOperation({summary: 'userni o`chirish'})
  @ApiResponse({status: 203, description: "1"})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

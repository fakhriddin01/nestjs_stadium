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


@ApiTags('Users lar bo`limi')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @ApiOperation({summary: 'Userni yaratish'})
  // @Post()
  // @UseInterceptors(FileInterceptor('image'))
  // create(@Body() createUserDto: CreateUserDto, @UploadedFile() image: any) {
  //   return this.usersService.create(createUserDto, image);
  // }

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
  @Get('logout')
  logout(refresh_token: string, @Res({ passthrough: true}) res: Response) {
    return this.usersService.logout(refresh_token, res);
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

  // @ApiOperation({summary: 'userni yangilash'})
  // @UseGuards(UserSelfGuard)
  // @UseGuards(JwtGuard)
  // @Put(':id')
  // @UseInterceptors(FileInterceptor('image'))
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, image?: any) {
  //   return this.usersService.update(+id, updateUserDto, image);
  // }

  @ApiOperation({summary: 'userni o`chirish'})
  @ApiResponse({status: 203, description: "1"})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger'


@ApiTags('Users lar bo`limi')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: 'Userni yaratish'})
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() image: any) {
    return this.usersService.create(createUserDto, image);
  }

  @ApiOperation({summary: 'Hamma userlarni olish'})
  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({summary: 'Bitta userni olish'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({summary: 'userni yangilash'})
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, image?: any) {
    return this.usersService.update(+id, updateUserDto, image);
  }

  @ApiOperation({summary: 'userni o`chirish'})
  @ApiResponse({status: 203, description: "1"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

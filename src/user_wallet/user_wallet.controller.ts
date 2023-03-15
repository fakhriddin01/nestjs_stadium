import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserWalletService } from './user_wallet.service';
import { CreateUserWalletDto } from './dto/create-user_wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user_wallet.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger'


@ApiTags('User-wallet bo`limi')
@Controller('user-wallet')
export class UserWalletController {
  constructor(private readonly userWalletService: UserWalletService) {}

  @ApiOperation({summary: 'user_wallet yaratish'})
  @Post()
  create(@Body() createUserWalletDto: CreateUserWalletDto) {
    return this.userWalletService.create(createUserWalletDto);
  }

  @ApiOperation({summary: 'user_wallet larni olish'})
  @Get('all')
  findAll() {
    return this.userWalletService.findAll();
  }

  @ApiOperation({summary: 'user_wallet ni olish'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userWalletService.findOne(+id);
  }

  @ApiOperation({summary: 'user_wallet ni yangilash'})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserWalletDto: UpdateUserWalletDto) {
    return this.userWalletService.update(+id, updateUserWalletDto);
  }

  @ApiOperation({summary: 'user_wallet ni o`chirish'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userWalletService.remove(+id);
  }
}

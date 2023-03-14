import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports:[SequelizeModule.forFeature([User]), FilesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}

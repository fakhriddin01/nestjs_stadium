import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([User]), FilesModule,
  forwardRef(() => AuthModule), JwtModule.register({
    secret: 'MySecretKey',
      signOptions: {
        expiresIn: '24h'
      },
  })],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}

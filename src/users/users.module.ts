import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { OtpModule } from '../otp/otp.module';
import { BotModule } from '../bot/bot.module';
import { Otp } from '../otp/models/otp.model';

@Module({
  imports:[SequelizeModule.forFeature([User, Otp]), FilesModule, MailModule, OtpModule, BotModule,
  forwardRef(() => AuthModule), JwtModule.register({
    secret: 'MyAccesVeySecretKey12345',
      signOptions: {
        expiresIn: '24h'
      },
  })],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}

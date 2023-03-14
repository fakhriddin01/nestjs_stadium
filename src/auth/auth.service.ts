import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/models/user.model';
import { FilesService } from '../files/files.service';
import { LoginDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {

constructor( private readonly userService: UsersService, private readonly jwtService: JwtService, private readonly fileService: FilesService) {}

  async registration(userDto: CreateUserDto, image?: any) {
    const condidate = await this.userService.getUserByEmail(userDto.email);
    if(condidate) {
      throw new HttpException(
        'Bunday foydalanuvchi mavjud',
        HttpStatus.BAD_REQUEST,
      );
    }
    if(image){
        const hashedPassword = await bcrypt.hash(userDto.hashed_password,7)
        userDto.hashed_password = hashedPassword;
        const user = await this.userService.create(
          userDto,
          image
        );

      return this.generateToken(user);
    }
      const hashedPassword = await bcrypt.hash(userDto.hashed_password,7)
      userDto.hashed_password = hashedPassword;
      const user = await this.userService.create(userDto);
      return this.generateToken(user);
  }

  private async validateUser(loginDto: LoginDto){
    const user = await this.userService.getUserByEmail(loginDto.email);
    if(!user){
      throw new UnauthorizedException("Email yoki Parl notogri");
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      user.hashed_password
    );

    if(validPassword){
      return user;
    }
    throw new UnauthorizedException("Email yoki Parl notogri");
  }
  

  async login(loginDto: LoginDto){
    const user = await this.validateUser(loginDto);
    if(!user) {
      throw new HttpException('Foydalanuvchi yuq', HttpStatus.NOT_FOUND)
    }
    return this.generateToken(user)
  }




  private async generateToken(user: User){
    const payload = { email: user.email,  id: user.id};
    return{ token: this.jwtService.sign(payload)}
  }

  
}

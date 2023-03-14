import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepo: typeof User, private readonly fileService: FilesService){}

  async create(createUserDto: CreateUserDto, image?: any) {
    if(image){
      const fileName = await this.fileService.createFile(image);
      const newUser = await this.userRepo.create({...createUserDto, user_photo: fileName});
      
      return newUser;
    }

    const newUser = await this.userRepo.create({...createUserDto});
    return newUser;

  }

  async findAll() {
    return await this.userRepo.findAll({include:{all:true}});
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({where: {id},include:{all:true}});
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto, image?: any) {
    if(image){
      const fileName = await this.fileService.createFile(image);
      const newUser = await this.userRepo.update({...updateUserDto, user_photo: fileName}, {where: {id}});
      return newUser;
    }
    const newUser = await this.userRepo.update({...updateUserDto}, {where: {id}, returning: true});
    return newUser[1][0];
  }

  async remove(id: number) {
    return await this.userRepo.destroy({where: {id}});
  }

  async getUserByEmail(email: string){
    const user = await this.userRepo.findOne({
      where: {email},
      include: {all:true}
    })
  
    return user
  }
}

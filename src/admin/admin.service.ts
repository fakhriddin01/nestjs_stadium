import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminRepo: typeof Admin, private readonly fileService: FilesService){}
  async create(createAdminDto: CreateAdminDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const newAdmin = await this.adminRepo.create({...createAdminDto, admin_photo: fileName});

    return newAdmin;
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}

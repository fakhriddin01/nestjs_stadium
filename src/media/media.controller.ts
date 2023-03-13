import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createMediaDto: CreateMediaDto, @UploadedFile() image: any) {
    return this.mediaService.create(createMediaDto, image);
  }

  @Get('all')
  findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mediaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto, image?: any) {
    return this.mediaService.update(+id, updateMediaDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}

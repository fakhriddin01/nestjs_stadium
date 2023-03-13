import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { StadiumsService } from './stadiums.service';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { AddComfortDto } from './dto/add-comfort.dto';

@Controller('stadiums')
export class StadiumsController {
  constructor(private readonly stadiumsService: StadiumsService) {}

  @Post()
  create(@Body() createStadiumDto: CreateStadiumDto) {
    return this.stadiumsService.create(createStadiumDto);
  }

  @Get('all')
  findAll() {
    return this.stadiumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stadiumsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStadiumDto: UpdateStadiumDto) {
    return this.stadiumsService.update(+id, updateStadiumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stadiumsService.remove(+id);
  }

  @Post('add_comfort')
  addComfort(@Body() addComfortDto: AddComfortDto){
    return this.stadiumsService.addComfort(addComfortDto)
  }
}

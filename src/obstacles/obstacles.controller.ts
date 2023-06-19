import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObstaclesService } from './obstacles.service';
import { CreateObstacleDto } from './dto/create-obstacle.dto';

@Controller('api/obstacles')
export class ObstaclesController {
    constructor(private obstaclesService: ObstaclesService) {}

    @Get()
    getAll() {
        return this.obstaclesService.getAll();
    }

    @Get('/:id')
    getById(@Param('id') id: number) {
        return this.obstaclesService.getById(id);
    }   

    @Post()
    create(@Body() data: CreateObstacleDto) {
        return this.obstaclesService.create(data);
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.obstaclesService.delete(id);
    }
}

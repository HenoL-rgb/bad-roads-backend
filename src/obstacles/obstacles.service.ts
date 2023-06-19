import { Injectable } from '@nestjs/common';
import { Obstacle } from './obstacles.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateObstacleDto } from './dto/create-obstacle.dto';

@Injectable()
export class ObstaclesService {
    constructor(@InjectModel(Obstacle) private obstacleRepository: typeof Obstacle) {}

    getAll = async () => {
        const obstacles = await this.obstacleRepository.findAll();

        return obstacles;
    }

    getById = async (id: number) => {
        const obstacle = await this.obstacleRepository.findByPk(id)

        return obstacle;
    }

    create = async (data: CreateObstacleDto) => {
        const obstacle = await this.obstacleRepository.create(data);

        return obstacle;
    }

    delete = async (id: number) => {
        const obstacle = await this.obstacleRepository.destroy({
            where: {
                id
            }
        })

        return obstacle;
    }
}

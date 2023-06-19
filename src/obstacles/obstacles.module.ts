import { Module } from '@nestjs/common';
import { ObstaclesService } from './obstacles.service';
import { ObstaclesController } from './obstacles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Obstacle } from './obstacles.model';
import { Route } from 'src/routes/routes.model';

@Module({
  providers: [ObstaclesService],
  controllers: [ObstaclesController],
  imports: [
    SequelizeModule.forFeature([Obstacle, User, Route])
  ],
  exports: [
    ObstaclesService
  ]
})
export class ObstaclesModule {}

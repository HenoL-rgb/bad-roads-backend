import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { Route } from './routes.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [RoutesService],
  controllers: [RoutesController],
  imports: [
    SequelizeModule.forFeature([Route]),
  ]
})
export class RoutesModule {}

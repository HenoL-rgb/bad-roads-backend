import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Route } from 'src/routes/routes.model';
import { User } from 'src/users/users.model';
import { Like } from './likes.model';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports: [
    SequelizeModule.forFeature([Route, User, Like])
  ],
})
export class LikesModule {}

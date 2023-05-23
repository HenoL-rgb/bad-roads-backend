import { forwardRef, Module } from '@nestjs/common';
import { DislikesService } from './dislikes.service';
import { DislikesController } from './dislikes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Route } from 'src/routes/routes.model';
import { User } from 'src/users/users.model';
import { Dislike } from './dislikes.model';
import { Like } from 'src/likes/likes.model';
import { LikesModule } from 'src/likes/likes.module';

@Module({
  controllers: [DislikesController],
  providers: [DislikesService],
  imports: [
    SequelizeModule.forFeature([Route, User, Dislike, Like]),
    forwardRef(() => LikesModule),
  ],
  exports: [DislikesService],
})
export class DislikesModule {}

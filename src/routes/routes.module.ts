import { forwardRef, Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { Route } from './routes.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { Role } from 'src/roles/roles.model';
import { AuthModule } from 'src/auth/auth.module';
import { Like } from 'src/likes/likes.model';
import { LikesModule } from 'src/likes/likes.module';
import { Dislike } from 'src/dislikes/dislikes.model';
import { DislikesModule } from 'src/dislikes/dislikes.module';
import { Image } from 'src/images/images.model';
import { ImagesModule } from 'src/images/images.module';
import { Obstacle } from 'src/obstacles/obstacles.model';
import { ObstaclesModule } from 'src/obstacles/obstacles.module';

@Module({
  providers: [RoutesService],
  controllers: [RoutesController],
  imports: [
    SequelizeModule.forFeature([Route, User, Role, UserRoles, Like, Dislike, Obstacle, Image]),
    RolesModule,
    LikesModule,
    DislikesModule,
    ObstaclesModule,
    ImagesModule,
    forwardRef(() => AuthModule),
  ]
})
export class RoutesModule {}

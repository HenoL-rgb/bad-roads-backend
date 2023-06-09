import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Dislike } from 'src/dislikes/dislikes.model';
import { DislikesModule } from 'src/dislikes/dislikes.module';
import { Like } from 'src/likes/likes.model';
import { LikesModule } from 'src/likes/likes.module';
import { Role } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/user-roles.model';
import { Route } from 'src/routes/routes.model';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Route, Like, Dislike]),
    RolesModule,
    LikesModule,
    DislikesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoutesModule } from './routes/routes.module';
import { Route } from './routes/routes.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { LikesModule } from './likes/likes.module';
import { Like } from './likes/likes.model';
import { Dislike } from './dislikes/dislikes.model';
import { DislikesModule } from './dislikes/dislikes.module';
import { ImagesModule } from './images/images.module';
import { Image } from './images/images.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      models: [Route, User, Role, UserRoles, Like, Dislike],
      autoLoadModels: true,
    }),
    RoutesModule,
    UsersModule,
    RolesModule,
    AuthModule,
    LikesModule,
    DislikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

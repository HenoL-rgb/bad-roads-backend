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

@Module({
  providers: [RoutesService],
  controllers: [RoutesController],
  imports: [
    SequelizeModule.forFeature([Route, User, Role, UserRoles]),
    RolesModule,
    forwardRef(() => AuthModule),
  ]
})
export class RoutesModule {}

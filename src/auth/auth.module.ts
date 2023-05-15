import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RoutesModule } from 'src/routes/routes.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => RoutesModule),

    JwtModule.register({})
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}

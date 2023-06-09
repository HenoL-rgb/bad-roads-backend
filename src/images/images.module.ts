import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { Image } from './images.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Route } from 'src/routes/routes.model';

@Module({
  providers: [ImagesService],
  controllers: [ImagesController],
  imports: [
    SequelizeModule.forFeature([Route, Image]),
  ],
  exports: [
    ImagesService
  ]
})
export class ImagesModule {}

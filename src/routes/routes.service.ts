import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ImagesService } from 'src/images/images.service';
import { RouteDto } from './dto/RouteDto';
import { UpdateRouteDto } from './dto/UpdateRouteDto';
import { Route } from './routes.model';
import * as uuid from 'uuid';
import { Image } from 'src/images/images.model';

@Injectable()
export class RoutesService {
  constructor(
    @InjectModel(Route) private routeRepository: typeof Route,
    @InjectModel(Image) private imageRepository: typeof Image,
    private fileService: ImagesService,
  ) {}

  getImages = async (route: RouteDto, createdRoute: Route) => {
    const imagesPaths = route.images.map(async (image) => {
      const path = await this.fileService.create(image);
      console.log(path);

      await this.imageRepository.create({
        routeId: createdRoute.id,
        path: path,
      });
    });

    return imagesPaths;
  };

  saveRoute = async (route: RouteDto) => {
    try {
      if (route.route.length === 0) {
        throw new BadRequestException({ message: 'Error while saving route' });
      }

      const createdRoute = await this.routeRepository.create({
        route: JSON.stringify(route.route),
        userId: route.userId,
        icon: route.icon,
        obstacleId: route.obstacleId,
        description: route.description,
      });

      const imagesPath = await this.getImages(route, createdRoute);

      const res = await this.routeRepository.findByPk(createdRoute.id, {
        include: [
          {
            association: 'likedUsers',
            attributes: ['id'],
            through: {
              attributes: [],
            },
          },
          {
            association: 'dislikedUsers',
            attributes: ['id'],
            through: {
              attributes: [],
            },
          },
          {
            association: 'images',
            attributes: ['path'],
          },
        ],
      });

      console.log('res', res);

      return res;
    } catch (e) {
      console.log(e);
    }
  };

  getAll = async () => {
    const routes = await this.routeRepository.findAll({
      include: [
        {
          association: 'likedUsers',
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
        {
          association: 'dislikedUsers',
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
        {
          association: 'obstacle',
          attributes: ['id', 'icon', 'description'],
        },
      ],
    });

    return routes;
  };

  getById = async (id: number) => {
    const route = await this.routeRepository.findByPk(id, {
      include: [
        {
          association: 'likedUsers',
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
        {
          association: 'dislikedUsers',
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
        {
          association: 'author',
          attributes: ['email'],
        },
        {
          association: 'images',
          attributes: ['path'],
        },
        {
          association: 'obstacle',
          attributes: ['id', 'icon', 'description'],
        },
      ],
    });

    return route;
  };

  getByUserId = async (id: number) => {
    const routes = await this.routeRepository.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          association: 'likedUsers',
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
        {
          association: 'dislikedUsers',
          attributes: ['id'],
          through: {
            attributes: [],
          },
        },
        {
          association: 'author',
          attributes: ['email'],
        },
        {
          association: 'images',
          attributes: ['path'],
        },
        {
          association: 'obstacle',
          attributes: ['id', 'icon', 'description'],
        },
      ],
    });

    return routes;
  };

  deleteRoute = async (routeId: number) => {
    const route = await this.routeRepository.destroy({
      where: {
        id: routeId,
      },
    });

    return route;
  };

  updateRoute = async (route: UpdateRouteDto) => {
    try {
      const res = await this.routeRepository.update(
        {
          route: JSON.stringify(route.points),
          isApproved: false,
        },
        {
          where: {
            id: route.id,
          },
        },
      );

      return res;
    } catch (e) {
      console.log(e);
    }
  };

  approveRoute = async (routeId: number) => {
    try {
      const res = await this.routeRepository.update(
        {
          isApproved: true,
        },
        {
          where: {
            id: routeId,
          },
        },
      );

      return res;
    } catch (error) {
      console.log(error);
    }
  };
}

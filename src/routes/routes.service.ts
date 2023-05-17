import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RouteDto } from './dto/RouteDto';
import { UpdateRouteDto } from './dto/UpdateRouteDto';
import { Route } from './routes.model';

@Injectable()
export class RoutesService {
  constructor(@InjectModel(Route) private routeRepository: typeof Route) {}
  saveRoute = async (route: RouteDto) => {
    try {
      const res = await this.routeRepository.create({
        route: JSON.stringify(route.route),
        userId: route.userId,
      });
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  getAll = async () => {
    const routes = await this.routeRepository.findAll();
    return routes;
  };

  getByUserId = async (id: number) => {
    const routes = await this.routeRepository.findAll({
      where: {
        userId: id,
      },
    });

    return routes;
  };

  deleteRoute = async (routeId: number) => {
    console.log(routeId);

    const route = await this.routeRepository.destroy({
      where: {
        id: routeId,
      },
    });

    return route;
  };

  updateRoute = async (route: UpdateRouteDto) => {
    try {
      console.log(route);

      const res = await this.routeRepository.update(
        {
          route: JSON.stringify(route.points),
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

  decreaseRating = async (routeId: number) => {
    try {
      const route = await this.routeRepository.findByPk(routeId);

      if (route.rate <= 0) {
        return route;
      }

      const res = await this.routeRepository.update(
        {
          rate: route.rate - 0.1,
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

  increaseRating = async (routeId: number) => {
    try {
      const route = await this.routeRepository.findByPk(routeId);

      if(route.rate >= 5) {
        return route;
      }
      
      const res = await this.routeRepository.update(
        {
          rate: route.rate + 0.1,
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

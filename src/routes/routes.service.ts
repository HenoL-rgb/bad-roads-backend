import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RouteDto } from './dto/RouteDto';
import { Route } from './routes.model';

@Injectable()
export class RoutesService {
    constructor(@InjectModel(Route) private routeRepository: typeof Route){}
    saveRoute = async (route: RouteDto) => {
        try{
            console.log(route);
            
            const res = await this.routeRepository.create({
                route: JSON.stringify(route)
            })
            return res;
        } catch(e) {
            console.log(e);
            
        }
    }

    getAll = async () => {
        const routes = await this.routeRepository.findAll();
        return routes;
    }
}

import { Body, Controller, Post, Get } from '@nestjs/common';
import { RouteDto } from './dto/RouteDto';
import { RoutesService } from './routes.service';

@Controller('api/routes')
export class RoutesController {
  constructor(private routeService: RoutesService) {}

  @Post()
  saveRoute(@Body() route: RouteDto) {
    return this.routeService.saveRoute(route);    
  }
  @Get()
  getAll() {
    return this.routeService.getAll();
  }
}

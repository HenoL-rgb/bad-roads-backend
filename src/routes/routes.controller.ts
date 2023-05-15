import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { RouteDto } from './dto/RouteDto';
import { UpdateRouteDto } from './dto/UpdateRouteDto';
import { RoutesService } from './routes.service';

@Controller('api/routes')
export class RoutesController {
  constructor(private routeService: RoutesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  saveRoute(@Body() route: RouteDto) {    
    
    return this.routeService.saveRoute(route);    
  }

  @Get()
  getAll() {
    return this.routeService.getAll();
  }

  @Post('/delete')
  deleteRoute(@Body() route: {routeId: number}) {
    
    return this.routeService.deleteRoute(route.routeId)
  }

  @Post('/update')
  updateRoute(@Body() route: UpdateRouteDto) {
    return this.routeService.updateRoute(route);
  }

  @Post('/approve')
  approveRoute(@Body() route: {routeId: number}) {
    return this.routeService.approveRoute(route.routeId);
  }
}

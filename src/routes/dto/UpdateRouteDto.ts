interface Route {
    lat: number;
    lon: number;
  }
  
  export class UpdateRouteDto {
    readonly points: Route[];
    readonly id: number;
  }
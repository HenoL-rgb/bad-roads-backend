interface Route {
  lat: number;
  lon: number;
}

export class RouteDto {
  readonly route: Route[];
}

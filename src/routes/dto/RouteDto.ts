interface Route {
  lat: number;
  lon: number;
}

export class RouteDto {
  readonly route: Route[];
  readonly userId: number;
  readonly icon: string;
}

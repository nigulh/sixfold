import {getAllRoutes} from "../Database";
import {Route} from "../models/Route";

export class RouteProvider {
    findAll() {
        return new Promise<Array<Route>>((resolve, reject) => {
            getAllRoutes()
                .then(allAirports => {
                    resolve(allAirports.map(this.mapToRoute));
                });
        });
    }

    private mapToRoute(data: string[]): Route {
        return new Route(data[2], data[4]);
    }

}

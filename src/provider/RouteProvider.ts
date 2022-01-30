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

    findById(origin: string, destination: string) {
        return new Promise<Route>((resolve, reject) => {
            this.findAll().then(data => {
                let item = data.find(x => x.originIataCode == origin && x.destinationIataCode == destination);
                if (item === undefined) {
                    reject("Could not find Route from " + origin + " to " + destination + " !");
                } else {
                    resolve(item);
                }
            });
        })
    }


    private mapToRoute(data: string[]): Route {
        return new Route(data[2], data[4]);
    }

}

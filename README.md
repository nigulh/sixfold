# Nodejs sample project
Find shortest path between airports

### Prerequisites
Make sure you have installed
* git
* Docker

Optionally, if you want to develop or run unit tests
* nodejs, npm

### Download source code
```shell
git clone https://github.com/nigulh/sixfold.git
```

### Start demo
```shell
docker-compose up
```
If it succeeds, then open [Swagger UI](http://localhost:3080/) in your web browser.

## Features
* api/swagger.json is the api documentation, used by the swagger service 
* `/airways/shortestPath` is the main route
* Database is "implemented" as a text file
* To find shortest path we use modified Dijkstra algorithm. The vertices are `AirportNode`s, with
the AirportId and flightsRemaining. Instead of distance from source to current node we keep the
distance from source to current node with best-case estimated distance from current node to target node.
* ```jest``` for unittests

## TODOs
* Transfers with 50km limit is not implemented (yet).
* I could not find Swagger suitable generation tool, documentation might get outdated due to refactorings
* Swagger validation is missing

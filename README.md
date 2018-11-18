# ProyectoBE 

This repo is functionality complete, is an express app that makes all the CRUD operation related with your pizzas' recipes.

## Gettin Started
To get the Node server running locally:

- Clone this repo
- npm install to install all required dependencies
- Install MongoDB Community Edition and Compass. Connect to MongoDB via Compass and create the Data Base "Comida_Rapida" with the collection "Pizza"
- Install Redis and run it like a service en your computer
- npm run dev to start the local server

## Code overview

### Dependencies
- [express] - The server for handling and routing HTTP requests.
- [MongoClient] - To connect and make the CRUD operations in MongoDB.
- [RedisClient] - To connect and make the CRID operation for the app's cache.
- [Cors] - To allow the connecto between application from different origins.
- [Pug] - It's require to use express.
- [Debug] - It's require to debug the app.
- [Config] - Allows you to connect to different endpoints depending the enviroment you're running the app.

[Config]: https://www.npmjs.com/package/config
[Cors]: https://www.npmjs.com/package/cors
[Debug]: https://www.npmjs.com/package/debug
[express]: https://www.npmjs.com/package/express
[MongoClient]: https://www.npmjs.com/package/mongoclient
[Pug]: https://www.npmjs.com/package/pug
[RedisClient]: https://www.npmjs.com/package/redisclient


### Application Structure
- app.js - The entry point to our application. It also requires the routes and models we'll be using in the application and defines our express server.
- routes - This folder contains the route definitions for our API.
    - pizza - This file connects the app to Redis using redis client. Also it locates all the routes for the HTTP actions.
- modules/functions - This file connects the app to MongoDB using mongo-client, also it contains all the CRUD operation for the database.
- config - This folder contains the configurations files that have the endpoints for Mongo and Redis' clients.
    - defualt.json - This file contains the endpoint for the development enviroment.
    - production.json - This file contains the endpoint for the production enviroment.





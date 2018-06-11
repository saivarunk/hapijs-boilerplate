# Hapi.js Boilerplate

Simple Boilerplate for Hapi.js with Mongoose

### Prerequisits
- MongoDB Connection String 
- Node.js >=8.9.4 and npm >=5.3.0

### Environment Variables
These settings are found config/default.js file.
App reads config properties from the following environment variables:
- `NODE_ENV` : development / production.
- `PORT`: port to run the app on (ex: 8080).
- `APP_HOSTNAME`: Host address (ex: localhost:8080).
- `JWT_SECRET`: The jwt secret hash. (ex: RANDOM_SECRET).
- `JWT_EXPIRY`: The expiration time of jwt. (ex: 15m) (m is for minutes).
- `MONGO_URL`: Mongodb connection uri (ex: mongodb://localhost:27017/db).

### Start server

> Configure the environment variables first.

> Run `npm install` to install all dependencies.

> To start the api-server simply run `npm start` or ` node server.js`

### API Documentation
> API Documentation will be available at `http://{hostname}/api/documentation`
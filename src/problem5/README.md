# Problem5 service

## Docker

- To start working environment, please run `docker-compose up -d`
- To access nodejs app, access address `http://localhost:$SERVE_PORT`

## Install

- copy file .env.example file to .env file
- set the enviroment variables
- run `docker-compose exec app bash` in the project root directory
- run `npm install`
- run `npm run generate:jwt` to generate jwt secret. Copy it and put to APP_JWT_SECRET in .env file
- run `npm run migrate:all` for migrating the database
- run `npm run seed:all` for seeding data
- run `npm run dev` for development
- run `npm run docs` for api documentation
- run `npm run build:tsc` for build production using tsc

## Tips

- create new migration: `npx sequelize-cli migration:generate --name <migration-name>`
- create new seed: `npx sequelize-cli seed:generate --name <seed-name>`
- run specific seed: `npx sequelize-cli db:seed --seed <seed-name>`

## CRUD API Endpoints
- User Pagination: GET `{{host}}/api/v1/users`
- User Detail: GET `{{host}}/api/v1/users/:userId`
- User Creation: POST `{{host}}/api/v1/users`
- User Update: PUT `{{host}}/api/v1/users/:userId`
- User Destroy: DELETE `{{host}}/api/v1/users/:userId`
- User Status Update: PATCH `{{host}}/api/v1/users/:userId/status`

## Basic query
```
// This options can be used for all paginated apis.
export type PaginationInputData<D = any> = {
	page: number;
	limit: number;
	sortColumn?: D;
	sortType?: "ASC" | "DESC";
	keyword?: string;
};

// // This options can be used for only paginated user apis.
export type QueryUserOptions = {
	keyword?: string;
	ignoreIds?: string[];
	status?: string;
};
```

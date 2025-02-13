# Table of Contents
- [Requirements](#requirements)
- [Tests](#tests)
- [Preparing for Deployment](#preparing-for-deployment)
- [OpenAPI Document](#openapi-documentation)
- [Database](#database)

# Requirements
- [NodeJS 20+](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/)
- Docker

# Installing dependencies
```
yarn
```

# Development
[Install the dependencies](#installing-dependencies)

Copy `.env.example` and rename it to `.env`
Following the instructions in `.env.example` to set the local environment variable. 

After you have setup the environment variables, run the following command to ramp up local db and stuffs: 
```
docker compose up -d
```

Get the server up and running in watch mode:
```
yarn dev
```

# Preparing for Deployment
Build, output will be in `dist` directory. 
```
yarn build
```

# Tests
Running the test
```
yarn test
yarn test:watch # To run it in watch mode
```

Tests with coverage. Output is in `coverage` directory.
```
yarn test:cov
yarn test:cov:watch # To run it in watch mode
```

# Openapi Documentation
View swagger api doc `http://localhost:8421/doc/` (replace hostname and port on other environments)
To get the specification in json `http://localhost:8421/doc/swagger.json`

# Database
- [Sequelize V6](https://sequelize.org/docs/v6/)

## Migration
Run generate sql command:
```yarn sequelize migration:generate --name <migrationName>```

Implement the migration query in `up` function of the newly generated file. 
`down` function implementation is optional. 

Run all pending migrations, this will run the sql in `up` fn
```yarn sequelize db:migrate```

Revert the latest migration, this will run the sql in `down` fn
```yarn sequelize db:migrate:undo```

More info on [Sequelize V6](https://sequelize.org/docs/v6/)
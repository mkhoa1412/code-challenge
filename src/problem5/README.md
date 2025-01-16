## Problem 5: A CRUDE Server

The problem is kinda vague, so I could imagine it as:
- Designing an API that do some basic CRUD, in this case I chose Manning, which is the American publisher about the technical contents.
- In side this link includes the detailed how to run locally.

```text
https://github.com/khaquangtran/simple-manning-api
```

## Production

I deployed my backend at my EC2 instance:

```text
http://ec2-3-27-248-71.ap-southeast-2.compute.amazonaws.com/books
```

Here's my public RDS

```text
postgresql://postgres:sOh06cuLWGxumoIMCj5f@nineninetechacrudserver.c7wugos24xii.ap-southeast-2.rds.amazonaws.com:5432/postgres?schema=public
```

## Run Production on Local Machine

- If you want to run the production on your machine, please clone the project

```shell
git clone git@github.com:khaquangtran/simple-manning-api.git

cd simple-manning-api

sh scripts/setup.sh
```

- Download the `env` file from S3

```shell
wget https://khaquangtran-useless-stuff.s3.ap-southeast-2.amazonaws.com/env.prod

mv env.prod .env
```

- And run:

```shell
docker compose -f docker-compose.prod.yaml up --build -d
```
## Problem 5: A CRUDE Server

The problem is kinda vague, so I could imagine it as:
- Designing an API that do some basic CRUD, in this case I chose Manning, which is the American publisher about the technical contents.
- In side this link is the main repo i've been working on for this problem, you could checkout to see details.

```text
https://github.com/khaquangtran/simple-manning-api
```

## Production

- I deployed my backend at my EC2 instance as a playground:

```text
http://ec2-3-27-248-71.ap-southeast-2.compute.amazonaws.com/books
```

## Run Production on Local Machine

- If you want to run the production on your machine, please clone the project

```shell
git clone git@github.com:khaquangtran/simple-manning-api.git

cd simple-manning-api

sh scripts/setup.sh
```

- Download the `env.prod` file from S3

```shell
wget https://khaquangtran-useless-stuff.s3.ap-southeast-2.amazonaws.com/env.prod

mv env.prod .env
```

- And run this command in order to connect with RDS backend:

```shell
docker compose -f docker-compose.prod.yaml up --build -d
```
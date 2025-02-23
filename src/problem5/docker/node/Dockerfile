FROM node:20

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    curl

# Install pm2 globally
RUN npm install -g pm2

#Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

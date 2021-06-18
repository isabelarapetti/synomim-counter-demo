# Create Node 10 image from dockerhub
FROM node:10

# Create app directory
RUN mkdir -p /app

# Change directory
WORKDIR /app

COPY package*.json /app/

RUN npm install

# Get app code
COPY . /app/

EXPOSE 4200

# Serve
CMD ["npm", "start"]

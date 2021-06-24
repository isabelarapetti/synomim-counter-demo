FROM node:12-slim

# Create app directory
RUN mkdir -p /app

# Change directory
WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

EXPOSE 4200

# Serve
CMD ["npm", "start"]

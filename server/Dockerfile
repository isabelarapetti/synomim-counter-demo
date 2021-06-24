 # Create image based on the official Node 6 image from the dockerhub
FROM node:6

# Create a directory where our app will be placed
FROM node:12

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

COPY . /usr/src/app
# Install dependecies
RUN npm install

# Expose port 
EXPOSE 4000

# Serve app
CMD ["npm", "start"]
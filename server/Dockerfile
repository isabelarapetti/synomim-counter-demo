 # Create image based on the official Node 6 image from the dockerhub
FROM node:6

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

# Install dependecies
RUN npm install

# Get code from app
COPY . /usr/src/app

# Expose port 
EXPOSE 3000

# Serve app
CMD ["npm", "start"]
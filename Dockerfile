# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /dist

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install

# add app
COPY . ./

# start app

CMD ["npm", "run", "deploy"]

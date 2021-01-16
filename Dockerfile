# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /app

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "run", "start"]

ENV PORT=4000

EXPOSE 4000

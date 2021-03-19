# PACMAN
To run the project you need:
1. Switch node version with command ```nvm use```
2. Create ```.env``` file locally and copy all variables from ```example.env``` into it, otherwise the databases will not start
3. Run Docker Compose with command ```docker-compose -f docker-compose.dev.yml up --build```, app with hot-reload will run and connect to the databases

### HOT RELOAD
If you want hot reload for the backend, replace CMD line with ```CMD ["npm", "run", "start:api"]``` in ```Dockerfile.dev```.

If you develop for the client, replace with ```CMD ["npm", "run", "start:client"]```.

You can see app on https://localhost:9001

### PRODUCTION
For production use ```docker-compose up --build```.

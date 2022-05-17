# r3d

# Contribution rules

- Avoid micro commits
- Create a Pull Request for code changes
- Get Code review done from peer
- Evaluate bugs and console errors before code merge

# Environment Setup

# Note: create .env file in client root and add below settings for authentication to work. Should be added in "project-root/client>.env"
```
REACT_APP_FIREBASE_APIKEY=<REACT_APP_FIREBASE_APIKEY>
REACT_APP_FIREBASE_AUTHDOMAIN=<REACT_APP_FIREBASE_AUTHDOMAIN>
REACT_APP_FIREBASE_PROJECTID=<REACT_APP_FIREBASE_PROJECTID>
REACT_APP_FIREBASE_STORAGEBUCKET=<REACT_APP_FIREBASE_STORAGEBUCKET>
REACT_APP_FIREBASE_MESSAGINGSENDERID=<REACT_APP_FIREBASE_MESSAGINGSENDERID>
REACT_APP_FIREBASE_APPID=<REACT_APP_FIREBASE_APPID>
REACT_APP_FIREBASE_MEASUREMENTID=<REACT_APP_FIREBASE_MEASUREMENTID>
```

# Note: create .env file in project root and add below settings docker. Should be added in "project-root>.env"
```
MONGODB_USER=root
MONGODB_PASSWORD=123456
MONGODB_DATABASE=red
MONGODB_LOCAL_PORT=27017
MONGODB_DOCKER_PORT=27017
NODE_CLIENT_LOCAL_PORT=3000
NODE_SERVER_LOCAL_PORT=4000
NODE_CLIENT_DOCKER_PORT=3000
NODE_SERVER_DOCKER_PORT=4000
```

# Build Instructions

# Seed database
```
project-root/server> npm run seed
```

# Start client server
```
project-root/client> npm run dev
```

# Start backend server
```
project-root/server> npm run dev
```

# The app could also run in containerized environment on docker. docker software shoul dbe installed from [docker](https://docs.docker.com/get-docker/)
```
project-root>docker-compose build
project-root>docker-compose up
```

# APP is available at [App](http://localhost:3000/)

# Apollo Server is available at [Apollo](http://localhost:4000/graphql)

# Mongo is available at [Mongo](http://localhost:27017/)




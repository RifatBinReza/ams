FROM node:lts AS base
WORKDIR /app
COPY package.json /app/

# developmentDependencies
FROM base AS dependencies
WORKDIR /app
RUN npm install --loglevel=error

# development
FROM dependencies AS development
# ENV variables are available to the running conatiners
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
# node will be listening in this port 
ARG PORT=3000
ENV PORT $PORT
#COPY . /app/
COPY --from=dependencies /app/node_modules /app/node_modules
WORKDIR /app
# When container starts it will run the npm local script 
CMD ["./wait-for-it.sh", "postgresql:5432", "--", "npm", "run", "dev"]

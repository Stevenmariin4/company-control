FROM node:18-alpine AS BUILD_IMAGE
# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://gobinaries.com/tj/node-prune | sh
# Create Directory Host Service
WORKDIR /usr/src/app
# Copy file for install dependy to folder host
COPY package*.json ./
# install dependecy
RUN npm install --production
RUN npm install  -g --dev typescript@latest

RUN npm i ts-node
# Copy files to folder host application
COPY . .
# Compile Applciation
RUN tsc

# remove development dependencies
RUN npm prune --production

FROM node:18-alpine
# Create Directory Host Service
WORKDIR /usr/src/app

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/.env ./
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules

VOLUME [ "/data" ]

CMD ["node","./dist/index.js"]

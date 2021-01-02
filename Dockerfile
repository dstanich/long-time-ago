FROM node:15.5.0-alpine3.12
WORKDIR /usr/src/app

# Env value for location of config file
ENV CONFIG_FILE /data/long-time-ago.config.js

# Imagemagick must be installed separately
RUN apk add --no-cache imagemagick

# Copy app files and install
COPY . .
RUN npm install --production

CMD [ "sh", "-c", "node index.js --config ${CONFIG_FILE}" ]

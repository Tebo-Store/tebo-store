FROM node:16

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
# RUN npm install --global pm2

# Install yarn
# RUN npm install -g yarn

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN yarn install

# Copy all files
COPY ./ ./

# Permission to cache
RUN chmod -R 777 .next/cache/images

# Build app
RUN yarn build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image
USER node

# Launch app with PM2
# CMD [ "pm2-runtime", "start", "yarn", "--", "start" ]
# CMD ["pm2", "start", "yarn", "--name", "nextjs", "--interpreter", "bash", "--", "start"]
CMD [ "yarn", "start" ]
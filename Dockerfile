# Use an official Node.js image as a base
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vue.js app
RUN npm run build

# Use a lightweight Node.js image as a base for the runtime environment
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=build /app/dist ./dist

# Install http-server globally to serve the built app
RUN npm install -g http-server

# Expose the port the app runs on
EXPOSE 8080

#run the app
CMD [ "http-server", "dist" ]
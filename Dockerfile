# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port that your app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]

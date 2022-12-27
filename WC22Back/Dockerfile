# Create a Docker image for the WC22Back application using the node:10.9.0-alpine image as a base image
FROM node:10.9.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json file to the working directory
COPY package*.json /app/

# Install the dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . /app

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]


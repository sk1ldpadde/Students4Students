# Use an official Node.js runtime as a parent image
FROM nikolaik/python-nodejs:python3.11-nodejs20-slim

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vite project
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]

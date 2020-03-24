# Specifies where to get the base image (Node v12 in our case) and creates a new container for it
FROM node:12

# Set working directory. Paths will be relative this WORKDIR.
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files from host computer to the container
COPY . .




# Run the app
CMD node MongoDbindex.js

# Specify port app runs on
EXPOSE 8081

# docker build -t gas-project .

# docker run -it -p 80:80 --name  gas-project gas-project

# docker tag 6297cb2b40b5 gcr.io/gas-project/test   

# http://192.168.99.100/translations?pg=2&&pgS=5


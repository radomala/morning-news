FROM node:20-alpine AS base

WORKDIR /app/backend

# Install curl dependencies
RUN apk add --no-cache curl

# Copy then install packages
COPY . .
RUN npm install

# Expose 4000
EXPOSE 4000

# run the backend
CMD ["npm", "start"]


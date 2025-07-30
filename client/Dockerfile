# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Accept build argument
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copy and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the app
COPY . .

# Build the React app with the API URL injected at build time
RUN npm run build

# Production stage - serve with Nginx
FROM nginx:alpine

# Copy built React app to Nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Optional: Add custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Name the node stage "builder"
FROM node:10 AS builder
ARG git_credentials
# Set working directory
WORKDIR /app
# Copy all files from parent directory to working dir in image
COPY . .

RUN echo "$git_credentials" > ~/.git-credentials
RUN git config --global credential.helper store

# install node modules and build assets
RUN npm install && npm run build:staging


# nginx state for serving content
FROM nginx:1.18.0
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .

# Remove default nginx.conf
RUN rm -v /etc/nginx/nginx.conf
ADD nginx.conf /etc/nginx/

# Containers run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]

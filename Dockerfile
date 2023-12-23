FROM node:20

WORKDIR /app

# Install
COPY package*.json /app/
RUN npm install

# Copy
COPY . .


# Build
RUN npx build

EXPOSE 3000

CMD npm start

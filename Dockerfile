FROM node:20-bullseye

WORKDIR /usr/app/

COPY package*.json ./
COPY index.js .
COPY generateTestData.js .
COPY detectors/ ./detectors

RUN npm install

CMD ["npm", "run", "start"]

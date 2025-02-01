FROM node:22-bullseye-slim 

WORKDIR /app 

COPY package.json package-lock.json ./

RUN npm install 

COPY . .

EXPOSE 5000

CMD ["sh", "./start.sh"]
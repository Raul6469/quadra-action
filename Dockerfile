FROM node:10

COPY package.json package-lock.json /

RUN npm ci --production

COPY entrypoint.sh src/ /

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

# syntax=docker/dockerfile:1

FROM node:17.4.0

ENV NODE_ENV=production

WORKDIR /project/react-web-midway

COPY . .

ENTRYPOINT [ "./docker/docker-entrypoint.sh" ]

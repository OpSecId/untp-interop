FROM node:18

WORKDIR /test-suite

COPY package.json ./

COPY implementations/ ./implementations
COPY tests/ ./tests

CMD [ "./run.sh" ]
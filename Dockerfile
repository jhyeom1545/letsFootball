FROM node:16

WORKDIR /letsFootball/
COPY ./package.json /letsFootball/
COPY ./yarn.lock /letsFootball/
RUN yarn install

COPY . /letsFootball/
CMD yarn start:dev
FROM    ubuntu:latest

RUN apt-get -y update
RUN apt-get -y install nodejs
RUN apt-get -y install npm
RUN apt-get -y install balance
RUN apt-get -y install libfontconfig

RUN npm install forever -g

RUN ln -s /usr/bin/nodejs /usr/bin/node

ADD package.json /tmp/package.json
RUN cd /tmp && npm install

ADD / /nodeapp

RUN rm -rf /nodeapp/node_modules
RUN cp -r /tmp/node_modules /nodeapp/node_modules

EXPOSE 80

CMD ["forever", "/nodeapp/chartbox.js"]
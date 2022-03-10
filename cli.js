#!/usr/bin/env node

var path = require('path');

global.appRoot = path.resolve(__dirname);

console.log(appRoot);

const wordpressPo2Json = require('./build');
wordpressPo2Json.generatePoJson();

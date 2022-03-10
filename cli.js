#!/usr/bin/env node

var path = require('path');
var fs = require('fs');

global.appRoot = path.resolve(process.cwd());

console.log(appRoot);

const languagesFolder = `${appRoot}/languages`

const wordpressPo2Json = require('./build');
wordpressPo2Json.generatePoJson({ languagesFolderLocation: languagesFolder });

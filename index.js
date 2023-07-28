"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require('body-parser');
const config = require('./config');
const routing = require('./src/routes');
const csvHandler_1 = require("./src/controllers/csvHandler");
/**
 * Create & start Server
 */
const app = express();
const server = require('http').createServer(app);
server.listen(config.host.port);
console.log('********* Server started on: ' + config.host.port + ' **********');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
/**
 * Routing
 */
routing.public(app);
/**
 * Once and Done
 */
(0, csvHandler_1.extractData)().then(() => {
    console.log('csv fully charged');
}).catch((error) => {
    console.log(error);
});

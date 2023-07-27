const express = require("express");
const bodyParser = require('body-parser');
const config = require('./config');
const routing = require('./src/routes');
const events = require('./src/controllers/events');
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
events.readCSV();

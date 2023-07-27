"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interestPoints = require('../controllers/interestPoints');
const utilHttp = require('module-util-http');
const express = require("express");
utilHttp.setControllers({ files: { interestPoints }, update: false });
/**
 * Routing
 * @type {{public: exports.public}}
 */
module.exports = {
    public: function (app) {
        const router = express.Router();
        app.use('/', router);
        app.post('/interest_points', async (req, res) => {
            await utilHttp.call(res, 'interestPoints', 'getAllLinkedEvents', req.body);
        });
    }
};

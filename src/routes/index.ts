const interestPoints = require('../controllers/interestPoints');
const utilHttp = require('module-util-http');
import * as express from 'express';
import { Request, Response } from 'express';

utilHttp.setControllers({ files: {interestPoints}, update: false});

/**
 * Routing
 * @type {{public: exports.public}}
 */
module.exports = {
    public: function (app) {
        const router = express.Router();

        app.use('/', router);

        app.post('/interest_points', async (req: Request, res: Response) => {
            await utilHttp.call(res, 'interestPoints', 'getAllLinkedEvents', req.body)
        })
    }
}

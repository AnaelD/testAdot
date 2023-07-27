"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const events = require('../../src/controllers/events');
describe('read csv', () => {
    it('should read a csv file and copy its content into an array', async () => {
        const result = await events.readCSV();
        console.log(result);
        expect(result).toHaveLength(223994);
    });
});

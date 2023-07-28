"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const events = require('../../src/controllers/events');
const csvHandler_1 = require("../../src/controllers/csvHandler");
describe('getDistance', () => {
    it('should be a number for the distance if all params where presents & where numbers', () => {
        const result = events.getDistance(2.1, 4.8, 2.2, 4.9);
        expect(typeof result).toBe("number");
    });
    it('should be a number for the distance if all params where presents & where number as strings', () => {
        const result = events.getDistance('2.1', '4.8', '2.2', '4.9');
        expect(typeof result).toBe("number");
    });
    it('should return NaN if NOT all params where presents', () => {
        const result = events.getDistance(2.1, 4.8, 2.2);
        expect(result).toBe(NaN);
    });
});
const mockList = [
    {
        lat: 2.32,
        lon: 5.1,
        name: 'random location 1'
    },
    {
        lat: 3.32,
        lon: 4.1,
        name: 'random location 2'
    }
];
describe('getLinkedEvents', () => {
    beforeEach(async () => {
        // make sure the data are extracted
        await (0, csvHandler_1.extractData)();
    });
    it('should return an array of the completedPoiList if the Poi params are present', async () => {
        const result = await events.getLinkedEvents(mockList);
        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(2);
    });
    it('should return an error message if the poi params are missing', async () => {
        try {
            await events.getLinkedEvents();
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty('message', "missing the required Points of interest");
        }
    });
});

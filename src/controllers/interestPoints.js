"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events = require('./events');
let poiList = [];
const getAllLinkedEvents = async (params) => {
    try {
        poiList = params;
        return { status: 201, data: await Events.getLinkedEvents(params) };
    }
    catch (e) {
        throw new Error(e);
    }
};
module.exports = {
    getAllLinkedEvents
};

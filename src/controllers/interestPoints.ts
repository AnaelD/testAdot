const Events = require('./events');
import { Poi } from '../../interfaces';

let poiList: Poi[] = []

const getAllLinkedEvents = async (params: Poi[]): Promise<object> => {
    try {
        poiList = params;
        return {status: 201, data: await Events.getLinkedEvents(params)}
    } catch (e) {
        throw new Error(e)
    }

};

module.exports = {
    getAllLinkedEvents
}

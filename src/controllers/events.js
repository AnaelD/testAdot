"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csvHandler_1 = require("./csvHandler");
function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}
function getDistance(eventLat, eventLon, poiLat, poiLon) {
    // Earth's radius in kilometers
    const earthRadiusKm = 6371;
    const dLat = degreesToRadians(poiLat - eventLat);
    const dLon = degreesToRadians(poiLon - eventLon);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(eventLat)) *
            Math.cos(degreesToRadians(poiLat)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // return the distance between the 2 coordinates (event lat,lon & poi lat,lon)
    return earthRadiusKm * c;
}
// go trough all events & link them to the closests poi
const getLinkedEvents = async (poiList) => {
    if (!poiList) {
        throw new Error('missing the required Points of interest');
    }
    let linkedPoi = [];
    const callbackFnOne = (event) => {
        let closestPOI = null;
        let closestDistance = Number.MAX_VALUE;
        const callbackFnTwo = (element, index, array) => {
            const distance = getDistance(Number(event.lat), Number(event.lon), array[index].lat, array[index].lon);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestPOI = index;
            }
            return element;
        };
        // going throug all Poi
        linkedPoi = poiList.map(callbackFnTwo);
        if (event.event_type === 'click') {
            // if click property exist add + 1 to it, if not add the property already set to 1
            linkedPoi[closestPOI].clicks = (linkedPoi[closestPOI].clicks) ? linkedPoi[closestPOI].clicks + 1 : 1;
        }
        else {
            // same as above but for imp (impression)
            linkedPoi[closestPOI].impressions = (linkedPoi[closestPOI].impressions) ? linkedPoi[closestPOI].impressions + 1 : 1;
        }
    };
    const csvData = (0, csvHandler_1.getData)();
    // going throug all Event in csvData
    csvData.map(callbackFnOne);
    // return the updated poiList containing number of click & imp per Poi
    return linkedPoi;
};
module.exports = {
    getLinkedEvents,
    getDistance
};

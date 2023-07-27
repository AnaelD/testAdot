const fs = require("fs");
const fastcsv = require('fast-csv');
import {Event, CompletedPoi, Poi} from '../../interfaces';

// The path to your CSV file
const csvFilePath = __dirname +'../../../events.csv';

// Create a Readable Stream from the CSV file
const stream = fs.createReadStream(csvFilePath);

// Create a new array to store the CSV data
const csvData: Event[] = [];

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}
function getDistance(eventLat, eventLon, poiLat, poiLon) {
    // Earth's radius in kilometers
    const earthRadiusKm = 6371;
    const dLat = degreesToRadians(poiLat - eventLat);
    const dLon = degreesToRadians(poiLon - eventLon);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degreesToRadians(eventLat)) *
        Math.cos(degreesToRadians(poiLat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // return the distance between the 2 coordinates (event lat,lon & poi lat,lon)
    return earthRadiusKm * c;
}

// read & save inside an array the .csv
const readCSV = async () => {
    // Parse the CSV data using fast-csv
    fastcsv.parseStream(stream, { headers: true })
        .on('data', (row) => {
            // 'row' contains the data of each row in the CSV file
            csvData.push(row);
        })
        .on('end', () => {
            // 'csvData' now contains an array of objects representing each row in the CSV file
            // You can access and process the CSV data as needed here
            return csvData;
        })
        .on('error', (error) => {
            console.error('Error parsing CSV:', error);
        });
}


// go trough all events & link them to the closests poi
const getLinkedEvents = async (poiList: CompletedPoi[]): Promise<CompletedPoi[]> => {
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
        }

        // going throug all Poi
        linkedPoi = poiList.map(callbackFnTwo);

        if (event.event_type === 'click') {
            // if click property exist add + 1 to it, if not add the property already set to 1
            poiList[closestPOI].clicks = (poiList[closestPOI].clicks) ? poiList[closestPOI].clicks + 1 : 1;
        } else {
            // same as above but for imp (impression)
            poiList[closestPOI].impressions = (poiList[closestPOI].impressions) ? poiList[closestPOI].impressions + 1 : 1;
        }
    }
    // going throug all Event in csvData
    csvData.map(callbackFnOne);

    // return the updated poiList containing number of click & imp per Poi
    return linkedPoi;

}

module.exports = {
    readCSV,
    getLinkedEvents
}


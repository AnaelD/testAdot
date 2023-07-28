const fastcsv = require("fast-csv");
const fs = require('fs')
import {Event} from "../../interfaces";

// The path to your CSV file
const csvFilePath = __dirname +'../../../events.csv';

// Create a Readable Stream from the CSV file
const stream = fs.createReadStream(csvFilePath);

// Create a new array to store the CSV data
let csvData: Event[] = [];

// read & save inside an array the .csv
export const extractData = () => {

    return new Promise((resolve, reject) => {
        // Parse the CSV data using fast-csv
        fastcsv.parseStream(stream, { headers: true })
            .on('data', (row) => {
                // 'row' contains the data of each row in the CSV file
                csvData.push(row);
            })
            .on('end', () => {
                // 'csvData' now contains an array of objects representing each row in the CSV file
                // You can access and process the CSV data as needed here
                resolve(csvData)
            })
            .on('error', (error) => {
                reject(error)
            });
    })

}

export const getData = (): Event[] => {
    return csvData;
}

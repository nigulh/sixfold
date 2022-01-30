import {parse} from 'csv-parse';
const fs = require('fs');

function getFileContent(path)
{
    return new Promise<string>((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}

function parseCsv(csvAsString: string) {
    return new Promise<Array<string[]>>((resolve, reject) => {
        const rows = [];
        const parser = parse({delimiter: ','});
        parser.on('readable', () => {
            let row;
            while ((row = parser.read()) !== null) {
                // @ts-ignore
                rows.push(row);
            }
        });
        parser.on('error', err => {
            reject(err.message);
        });
        parser.on('end', () => {
            resolve(rows);
        });
        parser.write(csvAsString);
        parser.end();
    });
}

export function getAllAirports() {
    return new Promise<string>((resolve) => {
        if (mockAirports) {
            resolve(mockAirports);
        }
        else
        {
            let contentPromise = getFileContent('data/airports.dat');
            contentPromise.then((x) => {resolve(x)}).catch(() => {
                resolve('415,"Lennart Meri Tallinn Airport","Tallinn-ulemiste International","Estonia","TLL","EETN",59.41329956049999,24.832799911499997,131,2,"E","Europe/Tallinn","airport","OurAirports"\n' +
                    '416,"Tartu Airport","Tartu","Estonia","TAY","EETU",58.3074989319,26.690399169900004,219,2,"E","Europe/Tallinn","airport","OurAirports"');
            });
        }
    }).then(parseCsv);
}

export function getAllRoutes() {
    return getFileContent('data/routes.dat').then(parseCsv);
}

let mockAirports: string|undefined = undefined;
export function setAllAirports(value: string)
{
    mockAirports = value;
}

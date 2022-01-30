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
    });
}

export function getAll() {
    return [];
}

let mockAirports: string|undefined = undefined;
export function setAllAirports(value: string)
{
    mockAirports = value;
}

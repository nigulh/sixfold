const fs = require('fs');

function content(path) {
    let ret = fs.readFileSync(path).toString();
    return ret;
}
export function getAllAirports() {
    let c = content('data/airports.dat');
    return mockAirports ?? c ?? '415,"Lennart Meri Tallinn Airport","Tallinn-ulemiste International","Estonia","TLL","EETN",59.41329956049999,24.832799911499997,131,2,"E","Europe/Tallinn","airport","OurAirports"\n' +
        '416,"Tartu Airport","Tartu","Estonia","TAY","EETU",58.3074989319,26.690399169900004,219,2,"E","Europe/Tallinn","airport","OurAirports"';
}

function asyncContent(path)
{
    return new Promise<string>((resolve, reject) => {
        fs.readFile(path, resolve, reject);
    });
}

export function getAllAirportsAsync() {
    return new Promise<string>((resolve) => {
        if (mockAirports) {
            resolve(mockAirports);
        }
        else
        {
            let contentPromise = asyncContent('data/airports.dat');
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

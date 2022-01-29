const fs = require('fs');

function content(path) {
    let ret = fs.readFileSync(path).toString();
    return ret;
}

export function getAllAirports() {
    let c = content('data/airports.dat');
    return mocks.airports ?? c ?? '415,"Lennart Meri Tallinn Airport","Tallinn-ulemiste International","Estonia","TLL","EETN",59.41329956049999,24.832799911499997,131,2,"E","Europe/Tallinn","airport","OurAirports"\n' +
        '416,"Tartu Airport","Tartu","Estonia","TAY","EETU",58.3074989319,26.690399169900004,219,2,"E","Europe/Tallinn","airport","OurAirports"';
}
export function getAll() {
    return [];
}
let mocks = { airports: undefined };
export function setAllAirports(value)
{
    mocks.airports = value;
}

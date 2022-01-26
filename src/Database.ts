export function getAllAirports() {
    return mocks.airports ?? '415,"Lennart Meri Tallinn Airport","Tallinn-ulemiste International","Estonia","TLL","EETN",59.41329956049999,24.832799911499997,131,2,"E","Europe/Tallinn","airport","OurAirports"\n' +
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

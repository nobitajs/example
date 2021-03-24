import * as mongoose from 'mongoose';
const Mixed = mongoose.Schema.Types.Mixed;
export const ctrip_zuche_area_tbl = {
    address: String,
    dropoffOndoorCost: String,
    freeshuttle: String,
    lat: String,
    lng: String,
    name: String,
    pickFreeshuttle: String,
    pickOffLevel: String,
    pickUpLevel: String,
    pickupOndoorCost: String,
    psend: String,
    returnFreeshuttle: String,
    rsend: String,
    score: Mixed,
    sendTypeForPickOffCar: String,
    sendTypeForPickUpCar: String,
    storeid: String
};
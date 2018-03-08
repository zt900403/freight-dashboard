/**
 * Created by ZT on 18/03/08.
 */
const util = require('../models/util')

const schema = util.defineSchema('freightRecord', {
    title: {
        type: String,
        require: true,
    },
    carNumber: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: true,
    },
    productName: {
        type: String,
        require: true,
    },
    purchaser: {
        type: String,
        require: true,
    },
    APurchaseCompany: {
        type: String,
        require: true,
    },
    startPlace: {
        type: String,
        require: true,
    },
    ASeller: {
        type: String,
        require: true,
    },
    ASellerCompany: {
        type: String,
        require: true,
    },
    oilWellNumber: {
        type: String,
        require: true,
    },
    ASellPlace: {
        type: String,
        require: true,
    },
    freightUnitPrice: {
        type: String,
        require: true,
    },
    freightPriceTonsAdjust: {
        type: String,
        require: true,
    },
    otherAddItem: {
        type: String,
        require: true,
    },
    keepCarNumber: String,
    keepCarUnitPrice: Number,
    BSeller: String,
    BSellerCompany: String,
    BSellPlace: String,
    CSeller: String,
    CSellerCompany: String,
    CSellPlace: String,
    DSeller: String,
    DSellerCompany: String,
    DSellPlace: String,

})



module.exports = schema
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
    keepCarUnitPrice: String,
    BSeller: String,
    BSellerCompany: String,
    BSellPlace: String,
    CSeller: String,
    CSellerCompany: String,
    CSellPlace: String,
    DSeller: String,
    DSellerCompany: String,
    DSellPlace: String,
    needPoisonInfo: Boolean,
    remainingProductStoreAmount: String,
    BPurchaseCompany: String,
    BPurchaseAmount: String,

    //step2
    APurchaseAmount: String,
    ASellAmount: String,
    ASellAmountAdjust: String,
    carTotalCost: String,
    keepProductAmount: String,
    warehouseSupplement: String,
    BSellAmount: String,
    BSellAmountAdjust: String,
    CSellAmount: String,
    CSellAmountAdjust: String,
    DSellAmount: String,
    DSellAmountAdjust: String,
    needZhebaiCalc: Boolean,
    concentration: String,

    //step3
    ABuyUnitPrice: String,
    AFreightSubsidy: String,
    ASellUnitPrice: String,
    BBuyUnitPrice: String,
    BFreightSubsidy: String,
    BSellUnitPrice: String,
    CSellUnitPrice: String,
    DSellUnitPrice: String,

    //step4
    poisonName:String,
    poisonANumber:String,
    poisonBNumber:String,
    poisonBuyLicense:String,
    poisonTransportLicense:String,
    poisonDestination:String,
    sellPoisonBuyCompany:String,
    sellPoisonBuyer:String,
    sellPoisonName:String,
    sellPoisonNumber:String,
    sellPoisonTakeCompany:String,
    sellPoisonDestination:String,

    status: {
        type: String,
        require: true,
        default: 'STEP1'
    }

})


module.exports = schema
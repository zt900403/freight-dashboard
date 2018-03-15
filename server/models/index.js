/**
 * Created by ZT on 18/03/07.
 */
const mongoose = require('mongoose');
mongoose.connect(require('./config.json').MongoDB_URI);


const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('mongodb connection!')
});

const IDGenerator = mongoose.model('idgenerator', require('./IDGenerator'))

IDGenerator.increaseID = async function (modelname) {
    const data = await this.findOne({modelname: modelname})
    if (data) {
        data.currentid++
    } else {
        await this.create({modelname: modelname})
    }
    await data.save()
    return data.currentid
}


IDGenerator.getID = async function (modelname) {
    const data = await this.findOne({modelname: modelname})
    if (data) {
        return data.currentid
    } else {
        await this.create({modelname: modelname})
        return 1
    }
    return data.currentid
}

const userModel = mongoose.model('user', require('./user'))
userModel.prototype.toJSON = function () {
    return {
        id: this.id,
        username: this.username,
        name: this.name,
        phone: this.phone,
        authority: this.authority,
    }
}

const freightRecordModel = mongoose.model('freightRecord', require('./freightRecord'))
freightRecordModel.prototype.toJSON = function () {
    return {
        id: this.id,
        title: this.title,
        carNumber: this.carNumber,
        date: this.date,
        productName: this.productName,
        purchaser: this.purchaser,
        APurchaseCompany: this.APurchaseCompany,
        startPlace: this.startPlace,
        ASeller: this.ASeller,
        ASellerCompany: this.ASellerCompany,
        oilWellNumber: this.oilWellNumber,
        ASellPlace: this.ASellPlace,
        freightUnitPrice: this.freightUnitPrice,
        freightPriceTonsAdjust: this.freightPriceTonsAdjust,
        otherAddItem: this.otherAddItem,
        keepCarNumber: this.keepCarNumber,
        keepCarUnitPrice: this.keepCarUnitPrice,
        BSeller: this.BSeller,
        BSellerCompany: this.BSellerCompany,
        BSellPlace: this.BSellPlace,
        CSeller: this.CSeller,
        CSellerCompany: this.CSellerCompany,
        CSellPlace: this.CSellPlace,
        DSeller: this.DSeller,
        DSellerCompany: this.DSellerCompany,
        DSellPlace: this.DSellPlace,
        status: this.status,
        needPoisonInfo: this.needPoisonInfo,
        remainingProductStoreAmount: this.remainingProductStoreAmount,

        //step2
        APurchaseAmount: this.APurchaseAmount,
        ASellAmount: this.ASellAmount,
        ASellAmountAdjust: this.ASellAmountAdjust,
        carTotalCost: this.carTotalCost,
        keepProductAmount: this.keepProductAmount,
        warehouseSupplement: this.warehouseSupplement,
        BSellAmount: this.BSellAmount,
        BSellAmountAdjust: this.BSellAmountAdjust,
        CSellAmount: this.CSellAmount,
        CSellAmountAdjust: this.CSellAmountAdjust,
        DSellAmount: this.DSellAmount,
        DSellAmountAdjust: this.DSellAmountAdjust,

        //step3
        ABuyUnitPrice: this.ABuyUnitPrice,
        AFreightSubsidy: this.AFreightSubsidy,
        ASellUnitPrice: this.ASellUnitPrice,
        BBuyUnitPrice: this.BBuyUnitPrice,
        BFreightSubsidy: this.BFreightSubsidy,
        BSellUnitPrice: this.BSellUnitPrice,
        CSellUnitPrice: this.CSellUnitPrice,
        DSellUnitPrice: this.DSellUnitPrice,


        //step4,
        poisonName: this.poisonName,
        poisonANumber: this.poisonANumber,
        poisonBNumber: this.poisonBNumber,
        poisonBuyLicense: this.poisonBuyLicense,
        poisonTransportLicense: this.poisonTransportLicense,
        poisonDestination: this.poisonDestination,
        sellPoisonBuyCompany: this.sellPoisonBuyCompany,
        sellPoisonBuyer: this.sellPoisonBuyer,
        sellPoisonName: this.sellPoisonName,
        sellPoisonNumber: this.sellPoisonNumber,
        sellPoisonTakeCompany: this.sellPoisonTakeCompany,
        sellPoisonDestination: this.sellPoisonDestination,
    }
}
module.exports = {
    User: userModel,
    IDGenerator: IDGenerator,
    FreightRecord: freightRecordModel,
}
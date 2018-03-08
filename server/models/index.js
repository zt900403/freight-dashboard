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
        username: this.username,
        name: this.name,
        phone: this.phone,
        authority: this.authority,
    }
}

const freightRecordModel = mongoose.model('freightRecord', require('./freightRecord'))
freightRecordModel.prototype.toJSON = function () {
    return {
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
    }
}
module.exports = {
    User: userModel,
    IDGenerator: IDGenerator,
    FreightRecord: freightRecordModel,
}
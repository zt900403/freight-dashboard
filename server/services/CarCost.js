/**
 * Created by ZT on 18/03/08.
 */
const db = require('../models')

/*
 function FreightRecord(obj) {
 this.record = obj;
 }
 */

class CarCost extends db.CarCost {
    constructor(obj) {
        super(obj)
    }
}


CarCost.updateOrUpsert = async function (conditions, newValue) {
    try {
        await db.CarCost.update(conditions, {$set: newValue}, {upsert: true})
        return true
    } catch (err) {
        throw err
    }
}

CarCost.getCarCost = async function (conditions) {
    try {
        const result = await db.CarCost.find(conditions)
        return result
    } catch (err) {
        throw err
    }

}
module.exports = CarCost
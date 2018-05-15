/**
 * Created by zhang on 18/05/15.
 */

const util = require('../models/util')

const carCostSchema = util.defineSchema('carCost', {
    carNumber: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    loan: Number,
    driverSalary: Number,
    rentAndMealFee: Number,
})

module.exports = carCostSchema

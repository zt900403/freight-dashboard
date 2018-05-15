const CarCost = require('../../../../services/CarCost')
const APIError = require('../../../../middleware/rest').APIError

const updateCarCostRecord = async (ctx) => {
    try {
        const carNumber = ctx.request.query.carNumber
        const date = ctx.request.query.date
        delete ctx.request.query.carNumer
        delete ctx.request.query.date
        await CarCost.updateOrUpsert({carNumber, date}, ctx.request.query)
        ctx.rest({
            message: '保存成功!'
        })
    } catch (err) {
        throw err
    }
}


const getCarCostRecord = async (ctx) => {
    try {
        console.log('haha')
        const result = await CarCost.getCarCost(ctx.request.query)
        return result
    } catch (err) {
        throw err
    }
}

module.exports = {
    'GET /': getCarCostRecord,
    'POST /': updateCarCostRecord,
}


const CarCost = require('../../../../services/CarCost')
const APIError = require('../../../../middleware/rest').APIError

const updateCarCostRecord = async (ctx) => {
    try {
        let data = ctx.request.body
        const carNumber = data.carNumber
        const date = data.date
        delete data.carNumer
        delete data.date
        await CarCost.updateOrUpsert({carNumber, date}, data)
        ctx.rest({
            message: '保存成功!'
        })
    } catch (err) {
        throw err
    }
}


const getCarCostRecord = async (ctx) => {
    try {
        const result = await CarCost.getCarCost(ctx.request.query)
        ctx.rest(result)
    } catch (err) {
        throw err
    }
}

module.exports = {
    'GET /': getCarCostRecord,
    'POST /': updateCarCostRecord,
}


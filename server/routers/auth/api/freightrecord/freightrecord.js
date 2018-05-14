/**
 * Created by ZT on 18/03/08.
 */
const FreightRecord = require('../../../../services/FreightRecord')
const APIError = require('../../../../middleware/rest').APIError
const newFreightRecord = async (ctx) => {
    try {
        await new FreightRecord(ctx.request.body).save()
        ctx.rest({
            message: '创建成功!'
        })
    } catch (err) {
        throw err
    }
}

const getAllFreightRecord = async (ctx) => {
    try {
        const result = await FreightRecord.getAllRecord()
        ctx.rest(result)
    } catch (err) {
        throw err
    }
}

const updateOneRecord = async (ctx) => {
    try {
        await FreightRecord.updateOne({id: ctx.params.id}, ctx.request.body)
        ctx.rest({
            message: '更新数据完成!'
        })
    } catch (err) {
        throw err
    }
}

const deleteOneRecord = async (ctx) => {
    const authority = ctx.session.userinfo ? ctx.session.userinfo.authority : []
    if (!(authority.includes('ADMIN') || authority.includes('STEP1'))) {
        throw new APIError('auth: auth_error', '权限不足!')
    }
    try {
        await FreightRecord.findOneAndRemove({id: ctx.params.id})
        ctx.rest({
            message: '删除成功!'
        })
    } catch (err) {
        throw err
    }
}

const getDoneRecord = async (ctx) => {
    try {
        const result = await FreightRecord.getDoneRecord(ctx.request.query)
        ctx.rest(result)
    } catch (err) {
        throw err
    }
}

const getUndoneRecord = async (ctx) => {
    try {
        const result = await FreightRecord.getUndoneRecord(ctx.request.query)
        ctx.rest(result)
    } catch (err) {
        throw err
    }
}
const getDistinctCarNumber = async (ctx) => {
    try {
        const result = await FreightRecord.getDistinctCarNumber(ctx.request.query)
        ctx.rest(result)
    } catch (err) {
        throw err
    }
}

const getCarCostDetail = async (ctx) => {
    try {
        let query = ctx.request.query
        const carNumber = query.carNumber
        const year = query.year
        const month = query.month
        const result = await FreightRecord.getCarCostDetail({carNumber, year: parseInt(year), month: parseInt(month) + 1})
        ctx.rest(result)
    } catch (err) {
        throw err
    }
}

module.exports = {
    'PUT /': newFreightRecord,
    'POST /:id': updateOneRecord,
    'GET /': getAllFreightRecord,
    'GET /done': getDoneRecord,
    'GET /undone': getUndoneRecord,
    'DELETE /:id': deleteOneRecord,
    'GET /distinctcarnumber': getDistinctCarNumber,
    'GET /carcostdetail': getCarCostDetail,
}
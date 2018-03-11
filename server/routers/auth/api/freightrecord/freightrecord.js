/**
 * Created by ZT on 18/03/08.
 */
const FreightRecord = require('../../../../services/FreightRecord')
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
        await FreightRecord.updateOne({id :ctx.params.id}, ctx.request.body)
        ctx.rest({
            message: '更新数据完成!'
        })
    } catch (err) {
        throw err
    }
}
module.exports = {
    'PUT /': newFreightRecord,
    'POST /:id': updateOneRecord,
    'GET /': getAllFreightRecord,
}
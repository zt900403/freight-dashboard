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

module.exports = {
    'POST /': newFreightRecord
}
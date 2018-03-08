/**
 * Created by ZT on 18/03/08.
 */
const db = require('../models')

function FreightRecord(obj) {
    this.record = obj;
}

FreightRecord.prototype.save = async function () {
    let record = this.record;
    console.log(record)
    try {
        await new db.FreightRecord(record).save()
        return '创建成功!'
    } catch (err) {
        throw err
    }
}

module.exports = FreightRecord
/**
 * Created by ZT on 18/03/08.
 */
const db = require('../models')

/*
function FreightRecord(obj) {
    this.record = obj;
}
*/

class FreightRecord extends db.FreightRecord {
    constructor(obj) {
        super(obj)
    }
    async getAllRecord() {
        const all = await db.FreightRecord.find({})
        let done = []
        let undone = []
        all.forEach((item, index) => {
            if (item.status == "done") {
                done.push(item.toJSON())
            } else {
                undone.push(item.toJSON())
            }
        })
        return {
            done,
            undone
        }
    }
}
/*
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
*/


module.exports = FreightRecord
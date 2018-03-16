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

}

FreightRecord.getAllRecord = async function () {
    const all = await db.FreightRecord.find({})
    let done = []
    let undone = []
    all.forEach((item, index) => {
        let obj = item.toJSON()
        obj.key = obj.id
        if (obj.status == "DONE") {
            done.push(obj)
        } else {
            undone.push(obj)
        }
    })
    return {
        done,
        undone
    }
}

FreightRecord.getDoneRecord = async function ({results, page}) {
    try {
        let all = await db.FreightRecord.find({status: 'DONE'}).sort({date: -1})
        const total = all.length
        all = all.slice((page - 1) * results, page * results)

        return {
            data: all.map((item) => {
                item.key = item.id
                return item
            }),
            total: total,
        }
    } catch (err) {
        throw err
    }

}
FreightRecord.getUndoneRecord = async function () {
    try {
        let all = await db.FreightRecord.find({status: {$ne: 'DONE'}}).sort({date: -1})
        return all
    } catch (err) {
        throw err
    }

}

FreightRecord.updateOne = async function ({id}, newValue) {
    try {
        await db.FreightRecord.update({id: id}, {$set: newValue})
        return true
    } catch (err) {
        throw err
    }
}

FreightRecord.findOneAndRemove = async function (conditions) {
    try {
        await db.FreightRecord.findOneAndRemove(conditions)
        return true
    } catch (err) {
        throw err
    }
}

module.exports = FreightRecord
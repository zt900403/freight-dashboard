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

FreightRecord.updateOne = async function ({id}, newValue) {
    try {
        const result = await db.FreightRecord.update({id: id}, {$set: newValue})
        return true
    } catch (err) {
        throw error
    }
}


module.exports = FreightRecord
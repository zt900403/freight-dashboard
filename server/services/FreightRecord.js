/**
 * Created by ZT on 18/03/08.
 */
const db = require('../models')

/*
 function FreightRecord(obj) {
 this.record = obj;
 }
 */

function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

class FreightRecord extends db.FreightRecord {
    constructor(obj) {
        super(obj)
    }

}

FreightRecord.getAllRecord = async function (conditions, {rangePicker}) {
    try {
        let all = await db.FreightRecord.find(conditions)
        if (rangePicker) {
            rangePicker = rangePicker ?
                rangePicker.includes(',') ? rangePicker.split(',') : []
                : null
            all = all.filter((item) => {
                let f2
                if (rangePicker && rangePicker.length === 2) {
                    const d = new Date(formatDate(item.date))
                    const low = new Date(rangePicker[0])
                    const high = new Date(rangePicker[1])

                    if (d > low && d < high) {
                        f2 = true
                    }

                    if (d.getTime() === low.getTime() || d.getTime() === high.getTime()) {
                        f2 = true
                    }
                    return f2
                }
                return true
            })
        }
        return all
    } catch (err) {
        throw err
    }
}

FreightRecord.getDoneRecord = async function ({results, page, id, title, rangePicker}) {
    try {
        rangePicker = rangePicker ?
            rangePicker.includes(',') ? rangePicker.split(',') : []
            : null

        let all
        if (id) {
            all = await db.FreightRecord.find({
                $or: [{status: 'DONE', id: id}, {
                    status: 'STEP4',
                    id: id
                }]
            }).sort({date: -1})
        } else {
            all = await db.FreightRecord.find({$or: [{status: 'DONE'}, {status: 'STEP4'}]}).sort({date: -1})
        }
        all = all.filter((item) => {
            const f1 = title ? item.title.includes(title) : true
            let f2
            if (rangePicker && rangePicker.length === 2) {
                const d = new Date(formatDate(item.date))
                const low = new Date(rangePicker[0])
                const high = new Date(rangePicker[1])

                if (d > low && d < high) {
                    f2 = true
                }

                if (d.getTime() === low.getTime() || d.getTime() === high.getTime()) {
                    f2 = true
                }
                return f1 && f2
            }
            return f1
        })

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
        let all = await db.FreightRecord.find({$or: [{status: 'STEP2'}, {status: 'STEP3'}]}).sort({date: -1})
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

FreightRecord.getDistinctCarNumber = async function () {
    try {
        const data = await db.FreightRecord.distinct('carNumber')
        return data
    } catch (err) {
        throw err
    }
}

FreightRecord.getCarCostDetail = async function (conditions) {
    try {
        let all = await db.FreightRecord.aggregate([
            {
                $project: {
                    id: 1,
                    carNumber: 1,
                    year: {$year: '$date'},
                    month: {$month: '$date'},
                    day: {$dayOfMonth: '$date'},
                    productName: 1,
                    startPlace: 1,
                    ASellerCompany: 1,
                    BSellerCompany: 1,
                    CSellerCompany: 1,
                    DSellerCompany: 1,
                    APurchaseAmount: 1,
                    BPurchaseAmount: 1,
                    freightUnitPrice: 1,
                    freightPriceTonsAdjust: 1,
                    carTotalCost: 1,
                }
            },
            {$match: {month: conditions.month, year: conditions.year, carNumber: conditions.carNumber}}
        ])
        return all
    } catch (err) {
        throw err
    }
}

FreightRecord.getPoisonRecords = async function ({rangePicker}) {
    try {
        rangePicker = rangePicker ?
            rangePicker.includes(',') ? rangePicker.split(',') : []
            : null

        let all = await db.FreightRecord.find({needPoisonInfo: true}).sort({date: -1})
        all = all.filter((item) => {
            let f2 = false
            if (rangePicker && rangePicker.length === 2) {
                const d = new Date(formatDate(item.date))
                const low = new Date(rangePicker[0])
                const high = new Date(rangePicker[1])

                if (d > low && d < high) {
                    f2 = true
                }

                if (d.getTime() === low.getTime() || d.getTime() === high.getTime()) {
                    f2 = true
                }
                return f2
            }
            return true
        })


        return all
    } catch (err) {
        throw err
    }

}

FreightRecord.getDistinctPurchaser = async function () {
    try {
        const data = await db.FreightRecord.distinct('purchaser')
        return data
    } catch (err) {
        throw err
    }
}

module.exports = FreightRecord
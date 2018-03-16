/**
 * Created by ZT on 18/03/07.
 */
const db = require('../models')
const bcrypt = require('bcryptjs')

/*
 function User(obj) {
 this.user = obj;
 }
 */
class User extends db.User {
    constructor(props) {
        super(props)
    }

    async save() {
        this.salt = await bcrypt.genSalt(4);
        this.password = await bcrypt.hash(this.password, this.salt)
        try {
            await super.save()
        } catch(err) {
            throw err
        }
    }

    async auth() {
        let one = await db.User.findOne({username: this.username})
        if (!one) {
            return false
        }
        let hash = await bcrypt.hash(this.password, one.salt)
        if (hash === one.password) {
            return one.toJSON()
        }
        return false
    }
}

User.findOneAndRemove = async function (conditions) {
    try {
        await db.User.findOneAndRemove(conditions)
        return true
    } catch(err) {
        throw err
    }
}

User.getAllRecord = async function () {
    const all = await db.User.find({})
    const result = []
    all.filter((item) => {
        if (item.username !== 'admin') {
            return item
        }
    }).forEach((item) => {
        let obj = item.toJSON()
        obj.key = obj.id
        result.push(obj)
    })
    return result
}


User.updateOne = async function (id, newValue) {
    try {
        if (newValue.password && newValue.password !== '') {
            newValue.salt = await bcrypt.genSalt(4);
            newValue.password = await bcrypt.hash(newValue.password, newValue.salt)
        }
        await db.User.update({id: id}, {$set: newValue})
        return true
    } catch (err) {
        throw err
    }
}

new User({
    name: '管理员',
    username: 'admin',
    password: 'admin',
    authority: ['ADMIN', 'STEP1', 'STEP2', 'STEP3', 'STEP4'],
    phone: 17319242396
}).save().catch((err) => {

})

module.exports = User
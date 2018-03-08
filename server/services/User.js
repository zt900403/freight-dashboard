/**
 * Created by ZT on 18/03/07.
 */
const db = require('../models')
const bcrypt = require('bcryptjs')

let a = async function () {
    const User = new db.User({
        salt: 'hahahah',
    })
    await User.save()
}

function User(obj) {
    this.user = obj;
}

User.prototype.save = async function () {
    let user = this.user;
    const salt = await bcrypt.genSalt(4);
    user.salt = salt;
    user.password = await bcrypt.hash(user.password, salt)
    try {
        await new db.User(user).save()
        return '创建成功!'
    } catch (err) {
        throw err
    }
}

User.prototype.auth = async function () {
    let user = this.user;
    let one = await db.User.findOne({username: user.username})

    if (!one) {
        return false
    }

    var hash = await bcrypt.hash(user.password, one.salt)
    if (hash === one.password) {
        const result = one.toJSON()
        return result
    }
    return false
}



module.exports = User
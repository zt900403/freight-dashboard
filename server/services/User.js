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

/*
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
*/
new User({
    name: '管理员',
    username: 'admin',
    password: 'admin',
    authority: ['ADMIN', 'STEP1', 'STEP2', 'STEP3', 'STEP4'],
    phone: 17319242396
}).save().catch((err) => {

})

module.exports = User
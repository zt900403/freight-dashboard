/**
 * Created by ZT on 18/03/07.
 */
const util = require('../models/util')

const userSchema = util.defineSchema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    salt: {
        type: String,
        require: true,
    },
    phone: Number,
    group: [String]
})


userSchema.post('save', async function (next) {
    const idg = require('./').IDGenerator
    await idg.increaseID('user')
    await next()
})


userSchema.pre('save', async function(next) {
    const idg = require('./').IDGenerator
    this.id = await idg.getID('user')
    await next()
})

module.exports = userSchema

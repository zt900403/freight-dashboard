/**
 * Created by ZT on 18/03/07.
 */
const util = require('../models/util')

const userSchema = util.defineSchema('user', {
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
    authority: [String]
})


module.exports = userSchema

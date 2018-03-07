/**
 *
 * Created by ZT on 18/03/07.
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema
module.exports = {
    defineSchema: function(attrs) {
        let options = {
            id: {
                type: Number,
                required: true,
                unique: true
            },
            createAt: Date,
            updateAt: Date,
            version: {
                type: Number,
                default: 0,
            }
        }
        let merge = Object.assign({}, attrs, options)
        return new Schema(merge)

    },
}
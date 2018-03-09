/**
 *
 * Created by ZT on 18/03/07.
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = {
    defineSchema: function(schemaName, attrs) {
        let options = {
            id: {
                type: Number,
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
        let schema = new Schema(merge)
        schema.post('save', async function () {
            const idg = require('./').IDGenerator
            await idg.increaseID(schemaName)
        })

        schema.pre('save', async function(next) {
            const idg = require('./').IDGenerator
            this.id = await idg.getID(schemaName)
            //delete undefined value
            await next()
        })
        schema.post('find', async function(doc, next) {
            for (let p in doc) {
                if (!doc[p])
                    delete doc[p]
            }
            await next()
        })
        return schema

    },
}
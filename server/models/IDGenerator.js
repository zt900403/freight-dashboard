/**
 * Created by ZT on 18/03/07.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const idgSchema = new Schema({
    modelname  : { type: String },
    currentid  : { type: Number, default: 1 }
})

module.exports = idgSchema



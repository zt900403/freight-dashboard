/**
 * Created by ZT on 18/03/07.
 */
const mongoose = require('mongoose');
mongoose.connect(require('./config.json').MongoDB_URI);


const db = mongoose.connection
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('mongodb connection!')
});

const IDGenerator = mongoose.model('idgenerator', require('./IDGenerator'))

IDGenerator.increaseID = async function (modelname) {
    const data = await this.findOne({modelname: modelname})
    if (data) {
        data.currentid++
    } else {
        await this.create({modelname: modelname})
    }
    await data.save()
    return data.currentid
}


IDGenerator.getID = async function (modelname) {
    const data = await this.findOne({modelname: modelname})
    if (data) {
        return data.currentid
    } else {
        await this.create({modelname: modelname})
        return 1
    }
    return data.currentid
}

const userModel = mongoose.model('user', require('./user'))
userModel.prototype.toJSON = function () {
    return {
        username: this.username,
        name: this.name,
        phone: this.phone,
        authority: this.authority,
    }
}

module.exports = {
    User: userModel,
    IDGenerator: IDGenerator
}
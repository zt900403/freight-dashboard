/**
 * Created by ZT on 18/03/07.
 */
const db = require('../models')

let a = async function () {
    const User = new db.User({
        username: 'zt900403',
        name: '张涛',
        password: 'zhangtao43',
        salt: 'hahahah',
    })
    await User.save()
}

a()

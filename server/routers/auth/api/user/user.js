/**
 * Created by zhang on 18/03/07.
 */
const User = require('../../../../services/User')
const APIError = require('../../../../middleware/rest').APIError
const newUserFn = async (ctx) => {
    try {
        let body = ctx.request.body
        body.authority = body.authority.split(',')
        await new User(body).save()
        ctx.rest({
            message: '创建成功!'
        })
    } catch (err) {
        if (err.code === 11000) {
            throw new APIError(
                'save: save_error',
                '用户名已使用!'
            )
        }
    }
}

module.exports = {
    'POST /': newUserFn,
}
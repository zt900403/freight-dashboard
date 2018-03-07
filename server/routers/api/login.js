/**
 * Created by zhang on 18/03/07.
 */
const APIError = require('../../middleware/rest').APIError
const loginFn = async(ctx) => {
    let query = ctx.request.query
    if (query.username === 'zt900403' && query.password === 'zhangtao43') {
        ctx.session.userinfo = {
            username: 'zt900403'
        }
        ctx.rest({
            username: 'zt900403'
        })
    } else {
        throw new APIError('auth:username_password_not_match', '帐号或密码错误!')
    }
}

module.exports = {
    'GET /login': loginFn,
}
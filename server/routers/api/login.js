/**
 * Created by zhang on 18/03/07.
 */
const APIError = require('../../middleware/rest').APIError
const User = require('../../services/User')
const loginFn = async (ctx) => {
    let query = ctx.request.query
    const result = await new User(query).auth()
    if (result) {
        ctx.session.userinfo = result
        ctx.rest(result)
    } else {
        throw new APIError('auth:username_password_not_match', '帐号或密码错误!')
    }

}

module.exports = {
    'GET /login': loginFn,
}
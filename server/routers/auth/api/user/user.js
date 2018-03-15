/**
 * Created by zhang on 18/03/07.
 */
const User = require('../../../../services/User')
const APIError = require('../../../../middleware/rest').APIError
const newUserFn = async (ctx) => {
    if (!ctx.session.userinfo || !ctx.session.userinfo.authority.includes('ADMIN')) {
        throw new APIError('auth: auth_error', '权限不足!')
    }
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
const getAllUser = async (ctx) => {
    if (!ctx.session.userinfo || !ctx.session.userinfo.authority.includes('ADMIN')) {
        throw new APIError('auth: auth_error', '权限不足!')
    }
    try {
        const result = await User.getAllRecord()
        ctx.rest(result)
    } catch (err) {
        throw err
    }


}

const deleteUser = async (ctx) => {
    if (!ctx.session.userinfo || !ctx.session.userinfo.authority.includes('ADMIN')) {
        throw new APIError('auth: auth_error', '权限不足!')
    }
    try {
        await User.findOneAndRemove({id: ctx.params.id})
        ctx.rest({
            message: '删除成功!'
        })
    } catch (err) {
        throw err
    }
}

const updateOneUser = async (ctx) => {
    if (!ctx.session.userinfo || !ctx.session.userinfo.authority.includes('ADMIN')) {
        throw new APIError('auth: auth_error', '权限不足!')
    }
    try {
        let id = ctx.params.id
        let body = ctx.request.body
        body.authority = body.authority.split(',')
        await User.updateOne(id, body)
        ctx.rest({
            message: '更新成功!'
        })
    } catch (err) {
        throw err
    }

}
module.exports = {
    'POST /': newUserFn,
    'GET /': getAllUser,
    'DELETE /:id': deleteUser,
    'POST /:id': updateOneUser,
}
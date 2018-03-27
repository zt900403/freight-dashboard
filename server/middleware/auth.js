
const APIError = require('./rest').APIError

module.exports = {
    auth: (authPath) => {
        authPath = authPath || '/auth/api'
        return async (ctx, next) => {
            if (ctx.request.path.startsWith(authPath)) {
                console.log(ctx.session)
                if (ctx.session && ctx.session.userinfo) {
                    console.log(ctx.session)
                    await next()
                } else {
                    throw new APIError('auth:not_auth', 'user not auth')
                }
            } else {
                await next()
            }

        }
    }
};

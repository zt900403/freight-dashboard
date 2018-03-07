/**
 * Created by zhang on 18/03/07.
 */

const newUserFn = async (ctx) => {
    ctx.rest({hoho: 'hehengheng'})
}

module.exports = {
    'GET /newuser': newUserFn,
}
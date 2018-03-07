module.exports = {
    sessionConfig: {
        key: 'koa:sess',
        maxAge: 7200000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false,
    },
}
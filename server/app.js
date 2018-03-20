const Koa = require('koa')
const router = require('./routers')

const app = new Koa()
const session = require('koa-session')
const bodyParser = require('koa-bodyparser');
const rest = require('./middleware/rest')
const auth = require('./middleware/auth')

const config = require('./config')

app.keys = ['fucking awesome!!!']
/*
app.use(async(ctx) => {
    let url = ctx.request.url
    ctx.body = url
})
*/
app.use(session(config.sessionConfig, app));
console.log(config.sessionConfig)
app.use(bodyParser())
app.use(rest.restify())
app.use(auth.auth())
app.use(router.routes()).use(router.allowedMethods())


const port = 8080
app.listen(port, () => {
    console.log(`server is starting at port ${port}`)
})
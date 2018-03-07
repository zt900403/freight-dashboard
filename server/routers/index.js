/**
 * Created by zhang on 18/03/07.
 */
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

function scanSubRouters(router, dir) {
    fs.readdirSync(__dirname + '/').filter((f) => {
        return f;
    }).forEach((f) => {
        console.log(`process routers: ${f}...`);
        // let mapping = require(__dirname + '/' + dir + '/' + f);
        // addMapping(router, mapping);
    });
}

const walkSync = function (dir, filelist) {
    let files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir,file), filelist);
        }
        else {
            if (file.endsWith('.js'))
                filelist.push(path.join(dir, file));
        }
    });

    return filelist;
};

const getRootPath = function (absolute) {

    return path.dirname(absolute).replace(__dirname, '').replace(/\\/g, '/')
}

const removeFiles = function (files, removes) {
    let result = []
    return files.filter((f) => {
        let flag = false;
        removes.forEach((one) => {
            if (f.endsWith(one)) {
                flag = true
            }
        })
        if (!flag)
            return f
    })
}

function addMapping(router, mapping, rootPath) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = rootPath + url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = rootPath + url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            var path = rootPath + url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = rootPath + url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}


const registerPath = function () {
    const router = new Router()
    let result = walkSync(__dirname)
    result = removeFiles(result, ['index.js'])
    result.forEach((filepath) => {
        let mapping = require(filepath)
        let rootPath = getRootPath(filepath)
        addMapping(router, mapping, rootPath)
    })
    return router
}

// router.use('/api', Api.routes(), Api.allowedMethods())
// scanSubRouters()

module.exports = registerPath()
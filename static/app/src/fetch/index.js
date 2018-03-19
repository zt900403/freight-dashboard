/**
 * Created by zhang on 18/03/07.
 */
import 'whatwg-fetch'
import 'es6-promise'

function params2getParams(obj) {
    let result = '?'
    for (let p in obj) {
        result += `${p}=${obj[p]}&`
    }
    return result.slice(0, -1)
}

// function get(url, paramsObj) {
//     url += params2getParams(paramsObj)
//     return fetch(url, {
//         credentials: 'include',
//         headers: {
//             'Accept': 'application/json, text/plain,*/*'
//         }
//     }).then(parseJSON)
// }
function parseJSON(response) {
    return new Promise((resolve) => response.json()
        .then((json) => resolve({
            status: response.status,
            ok: response.ok,
            json,
        })));
}

function deleteUndefined(obj) {
    for (let p in obj) {
        if (obj[p] === null || obj[p] === undefined || obj[p] === '')
            delete obj[p]
    }
    return obj
}

function get(url, paramsObj) {
    return new Promise((resolve, reject) => {
        url += params2getParams(deleteUndefined(paramsObj))
        fetch(url, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain,*/*'
            }
        })
            .then(parseJSON)
            .then((response) => {
                if (response.ok) {
                    return resolve(response.json);
                }
                // extract the error from the server's json
                return reject(response.json);
            })
            .catch((error) => reject({
                networkError: error.message,
            }));
    });
}


function obj2params(obj) {
    var result = '';
    var item;
    for (item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item])
    }

    if (result) {
        result = result.slice(1)
    }
    return result;
}

// //send post request
// function post(url, paramsObj) {
//     return fetch(url, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: obj2params(paramsObj)
//     });
// }

function post(url, paramsObj) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: obj2params(deleteUndefined(paramsObj))
        })
            .then(parseJSON)
            .then((response) => {
                if (response.ok) {
                    return resolve(response.json);
                }
                // extract the error from the server's json
                return reject(response.json);
            })
            .catch((error) => reject({
                networkError: error.message,
            }));
    });
}

function put(url, paramsObj) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: obj2params(deleteUndefined(paramsObj))
        })
            .then(parseJSON)
            .then((response) => {
                if (response.ok) {
                    return resolve(response.json);
                }
                // extract the error from the server's json
                return reject(response.json);
            })
            .catch((error) => reject({
                networkError: error.message,
            }));
    });
}

function DELETE(url, paramsObj) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*',
            },
            body: obj2params(deleteUndefined(paramsObj))
        })
            .then(parseJSON)
            .then((response) => {
                if (response.ok) {
                    return resolve(response.json);
                }
                // extract the error from the server's json
                return reject(response.json);
            })
            .catch((error) => reject({
                networkError: error.message,
            }));
    });
}



// function parseJSON(response) {
//     return response.json()
// }


export default {
    get,
    post,
    put,
    DELETE,
}
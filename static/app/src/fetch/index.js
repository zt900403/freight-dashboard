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

function get(url, paramsObj) {
    return new Promise((resolve, reject) => {
        url += params2getParams(paramsObj)
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

//send post request
function post(url, paramsObj) {
    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: obj2params(paramsObj)
    });
}

// function parseJSON(response) {
//     return response.json()
// }


export default {
    get,
    post
}
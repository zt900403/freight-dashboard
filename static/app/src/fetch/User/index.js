/**
 * Created by zhang on 18/03/08.
 */
import fetch from '../index'

export function login(data) {
    const result = fetch.get('/api/login', data)
    return result
}

export function newUser(data) {
    const result = fetch.post('/auth/api/user', data)
    return result
}

export function getAllUser(data) {
    const result = fetch.get('/auth/api/user', data)
    return result
}

export function deleteUser(id) {
    const result = fetch.DELETE('/auth/api/user/' + id)
    return result
}


export function updateOneUser(data) {
    const result = fetch.post('/auth/api/user/' + data.id, data)
    return result
}
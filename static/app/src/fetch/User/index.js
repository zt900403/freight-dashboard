/**
 * Created by zhang on 18/03/08.
 */
import fetch from '../index'

export function login(data) {
    const result = fetch.get('/api/login', data)
    return result
}

export function newUser(data) {
    const result = fetch.post('/auth/api', data)
    return result
}
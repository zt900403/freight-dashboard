/**
 * Created by zhang on 18/03/07.
 */

import fetch from '../'

export function login(data) {
    const result = fetch.get('/api/login', data)
    return result
}
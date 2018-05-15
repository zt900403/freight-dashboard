/**
 * Created by zhang on 18/03/08.
 */
import fetch from '../index'

export function getCarCost(data) {
    const result = fetch.get('/auth/api/carcost', data)
    return result
}

export function updateOrUpsert(data) {
    const result = fetch.post('/auth/api/carcost', data)
    return result
}

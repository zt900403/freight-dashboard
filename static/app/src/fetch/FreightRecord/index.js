/**
 * Created by zhang on 18/03/08.
 */
import fetch from '../index'

export function newFreightRecord(data) {
    const result = fetch.put('/auth/api/freightrecord', data)
    return result
}

export function getAllRecord(data) {
    const result = fetch.get('/auth/api/freightrecord', data)
    return result
}

export function updateOneRecord(id, newValue) {
    const result = fetch.post('/auth/api/freightrecord/' + id, newValue)
    return result
}
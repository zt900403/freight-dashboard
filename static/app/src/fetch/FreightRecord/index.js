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

export function deleteOneReocrd(id) {
    const result = fetch.DELETE('/auth/api/freightrecord/' + id)
    return result
}

export function getDoneRecord(data) {
    const result = fetch.get('/auth/api/freightrecord/done', data)
    return result
}

export function getUndoneRecord(data) {
    const result = fetch.get('/auth/api/freightrecord/undone', data)
    return result
}

export function getDistinctCarNumber(data) {
    const result = fetch.get('/auth/api/freightrecord/distinctcarnumber', data)
    return result
}

export function getDistinctPurchaser(data) {
    const result = fetch.get('/auth/api/freightrecord/distinct_purchaser', data)
    return result
}

export function getCarCostDetail(data) {
    const date = data.date
    data.year = date.year()
    data.month = date.month()
    delete data.date
    const result = fetch.get('/auth/api/freightrecord/carcostdetail', data)
    return result
}

export function getPoisonRecords(data) {
    const result = fetch.get('/auth/api/freightrecord/poisonrecords', data)
    return result
}

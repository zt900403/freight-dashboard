/**
 * Created by zhang on 18/03/08.
 */
import fetch from '../index'

export function saveFreightRecord(data) {
    const result = fetch.post('/auth/api/freightrecord', data)
    return result
}
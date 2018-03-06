/**
 * Created by zhang on 18/03/06.
 */

import { createStore } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState,
        // 触发 redux-devtools
        window.devToolsExtension ? window.devToolsExtension() : undefined
    )
    return store
}

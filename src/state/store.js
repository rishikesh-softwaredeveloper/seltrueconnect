// import {createStore, applyMiddleware} from 'redux'
// import reducers from './reducers'
// import thunk from 'redux-thunk';
// import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const persistConfig = {
//     key: 'root',
//     storage:AsyncStorage
// }

// const persistedReducer = persistReducer(persistConfig, reducers)

// export const store = createStore(
//     persistedReducer,
//     {},
//     applyMiddleware(thunk)
// )

// export const persistor = persistStore(store)


import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk';

export const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk)
)


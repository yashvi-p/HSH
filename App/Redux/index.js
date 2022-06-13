import {createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer from './Reducer/authReducer';
import generalReducer from './Reducer/generalReducer';

const rootReducer = combineReducers({
  authReducer: authReducer,
  generalReducer: generalReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authReducer', 'generalReducer'],
  // blacklist: ['generalReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export {store, persistor};

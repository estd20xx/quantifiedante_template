import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist"
import storage from "redux-persist/es/storage"

import authSlices from "./slices/userInfo/Auth.slice"

const persistConfig = {
  key: "@Quan",
  version: 2,
  storage: storage,
  whitelist: ["auth"],
  blacklist: [],
}

const rootReducer = combineReducers({
  auth: authSlices,
})
const persistReducerUser = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistReducerUser,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

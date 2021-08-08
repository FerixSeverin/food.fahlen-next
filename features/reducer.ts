import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authentication/authenticationReducer';

// export const rootReducer = combineReducers({
//   authentication: authenticationReducer,
// });

// export const store = createStore(rootReducer);

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;


import {configureStore} from '@reduxjs/toolkit';
import enroll from './modules/enrollSlice';

const store = configureStore({
  reducer: {enroll},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['enroll/changeAdditionalInfo'],
        ignoredPaths: ['enroll.dueDate'],
      },
    }),
});

export default store;

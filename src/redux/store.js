import {configureStore} from '@reduxjs/toolkit';
import enroll from './modules/enrollSlice';

const store = configureStore({
  reducer: {enroll},
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(
  //     teacherCourseApi.middleware,
  //     invitationsApi.middleware,
  //     courseBatchSessionApi.middleware,
  //     adminUserApi.middleware,
  //     teacherCourseBatchApi.middleware
  //   ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

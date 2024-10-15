import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth/authSlice';
import { teacherCourseApi } from '../slices/teacher/teacherCourseApi';
import { invitationsApi } from '../slices/invitation/invitationsApi';
import { courseBatchSessionApi } from '../slices/teacher/courseBatchSessionApi';
import { adminUserApi } from '../slices/admin/adminUserApis';
import { teacherCourseBatchApi } from '../slices/teacher/teacherCourseBatchApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [teacherCourseApi.reducerPath]: teacherCourseApi.reducer,
    [invitationsApi.reducerPath]: invitationsApi.reducer,
    [courseBatchSessionApi.reducerPath]: courseBatchSessionApi.reducer,
    [adminUserApi.reducerPath]: adminUserApi.reducer,
    [teacherCourseBatchApi.reducerPath]: teacherCourseBatchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      teacherCourseApi.middleware,
      invitationsApi.middleware,
      courseBatchSessionApi.middleware,
      adminUserApi.middleware,
      teacherCourseBatchApi.middleware,
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

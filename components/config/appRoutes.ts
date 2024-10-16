export enum AppRoutes {
  HOME = '/',
  DASHBOARD = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  FORGOT_PASSWORD = '/forgotpassword',
  RESET_PASSWORD = '/resetpassword',
  AUTH = '/auth',
  PROFILE = '/profile',
  MY_COURSES = '/my-courses',
  ALL_COURSES = '/all-courses',
  ASSESMENTS = '/assesments',
  TEACHER_DASHBOARD = '/teacher/dashboard',
  STUDENT_DASHBOARD = '/student/dashboard',
  ADMIN_DASHBOARD = '/admin/dashboard',

  TEACHER_COURSES = '/teacher/courses',
  TEACHER_COURSES_NEW = '/teacher/courses/new',
  TEACHER_BATCH_DETAIL = '/teacher/batches/:batchId',
  TEACHER_SESSION = '/teacher/session',
  TEACHER_BATCHES = '/teacher/batches',
  TEACHER_TOTAL_STUDENTS = '/teacher/total-students',

  TEACHER_CHAT = '/teacher/chat',
  TEACHER_PROFILE = '',
  TEACHER_SETTINGS = '/teacher/settings',

  VERIFY_OTP = '/verifyotp',

  ADMIN_TEACHERS = '/admin-teachers',
  ADMIN_STUDENTS = '/admin-students',

  STUDENT_COURSES = '/student/courses',
  STUDENT_SESSION = '/student/sessions',
  STUDENT_CLASSES = '/student/classes',
  STUDENT_SETTINGS = '',
  STUDENT_BATCH_DETAIL = '/student/batches/:batchId',
}

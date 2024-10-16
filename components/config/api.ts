export const baseUrl: string =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.easekode.com/api/v1/';

export enum ApiUrl {
  LOGIN = 'login',
  REGISTER = 'register',
  FORGOT_PASSWORD = 'forget-password',
  RESET_PASSWORD = 'reset-password',
  REFRESH_TOKEN = 'refresh-token',
  ENROLL = 'enrolled-student',
  COURSES = 'courses',
  SUGGEST_COURSE = 'suggest-course',
  CONFIRM_SUGGESTED_COURSE = 'confirm-suggested-course',
  SUGGEST_QUESTIONS = 'suggest-questions',
  CREATE_EXAM = 'exams',
  GET_EXAM = 'exams/:id',
  SUBMIT_EXAM = 'exams/:id/submit-answer',
  EXAM_TRACKER_BY_STUDENT = 'exam-tracker-by-student',
  EXAM_RESULT = 'exams/:id/result',
  USERS = 'users',
  SAVE_FEEDBACK = 'feedback-course-batch-sessions',
  FEEDBACK_TOPICS = 'feedback-topics',

  //Admin URLS
  CREATE_USER = 'users',
  UPDATE_USER = 'users/:id',
  DELETE_USER = 'users/:id',
  ADMIN_FEEDBACK_TOPICS = 'admin-feedback-topics',

  //Student URLs
  STUDENT_INFO_DASHBOARD = 'dashboard-info-student',
  STUDENT_INVITATIONS = 'student-invitations',
  STUDENT_ACCEPT_REJECT_INVITATION = 'student-accept-reject-invitation',
  STUDENT_BATCH_INFO_BY_ID = 'student-batch-dashboard-info/:id',
  GET_SUDENT_BATCHES = 'student-batches',

  // Teacher URLs
  TEACHER_COURSE_DETAILS = 'author/courses/:id',
  CREATE_COURSE_BATCH = 'teacher-course-batches',
  TEACHER_COURSE_BATCH = 'teacher/course-batches',
  TEACHER_COURSE_BATCH_BY_ID = 'teacher-course-batches/:id',
  GET_COURSE_BATCHES = 'teacher-course-batches',
  TEACHER_INFO_DASHBOARD = 'dashboard-info-teacher',
  TEACHER_STUDENT_BATCH = 'student-batch-association',
  TEACHER_EXAMS = 'teacher-exams',
  TEACHER_EXAM_DETAILS = 'exams/:id',
  INVITATION = 'teacher-student-batch-invitation',
  TEACHER_INIT_BATCH_PROGRESS = 'init-course-batch-progress',
  VERIFY_USER = 'verify-user',
  TEACHER_COURSES_BY_AUTHOR = 'author/courses',
  TEACHER_COURSE_BATCH_SESSIONS_BY_BATCH_ID = 'teacher-course-batch-sessions/:id',
  TEACHER_COURSE_BATCH_STARTSESSION_BY_BATCH_ID = 'course-batch-sessions',
  TEACHER_END_COURSE_BATCH_SESSION = 'end-course-batch-session/:sessionId',
  PUBLISH_COURSE = 'publish-course/:id',
  UPDATE_COURSE = 'author/course/:id',
  TEACHER_COURSES = 'teacher/courses',
}

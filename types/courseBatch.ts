import { Document, Schema } from 'mongoose'
import { PaginatedResult, QueryStringType } from './pagination'
import { IUser } from './user'
import { IEvent, NewEvent } from './event'
import { Course } from './course'
import { IInvitation } from './invitation'
export enum FeedbackPurpose {
 COURSE_BATCH = 'batch',
 COURSE_BATCH_SESSION = 'session',
 APP_SERVICE = 'APP_SERVICE'
}

export enum EventPurpose {
 COURSE_BATCH = 'batch',
 COURSE_BATCH_SESSION = 'session'
}

export enum EventMode {
 ONLINE = 'ONLINE',
 OFFLINE = 'OFFLINE'
}

export enum CourseBatchAssnStatus {
 PENDING = 'PENDING',
 ACTIVE = 'ACTIVE',
 INACTIVE = 'INACTIVE'
}
export enum SessionStatus {
 NOT_STARTED = 'NOT_STARTED',
 IN_PROGRESS = 'IN_PROGRESS',
 COMPLETED = 'COMPLETED',
 CANCELLED = 'CANCELLED'
}

export enum EventStatus {
 NOT_STARTED = 'NOT_STARTED',
 IN_PROGRESS = 'IN_PROGRESS',
 COMPLETED = 'COMPLETED',
 CANCELLED = 'CANCELLED'
}

export enum CourseBatchStatus {
 NOT_STARTED = 'NOT_STARTED',
 IN_PROGRESS = 'IN_PROGRESS',
 COMPLETED = 'COMPLETED',
 CANCELLED = 'CANCELLED'
}

export enum CourseBatchTrackerStatus {
 NOT_STARTED = 'NOT_STARTED',
 IN_PROGRESS = 'IN_PROGRESS',
 COMPLETED = 'COMPLETED'
}

export enum SessionFrequency {
 DAILY = 'DAILY',
 WEEKLY = 'WEEKLY',
 WEEKENDS = 'WEEKENDS',
 ALTERNATE_DAYS = 'ALTERNATE_DAYS',
 WEEKDAYS = 'WEEKDAYS'
}

export interface TopicProgress {
 _id?: Schema.Types.ObjectId

 name: string
 status: CourseBatchTrackerStatus
}
export interface ChapterProgress {
 _id?: Schema.Types.ObjectId
 name: string
 topics: TopicProgress[]
 status: CourseBatchTrackerStatus
}

export interface CourseProgressSchema {
 courseId: Schema.Types.ObjectId
 chapters: ChapterProgress[]
 status: CourseBatchTrackerStatus
}
export interface ICourseBatch extends Document {
 name: string
 code: string
 courseId?: Schema.Types.ObjectId
 course?: Course
 instructorIds?: Schema.Types.ObjectId[]
 instructors?: IUser[]
 currentInstructorId?: Schema.Types.ObjectId
 currentInstructor?: IUser
 eventId?: Schema.Types.ObjectId
 event?: IEvent
 courseProgress?: CourseProgressSchema
 status?: CourseBatchStatus
 stats?: {
  totalChapters: number
  completedChapters: number
  ratings: number
  completedSessions: number
 }
 totalStudents?: number
}

export interface NewCourseBatch extends Omit<ICourseBatch, keyof Document | 'event'> {
 event: NewEvent
}

export interface IStudentBatchAssociation extends Document {
 userId?: Schema.Types.ObjectId
 user?: IUser
 batchId?: Schema.Types.ObjectId
 batch?: ICourseBatch
 status?: CourseBatchAssnStatus
}

export enum SessionAttendanceStatus {
 PRESENT = 'PRESENT',
 ABSENT = 'ABSENT',
 LATE = 'LATE',
 NOT_APPLICABLE = 'NOT_APPLICABLE'
}

export interface ICourseBatchSessionAttendance {
 _id?: Schema.Types.ObjectId
 userId: Schema.Types.ObjectId
 user?: IUser
 sessionId: Schema.Types.ObjectId
 session?: ICourseBatchSession
 status: SessionAttendanceStatus
}

export interface NewAttendance {
 sessionId: Schema.Types.ObjectId
 status: SessionAttendanceStatus
}

export interface ICourseBatchSession extends Document {
 slNo?: number
 name: string
 batchId: Schema.Types.ObjectId
 batch?: ICourseBatch
 duration: number
 status?: SessionStatus
 startDateTime: Date
 endDateTime?: Date
 teacherId: Schema.Types.ObjectId
 teacher?: IUser
 feedback?: Schema.Types.ObjectId[]
 notes?: string
 meetingLink?: string
}

export interface TeacherCourseBatchResponse {
 batch: ICourseBatch
 pendingInvites: IInvitation[]
 members: PaginatedResult<any>
}
export interface ICourseBatchSessionClient extends ICourseBatch {
 course: Course
}

export interface NewCourseBatchSession {
 batchId: string
}

export type CourseBatchSessionType = Omit<ICourseBatchSession, keyof Document>
export interface IFeedback extends Document {
 user?: IUser
 userId?: Schema.Types.ObjectId
 batchId?: Schema.Types.ObjectId
 batch?: ICourseBatch
 sessionId?: Schema.Types.ObjectId
 session?: ICourseBatchSession
 purpose: FeedbackPurpose
 comment?: string
 rating?: number
 feedbackByTopics?: {
  topicId: Schema.Types.ObjectId
  topic?: string
  rating?: number
  isChecked?: boolean
  comment?: string
 }[]
}

export type NewFeedback = Omit<IFeedback, keyof Document>

/* const newFeedback: NewFeedback = {
 
  feedbacks: [
    {
      topic: '123', // Teacher engagement rating topic
      rating: 4, // 1-5
    },
    {
      topic: '1234', // Teacher engagement rating topic
      rating: 5, // 1-5
    },
  ],
}; */

export interface IFeedbackQuery {
 query?: {
  user?: string
  batch?: string
  session?: string
  populate?: string
  populateKeys?: string
 } & QueryStringType
}

//this event can be mapped to calender to present (in the UI)

export interface IStudentBatchAssocQuery {
 query?: {
  user?: string
  batch?: string
  populate?: string
  populateKeys?: string
 } & QueryStringType
}

export interface ICourseBatchTracker extends Document {
 batch: Schema.Types.ObjectId
 subject: Schema.Types.ObjectId
 chapter: Schema.Types.ObjectId
 topic: Schema.Types.ObjectId
 course: {
  courseId: Schema.Types.ObjectId
  subjects: {
   subjectId: Schema.Types.ObjectId
   chapters: {
    name: string
    topics: {
     name: string
     status: CourseBatchTrackerStatus
    }[]
    status: CourseBatchTrackerStatus
   }[]
   status: CourseBatchTrackerStatus
  }[]
  status: CourseBatchTrackerStatus
 }
 status: CourseBatchTrackerStatus
 stats: {
  totalChapters: number
  completedChapters: number
  ratings: number
  completedSessions: number
 }
 instructor: IUser
 startDate: Date
 endDate: Date
}

export interface NewBatchAssnBodyType {
 emails?: string[]
 studentIds?: Schema.Types.ObjectId[]
 batchId: Schema.Types.ObjectId
}

export interface UpdateCourseBatchTrackerInput {
 batchId: string
 courseId: string
 subjectId: string
 chapterName: string
 topicName: string
 completed: boolean
}

export interface CourseProgressUpdateType {
 batchId: string
 status: CourseBatchTrackerStatus
 chaptersCovered?: {
  chapterId: string
  topicIds: string[]
 }[]
}

export interface EndSessionBody {
 sessionId: string
 progress: CourseProgressUpdateType
 notes: string
}

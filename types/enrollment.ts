import { Date, Schema, Types } from 'mongoose'
import { IUser } from './user'
import { Course } from './course'

export enum EnrollmentStatus {
 ENROLLED = 'ENROLLED',
 NOT_ENROLLED = 'NOT_ENROLLED',
 PENDING = 'PENDING',
 CANCELED = 'CANCELED'
}

export interface IEnrollment extends Document {
 studentId: Schema.Types.ObjectId
 student?: IUser
 courseId: Schema.Types.ObjectId
 course?: Course
 enrollmentDate: Date
 status?: EnrollmentStatus
}

export interface NewEnrollment {
 studentId: Schema.Types.ObjectId
 courseId: Schema.Types.ObjectId
 batchId?: Schema.Types.ObjectId
 enrollmentDate?: Date
}

export interface BulkEnrollmentRow {
 studentCode?: string
 studentName?: string
 studentEmail?: string
 courseCode: string
 enrollmentDate: Date
 enrollmentStatus: EnrollmentStatus
}

import { Schema } from 'mongoose'
import { Course } from './course'
import { IUser, IUserModel } from './user'

export enum Grade {
 A = 'A',
 B = 'B',
 C = 'C',
 D = 'D',
 E = 'E',
 F = 'F'
}

export enum CertificateStatus {
 ACTIVE = 'ACTIVE',
 INACTIVE = 'INACTIVE',
 REVOKED = 'REVOKED'
}
export interface Certificate {
 _id?: Schema.Types.ObjectId // Unique identifier for the certificate
 learnerId: Schema.Types.ObjectId // ID of the learner
 learner?: IUser
 courseId: Schema.Types.ObjectId // ID of the course
 course?: Course
 courseTitle: string // Title of the course
 completionDate: Date // Date when the course was completed
 certificateId: string // Unique ID for the certificate
 certificateURL: string // URL to the downloadable certificate (PDF)
 status: CertificateStatus // Whether the certificate has been verified
 grade?: Grade // Grade obtained in the course
 score?: number // Score obtained in the course
}

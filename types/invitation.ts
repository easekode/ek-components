import { Schema } from 'mongoose'
import { Course } from './course'
import { ICourseBatch } from './courseBatch'
import { IUser } from './user'

export enum InvitationStatus {
 PENDING = 'pending',
 ACCEPTED = 'accepted',
 REJECTED = 'rejected'
}

export enum RecipientType {
 INDIVIDUAL = 'INDIVIDUAL',
 OPEN = 'OPEN'
}

export enum InvitationPurpose {
 COURSE = 'COURSE',
 BATCH = 'BATCH'
}

export interface StudentAcceptRejectInvitationBody {
 code: string
 status: InvitationStatus
}
export interface IInvitation {
 _id?: Schema.Types.ObjectId
 courseId?: Schema.Types.ObjectId
 course?: Course
 batchId?: Schema.Types.ObjectId
 batch?: ICourseBatch
 userId?: Schema.Types.ObjectId
 user?: IUser
 email?: string
 code?: string
 purpose?: InvitationPurpose
 status?: InvitationStatus
 receipientType?: RecipientType
}

export interface CreateInvitationResponse {
 link?: string
 invitation?: IInvitation
}

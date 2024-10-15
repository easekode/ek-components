import type { Schema } from 'mongoose'
import { IUser } from './user'
import { FileType } from './common'

export enum MessageTypes {
 TEXT = 'TEXT',
 AUDIO = 'AUDIO',
 VIDEO = 'VIDEO',
 IMAGE = 'IMAGE',
 DOCUMENT = 'DOCUMENT'
}

export interface IChatMessage {
 senderId?: Schema.Types.ObjectId
 sender?: IUser
 receiverId?: Schema.Types.ObjectId | string
 receiver?: IUser
 body: string
 conversationId?: Schema.Types.ObjectId
 isRead?: boolean
 messageType: MessageTypes
 groupId?: Schema.Types.ObjectId
 readByUsers?: Schema.Types.ObjectId[]
 file?: FileType
 createdAt?: Date
 updatedAt?: Date
}

export enum GroupActionTypes {
 JOIN = 'JOIN',
 LEAVE = 'LEAVE',
 INVITE = 'INVITE',
 REMOVE_MEMBER = 'REMOVE_MEMBER'
}

export enum GroupMemberRole {
 ADMIN = 'ADMIN',
 MEMBER = 'MEMBER'
}
export interface GroupMember {
 userId: Schema.Types.ObjectId
 role: GroupMemberRole
 joinedAt: Date
}

export interface IGroup {
 groupId: Schema.Types.ObjectId
 groupName: string
 description: string
 members: GroupMember[]
}

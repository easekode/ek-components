import { Schema } from 'mongoose'

export enum OtpPurpose {
 LOGIN = 'LOGIN',
 REGISTER = 'REGISTER',
 FORGOT_PASSWORD = 'FORGOT_PASSWORD'
}
export interface IOtp extends Document {
 otp?: string
 purpose: OtpPurpose
 userId?: Schema.Types.ObjectId
 email?: string
 createdAt?: Date
 updatedAt?: Date
}

export type OtpRequestBody = Omit<
 IOtp,
 keyof Document | 'userId' | 'createdAt' | 'updatedAt' | 'otp'
>
export type NewOtp = Omit<IOtp, keyof Document | 'createdAt' | 'updatedAt'>

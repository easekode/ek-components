import { TransformedUser } from './user'

export interface LoginResponse {
 type: string // Typically "Bearer" for JWT
 accessToken: string
 expiresIn: number | string // Expiration time in seconds
 refreshToken?: string // Optional refresh token
 scope?: string // Optional scope or permissions
 profile?: TransformedUser // Optional user profile
}

export interface LoginBody {
 email: string
 password: string
 deviceToken?: string
}

export interface RegisterBody {
 email: string
 password: string
 mobile?: string
}

export interface ForgetPasswordBody {
 email?: string
 mobile?: string
}

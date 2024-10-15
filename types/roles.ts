import type { Schema, Model } from 'mongoose'
export interface IRole {
 name: string
 description?: string
 slug: string
}

export interface IRoleModel extends Model<IRole> {
 getRoleIdsBySlug(slugArr: string[]): Promise<Schema.Types.ObjectId[]>
}

export type RoleDefinitionValue = {
 _id: string
 name: string
 slug: string
}
export interface IRoleDefinitions {
 role_admin: RoleDefinitionValue
 role_student: RoleDefinitionValue
 role_instructor: RoleDefinitionValue
 //  [key: string]: RoleDefinitionValue
}

export type RoleNames = keyof IRoleDefinitions

export const roleDefinitions: IRoleDefinitions = {
 role_admin: {
  _id: '650acb6e752c4489ac85815f',
  name: 'admin',
  slug: 'role_admin'
 },
 role_student: {
  _id: '650acb6e752c4489ac858160',
  name: 'student',
  slug: 'role_student'
 },
 role_instructor: {
  _id: '650acb6e752c4489ac858161',
  name: 'instructor',
  slug: 'role_instructor'
 }
}

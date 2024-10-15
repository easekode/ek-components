import { Schema, Types } from 'mongoose'
export type ObjectId = Schema.Types.ObjectId
export const idToString = (id: ObjectId | undefined | null) => id?.toString() || ''
// export const stringToId = (id: string) => new Schema.Types.ObjectId(id)
export function stringToId(idString: any): Schema.Types.ObjectId {
 if (!Types.ObjectId.isValid(idString)) {
  throw new Error('Invalid ObjectId string')
 }
 return new Types.ObjectId(idString) as unknown as Schema.Types.ObjectId
}

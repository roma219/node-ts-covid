import mongoose, { Schema, Document } from 'mongoose'

const userSchema = new Schema({
  login: { type: String, unique: true },
  password: String
})

export interface IUser extends Document {
  login: string,
  password: string
}

export default mongoose.model<IUser>('User', userSchema)

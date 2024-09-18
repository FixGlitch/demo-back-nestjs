import { Schema } from 'mongoose';
import { User } from '../../../../domain/entity/user.entity';

export const UserSchema = new Schema<User>({
  userId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
export { User };


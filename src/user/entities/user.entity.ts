import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  Admin = 'admin',
  Customer = 'customer',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  fullname: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    type: [
      {
        countryCode: { type: String },
        phoneNumber: { type: String },
      },
    ],
  })
  phone: { countryCode: string; phoneNumber: string }[];

  @Prop({
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.Customer,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 12);
    return next();
  } catch (error) {
    return next(error);
  }
});

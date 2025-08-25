import mongoose, { Schema, Document } from "mongoose";

const model_name = "User";

export type UserType = Document & {
  name: string;
  username: string;
  email: string;
  profile_image: string;
  woo_id: number
};

const UserSchema: Schema<UserType> = new Schema(
  {
    woo_id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      max: 200,
      min: 5,
    },
    email: {
      type: String,
      max: 200,
      required: true
    },
    profile_image: {
      type: String,
      max: 300,
    },
    username: {
      type: String,
      max: 100,
      min: 6,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel =
  (mongoose.models?.[model_name] as mongoose.Model<UserType>) ||
  mongoose.model(model_name, UserSchema);

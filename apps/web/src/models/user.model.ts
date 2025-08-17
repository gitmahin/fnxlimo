import mongoose, { Schema, Document } from "mongoose";

const model_name = "User";

export type UserType = Document & {
  name: string;
  uuid: string;
  username: string;
  color: string;
  number: string;
  country: string;
};

const UserSchema: Schema<UserType> = new Schema(
  {
    name: {
      type: String,
      max: 200,
      min: 5,
    },
    uuid: {
      type: String,
      max: 200,
      min: 20,
      required: true,
    },
    username: {
      type: String,
      max: 50,
      min: 6,
      required: true,
    },
    color: {
      type: String,
      max: 100,
    },
    number: {
      type: String,
      max: 50,
      min: 4,
    },
    country: {
      type: String,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel =
  (mongoose.models?.[model_name] as mongoose.Model<UserType>) ||
  mongoose.model(model_name, UserSchema);

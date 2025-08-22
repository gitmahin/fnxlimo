import mongoose, { Schema, Document } from "mongoose";

const model_name = "Car";

export type CarType = Document & {
  name: string;
  colors: string[];
  seats: number;
  bags: number;
  brand: string;
  wheels: number;
};

const CarSchema: Schema<CarType> = new Schema({
  name: {
    type: String,
    max: 200,
    required: true,
  },
  colors: {
    type: [String],
    max: 100,
    validate: {
      validator: carColorsLengthValidator,
      message: "Car colors exceeds the limit of 10",
    },
    required: true,
  },
  seats: {
    type: Number,
    required: true,
    max: 500,
  },
  bags: {
    type: Number,
    required: true,
    max: 200,
  },
  brand: {
    type: String,
    max: 100,
  },
  wheels: {
    type: Number,
    max: 100,
    min: 2,
  },
});

function carColorsLengthValidator(val: string[]) {
  return val.length <= 10;
}

export const carModel =
  (mongoose.models?.[model_name] as mongoose.Model<CarType>) ||
  mongoose.model(model_name, CarSchema);

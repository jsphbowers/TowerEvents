import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
  creatorId: { type: String, required: true, minLength: 3, maxLength: 500 },
  name: { type: String, required: true, minLength: 3, maxLength: 500 },
  description: { type: String, required: true, minLength: 3, maxLength: 1000 },
  coverImg: { type: String, required: true, minLength: 3, maxLength: 500 },
  location: { type: String, required: true, minLength: 3, maxLength: 500 },
  capacity: { type: Number, required: true, min: 0, max: 1000000 },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true, default: false },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] }
},
  { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account"
})
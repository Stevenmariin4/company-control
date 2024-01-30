import mongoose from 'mongoose';
const formatSchema = new mongoose.Schema(
  {
    nameformat: { type: String },
    separator: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default formatSchema;

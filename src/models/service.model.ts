import mongoose from 'mongoose';
const serviceShema = new mongoose.Schema(
  {
    amount: { type: String },
    fee: { type: String },
    typeService: { type: String },
    name: { type: String },
    is_valid: { type: Boolean },
    created_at: { type: String },
    updated_at: { type: String },
    deleted_at: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default serviceShema;

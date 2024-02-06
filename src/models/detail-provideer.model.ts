import mongoose from 'mongoose';
const detailtProvideerShema = new mongoose.Schema(
  {
    service: { type: String },
    provideer: { type: String },
    code: { type: String },
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

export default detailtProvideerShema;

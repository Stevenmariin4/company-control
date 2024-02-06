import mongoose from 'mongoose';
const typeServiceShema = new mongoose.Schema(
  {
    description: { type: String },
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

export default typeServiceShema;

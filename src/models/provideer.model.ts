import mongoose from 'mongoose';
const provideerShema = new mongoose.Schema(
  {
    headerBranchOffice: { type: String },
    headerDateTransaction: { type: String },
    headerTypeTransaction: { type: String },
    headerValueTransaction: { type: String },
    image: { type: String },
    is_valid: { type: Boolean },
    name: { type: String },
    created_at: { type: String },
    updated_at: { type: String },
    deleted_at: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default provideerShema;

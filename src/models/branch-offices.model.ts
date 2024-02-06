import mongoose from 'mongoose';
const branchOfficeShema = new mongoose.Schema(
  {
    idProvideerPuntored: { type: String },
    idProvideerRecargamosApp: { type: String },
    idProvideerPlatik: { type: String },
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

export default branchOfficeShema;

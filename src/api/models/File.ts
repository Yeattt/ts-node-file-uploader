import mongoose, { Schema, Model, model } from 'mongoose';

import { IFiles } from '../interfaces/IFiles';

const fileSchema = new Schema({
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
}, { timestamps: true });

const File: Model<IFiles> = mongoose.models.File || model('File', fileSchema);

export default File;
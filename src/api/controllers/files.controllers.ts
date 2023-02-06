import { Request, Response } from 'express';
import fileUpload, { UploadedFile } from 'express-fileupload';
import path from 'path';

import File from '../models/File';

export const upload = async (req: Request, res: Response) => {
   try {
      let fileToUpload;
      let uploadPath;

      if (!req.files || Object.keys(req.files).length === 0) {
         return res.status(400).json({
            ok: false,
            message: 'No files were selected to upload'
         });
      }

      fileToUpload = req.files.file as UploadedFile;
      const newFileName = `${Date.now()}-_${fileToUpload.name}`;

      uploadPath = path.join(__dirname, '..', '..', '/uploads/', newFileName);

      fileToUpload.mv(uploadPath, (err) => {
         if (err) {
            console.log(err);

            return res.status(500).json({
               ok: false,
               message: 'Internal server error',
               err
            });
         }
      });

      const file = await new File({ 
         fileName: fileToUpload.name,
         filePath: uploadPath  
      });

      await file.save();

      res.status(200).json({
         ok: true,
         message: 'File uploaded successfully'
      });
   } catch (error) {
      console.log(error);

      return res.status(500).json({
         ok: false,
         message: 'Internal server error',
         error
      });
   }
}
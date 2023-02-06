import express, { Application } from 'express';
import fileUpload from 'express-fileupload';

import filesRoutes from '../routes/files.routes';
import { dbConnection } from '../../config/databaseConnection';

class Server {
   private app: Application;
   private port: string;
   private apiPaths = {
      files: '/api/files'
   }

   constructor() {
      this.app = express();
      this.port = process.env.PORT || '3000';

      this.middlewares();
      this.databaseConnection();
      this.routes();
   }

   async databaseConnection() {
      await dbConnection();
   }

   middlewares() {
      this.app.use(express.json());
      this.app.use(fileUpload());
   }

   routes() {
      this.app.use(this.apiPaths.files, filesRoutes);
   }

   listen() {
      this.app.listen(this.port, () => console.log(`Server running on port ${this.port}`));
   }
}

export default Server;
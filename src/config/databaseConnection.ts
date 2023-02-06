import { connect } from 'mongoose';

export const dbConnection = async () => {
   await connect('mongodb://localhost/spacecloud-db')
      .then(res => console.log('Successfull connection to the database'))
      .catch(err => console.log('Error connecting to the database', err));
}
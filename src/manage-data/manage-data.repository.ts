import pool from "../database/pg-config";

export class ManageDataRepository {
  constructor() {
  }

    public async getAllData():Promise<any>{
      try {
        const queryResult = await pool.query('Select * from users_db');
        const data = queryResult.rows;
        console.log('data', data);
        return data;
      } catch (err) {
        console.error(err);
      }

  }
 


}
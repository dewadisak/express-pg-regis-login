import { Client } from "pg";

export class ManageDataRepository {
  private client: any;
  constructor() {
    this.client = new Client({
      host: 'dpg-cl5762c72pts739tfp60-a.oregon-postgres.render.com',
      user: 'test_vv5q_user',
      port: 5432,
      password: '0e4aJJF7sAXJ4pHj3fyFUBbcSdRZ26CQ',
      database: 'test_vv5q',
      ssl: true,
    })
    this.client.connect();
  }

    public async getAllData():Promise<any>{
      try {
        const queryResult = await this.client.query('Select * from users_db');
        const data = queryResult.rows;
        console.log('data', data);
        return data;
      } catch (err) {
        console.error(err);
        throw err; 
      } finally {
        this.client.end();
      }
 
  }

}
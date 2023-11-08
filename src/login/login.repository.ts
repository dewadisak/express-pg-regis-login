import { Client } from "pg";

export class LoginRepository {
  private client: any;
  private pool: any;
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

  public async getDataByEmail(email: string):Promise<any>{
    try{
      const query = {
        text: 'SELECT * FROM users_db WHERE email = $1',
        values: [email],
      };
      const data  = await this.client.query(query);
      const result = data.rows;
      return result;
    } catch(err){
      console.log(err)
    } finally {
      this.client.end();
    }
    
  }

 

}
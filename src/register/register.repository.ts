import { Client } from "pg";
import { IRegister } from "./model/register.interface";

export class RegisterRepository {
  private client: any;
  private pool: any;
  constructor() {
    // this.pool = new Pool({
    //   host: 'dpg-cl5762c72pts739tfp60-a.oregon-postgres.render.com',
    //   user: 'test_vv5q_user',
    //   port: 5432,
    //   password: '0e4aJJF7sAXJ4pHj3fyFUBbcSdRZ26CQ',
    //   database: 'test_vv5q',
    //   ssl: true,
    //   max: 20,
    //   idleTimeoutMillis: 30000,
    //   connectionTimeoutMillis: 2000,
    // })
    // this.pool.connect();
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

  public init(): Promise<any> {
    return this.client.connect(); 
  }

  public async getEmail(email: string):Promise<any>{
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

  public async createRegister(body: IRegister):Promise<any>{
    try{
      const data  = await this.client.query('INSERT INTO users_db (name, phone_number, email, password, ip, register_date) ' +
      'VALUES ($1, $2, $3, $4, $5, $6)',
      [body.name, body.phoneNumber, body.email, body.password, body.ip, body.registerDate]);
      const result = data.rows;
      return result;
    } catch(err){
      console.log(err)
    } finally {
      this.client.end();
    }

  }


}
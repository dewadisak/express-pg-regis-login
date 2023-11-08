import pool from "../database/pg-config";
import { IRegister } from "./model/register.interface";
export class RegisterRepository {

  constructor() {

  }


  public async getEmail(email: string):Promise<any>{
    try{
      const query = {
        text: 'SELECT * FROM users_db WHERE email = $1',
        values: [email],
      };
      const data  = await pool.query(query);
      const result = data.rows;
      return result;
    } catch(err){
      console.log(err)
    } 
  }

  public async createRegister(body: IRegister):Promise<any>{
    try{
      const data  = await pool.query('INSERT INTO users_db (name, phone_number, email, password, ip, register_date) ' +
      'VALUES ($1, $2, $3, $4, $5, $6)',
      [body.name, body.phoneNumber, body.email, body.password, body.ip, body.registerDate]);
      const result = data.rows;
      return result;
    } catch(err){
      console.log(err)
    } 

  }


}
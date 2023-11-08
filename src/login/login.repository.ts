import pool from "../database/pg-config";
export class LoginRepository {
  constructor() {
    
  }

  public async getDataByEmail(email: string):Promise<any>{
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


 

}
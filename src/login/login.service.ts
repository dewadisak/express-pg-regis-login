import bcrypt from "bcrypt";
import { response } from "express";
import { LoginRepository } from "./login.repository";
export class LoginService {
  public loginRepository: LoginRepository;

  constructor() {
    this.loginRepository = new LoginRepository();
  }

  public async processLogin(body: any){
    try{
      const data = await this.loginRepository.getDataByEmail(body.email);
      this.loginRepository.closeConnection();
      if(!data?.length) return response.status(400).send('Not found user, Please register');
      const decryptedPass = data[0].password;
      const encryptedPass = await bcrypt.compareSync(body.password, decryptedPass);
      console.log('data', decryptedPass, body.password);
      if(encryptedPass){
        return response.status(200).send("login success")
      } else{
        return response.status(400).send("invalid email or password")
      }
    } catch(err){
      console.log(err);
    }


  }

}
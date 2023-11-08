import axios from "axios";
import bcrypt from "bcrypt";
import { response } from "express";
import { IRegister } from "./model/register.interface";
import { RegisterRepository } from "./register.repository";

export class RegisterService {
  public registerRepository: RegisterRepository;

  constructor() {
    this.registerRepository = new RegisterRepository()

  }

  public async register(body: IRegister) {
    try {
      const email = await this.registerRepository.getEmail(body.email);
      if(email?.length) return response.status(400).send('User already exist!!');
      if (!body.ip) {
        const ipAddress = await this.getIP();
        body.ip = ipAddress;
      }
      if (!body.registerDate) {
        const time = new Date()
        body.registerDate = time.toISOString();
      }

      const decryptedPass = await bcrypt.hash(body.password, 10);
    
      const data: IRegister = {
        name: body.name,
        phoneNumber: body.phoneNumber,
        email: body.email.toLocaleLowerCase(),
        password: decryptedPass,
        ip: body.ip,
        registerDate: body.registerDate
      }

      await this.registerRepository.createRegister(data);
      console.log('😊')
      this.registerRepository.closeConnection();
      return;

    } catch (err) {
      this.registerRepository.closeConnection() 
      console.log(err);
    }

  }

  public async getIP() {
    let ipAddress: string = ''
    await axios.get('https://api.ipify.org?format=json')
      .then(response => {
        ipAddress = response.data.ip;
      })
      .catch(error => {
        console.error('Error fetching IP address:', error);
      });
    return ipAddress;
  }


}
import cors from 'cors';
import express, { Request, Response } from 'express';
import { LoginService } from './login/login.service';
import { ManageDataService } from './manage-data/manage-data.service';
import { RegisterService } from './register/register.service';
const app = express();
app.use(express.json());
app.use(cors())


const registerService = new RegisterService();
const loginService = new LoginService();
const manageDataService = new ManageDataService();

app.post('/register', async (req: Request, res: Response) => {
  try{
    const body: any = req.body;
    const result = await registerService.register(body);
    res.send(result);
  } catch (err){
    console.log(err)
  }
});

app.post('/login', async (req: Request, res: Response) => {
  try{
    const body: any = req.body;
    const result = await loginService.processLogin(body);
    res.send(result);
  } catch (err){
    console.log(err)
  }
});

app.post('/getAllData', async (req: Request, res: Response) => {
  try{
    const body: any = req.body;
    const result = await manageDataService.getAllData();
    res.send(result);
  } catch (err){
    console.log(err)
  }
});


app.listen(3000, () => {
  console.log('Application started on port 3000!');
});
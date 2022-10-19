import express, { Request, Response, NextFunction } from 'express';
import { InterfaceUser, UserModel } from '../model/user.model';
import bcrypt from 'bcrypt';
export const router = express.Router();

router.post(
  '/auth',
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password }: InterfaceUser = req.body;
    console.log(username);
    if (!username || !password) {
      res.send({ message: 'Invalid username or password' });
    } else {
      try {
        const userFound = await UserModel.findOne({ username });

        if (userFound) {
          const passwordOK = await bcrypt.compare(password, userFound.password);

          if (passwordOK) {
            res.send(userFound);
          } else {
            res.send({ message: 'Password mismatch' });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
);

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, name }: InterfaceUser = req.body;

    if (!username || !password || !name) {
      res.send({ message: 'Invalid username or password' });
    } else {
      try {
        const newUser = new UserModel({
          username,
          password,
          name,
        });
        const result = await newUser.save();

        res.send(result);
      } catch (error) {
        console.log(error);
      }
    }
  }
);

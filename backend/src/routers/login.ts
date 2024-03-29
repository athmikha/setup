
import { generateJWTTokenUsingPrisma } from "../util/jwtutil";
import { NextFunction, Request, Response, Router } from "express";
import { login ,signup} from "../controllers/authcontroller";

const loginRouter = Router();

loginRouter.post(
  "/login",

  async (req: Request, res: Response) => {
    try {
      
      const token = await login(req.body );
      //onst token = req.body;
      console.log(token,"token routers")
      if (token != null) {
        res.status(200).json(token);
      } else {
        res.status(401).json({ err: "Authentication failed" });
      }
    } catch (err) {
      console.log(err);
      return res.status(404).json({ err: "Authentication failed" });
    }
  }
);

loginRouter.post(
  "/signup",

  async (req: Request, res: Response) => {
   
      
      const token = await signup(req.body );
      //onst token = req.body;
      console.log(token,"token routers")
      res.send(token);
      
  }

)


export default loginRouter;

import { Router } from "express";

import loginRoute from "./login";



const mainRouter=Router();



mainRouter.use("/auth", loginRoute)

export default mainRouter;

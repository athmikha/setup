import { Router } from "express";

import loginRoute from "./login";



const mainRouter=Router();



mainRouter.use("/login", loginRoute)

export default mainRouter;

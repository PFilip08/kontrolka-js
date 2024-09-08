import {Router} from 'express';
import {buttonController} from "../controllers/button.controller.js";

const buttonRouter = Router();
buttonRouter.post('/', buttonController);

export default buttonRouter;
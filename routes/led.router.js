import {Router} from 'express';
import {ledController} from "../controllers/led.controller.js";

const ledRouter = Router();
ledRouter.get('/', ledController);

export default ledRouter;
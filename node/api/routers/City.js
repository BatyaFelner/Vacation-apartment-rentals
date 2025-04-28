import express from "express";
import { create, getAll } from '../controllers/City.js';
import { checkAuth } from "../middlewares.js";

const router = express.Router()
router.post('',checkAuth, create )
router.get('',getAll)


export default router
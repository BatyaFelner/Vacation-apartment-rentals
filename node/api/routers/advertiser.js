import express from "express";
import   { login, register ,getAll} from '../controllers/advertise.js'

const router = express.Router()
router.post('/register', register)
router.post('/login',  login)
router.get('/',getAll)



export default router
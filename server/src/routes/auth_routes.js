import {Router} from 'express'
import {authRequerid} from '../middlewares/validateToke.js'
import {register, login, logout, profile} from '../controllers/auth_controllers.js'

const router = Router()

router.post('/register',register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', authRequerid,profile)

export default router;
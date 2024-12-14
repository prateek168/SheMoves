import express from 'express'
import { getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { isAuthenticatedUser } from '../middleware/auth.middleware.js'
const router = express.Router()

router.post('/register' , registerUser)
router.post('/login' , loginUser)
router.get('/profile' , isAuthenticatedUser , getUserProfile )
router.get('/logout' , isAuthenticatedUser , logoutUser)

export default router;
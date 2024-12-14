import express from 'express'
import { getCaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from '../controllers/captain.controller.js';
import { isAuthenticatedCaptain, isAuthenticatedUser } from '../middleware/auth.middleware.js';
const router = express.Router()

router.post('/register', registerCaptain)
router.post('/login', loginCaptain)
router.get('/profile' , isAuthenticatedCaptain  , getCaptainProfile )
router.get('/logout', isAuthenticatedCaptain , logoutCaptain)


export default router;
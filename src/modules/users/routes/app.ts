import express, { Express } from "express";
import users from '../controllers/index';

const router: Express = express();

router.post('/registration/send-otp-code', users.phoneAuth);
router.post('/registration/confirm-otp-code', users.confirmOtpCode);
router.post('/registration/set-user-meta', users.addUserMeta);
// Login user
router.post('/login', users.login);
router.post('/update-password', users.updatePassword);
// generate access token
router.get('/token/generate', users.generateAccessToken);

// router.get('/fake', users.index)

export default router;
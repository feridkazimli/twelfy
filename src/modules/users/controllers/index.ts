import { phoneAuth, confirmOtpCode } from "./otp";
import { addUserMeta } from "./registration";
import { login } from "./login";
import { generateAccessToken } from "./token";

export default {
    phoneAuth, confirmOtpCode,
    addUserMeta,
    login,
    generateAccessToken,
}
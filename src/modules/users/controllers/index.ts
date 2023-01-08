import { phoneAuth, confirmOtpCode } from "./otp";
import { addUserMeta } from "./registration";
import { login, updatePassword } from "./login";
import { generateAccessToken } from "./token";

export default {
    phoneAuth, confirmOtpCode,
    addUserMeta,
    login, updatePassword,
    generateAccessToken,
}
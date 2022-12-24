import SecureController from "../../../services/SecureController";
import { Dummy, ResponseSuccess } from "../../../utils";

const Login = {
    // index: SecureController.schema(Dummy).auth().catchAsync(async (req, res, next, dto) => {})
    index: SecureController.catchAsync(Dummy,async (req, res, next, dto) => {
        console.log('hello fake');

        ResponseSuccess(res, {
            messages: [],
            results: [{
                fake: 'hello fake'
            }]
        })
    }, true)
}

export = Login;
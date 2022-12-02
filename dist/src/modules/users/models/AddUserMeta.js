"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserMeta = void 0;
const AppDataSource_1 = __importDefault(require("../../../../AppDataSource"));
const entity_1 = require("../entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AddUserMeta {
    static updateNickAndPass(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(data.password, salt);
            yield AppDataSource_1.default.manager.createQueryBuilder()
                .update(entity_1.Users)
                .set({
                nickname: data.nickname,
                password: hash,
                updatedAt: new Date()
            })
                .where('id = :userId', { userId: data.userId })
                .execute();
        });
    }
    static insertUserMeta(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateNickAndPass({ nickname: data.Nickname, password: data.Password, userId: data.UserId });
            yield AppDataSource_1.default.manager.createQueryBuilder()
                .insert()
                .into(entity_1.UserMeta)
                .values({
                birthday: new Date(data.Birthday),
                father: data.Father,
                firstName: data.FirstName,
                lastName: data.LastName,
                user: {
                    id: data.UserId
                }
            })
                .orUpdate(['birthday', 'father', 'firstName', 'lastName'], 'user_id')
                .updateEntity(false)
                .execute();
        });
    }
}
exports.AddUserMeta = AddUserMeta;

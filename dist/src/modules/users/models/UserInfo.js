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
exports.UserInfo = void 0;
const AppDataSource_1 = __importDefault(require("../../../../AppDataSource"));
const entity_1 = require("../entity");
class UserInfo {
    static getUserByNickName(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield AppDataSource_1.default.manager.findOne(entity_1.Users, {
                where: {
                    nickname: nickname
                }
            });
            return result;
        });
    }
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield AppDataSource_1.default.manager.findOne(entity_1.Users, {
                where: {
                    id: userId,
                }
            });
            return result;
        });
    }
    static getAllUserByNickName(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AppDataSource_1.default.manager.createQueryBuilder()
                .select(`u.id, u.nickname, u.phone, u.password, um.firstName, um.lastName, um.father`)
                .addSelect(`DATE_FORMAT(um.birthday, '%Y-%m-%d') as birthday`)
                .addSelect('CONCAT(um.firstName, um.lastName, um.father) as fullName')
                .from(entity_1.Users, 'u')
                .leftJoin(entity_1.UserMeta, 'um', 'um.user_id = u.id')
                .where('u.nickname =:nickname', { nickname })
                // .andWhere('u.password =:password', { password })
                .andWhere('u.active =:status', { status: 1 })
                .getRawOne();
        });
    }
}
exports.UserInfo = UserInfo;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users1669314870893 = void 0;
const typeorm_1 = require("typeorm");
class Users1669314870893 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            queryRunner.createTable(new typeorm_1.Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'nickname',
                        type: 'varchar',
                        length: "150"
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: "255"
                    },
                    {
                        name: 'auth_token',
                        type: 'varchar',
                        length: "255"
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        length: "20",
                        isUnique: true,
                    },
                    {
                        name: 'active',
                        type: 'tinyint',
                        width: 1
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP'
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP'
                    }
                ],
            }), true);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.Users1669314870893 = Users1669314870893;

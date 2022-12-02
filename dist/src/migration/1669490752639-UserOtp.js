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
exports.UserOtp1669490752639 = void 0;
const typeorm_1 = require("typeorm");
class UserOtp1669490752639 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            queryRunner.createTable(new typeorm_1.Table({
                name: 'user_otp',
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
                        name: 'user_id',
                        type: 'int',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'otp_code',
                        type: 'mediumint',
                        width: 6,
                    },
                    {
                        name: 'otp_expiry',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'otp_status',
                        type: 'tinyint',
                        width: 1,
                    },
                    {
                        name: 'otp_retry_count',
                        type: 'tinyint',
                        width: 1,
                    }
                ]
            }), true);
            queryRunner.clearSqlMemory();
            const foreignKey = new typeorm_1.TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            });
            yield queryRunner.createForeignKey("user_otp", foreignKey);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.UserOtp1669490752639 = UserOtp1669490752639;

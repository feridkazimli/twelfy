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
exports.RefreshToken1669828428459 = void 0;
const typeorm_1 = require("typeorm");
class RefreshToken1669828428459 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            queryRunner.createTable(new typeorm_1.Table({
                name: 'refresh_token_list',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: 'user_id',
                        type: 'int'
                    },
                    {
                        name: 'rfrsh_token',
                        type: 'text'
                    }
                ]
            }), true);
            queryRunner.clearSqlMemory();
            const foreignKey = new typeorm_1.TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            yield queryRunner.createForeignKey("refresh_token_list", foreignKey);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.RefreshToken1669828428459 = RefreshToken1669828428459;

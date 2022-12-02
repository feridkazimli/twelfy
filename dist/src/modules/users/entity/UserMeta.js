"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMeta = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let UserMeta = class UserMeta {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, typeorm_1.Column)({
        type: 'int',
        primary: true,
        unique: true,
        generated: true
    }),
    __metadata("design:type", Number)
], UserMeta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Users_1.Users, (user) => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({
        referencedColumnName: 'id',
        name: 'user_id'
    }),
    __metadata("design:type", Users_1.Users)
], UserMeta.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: '150'
    }),
    __metadata("design:type", String)
], UserMeta.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: '150'
    }),
    __metadata("design:type", String)
], UserMeta.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: '150'
    }),
    __metadata("design:type", String)
], UserMeta.prototype, "father", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    }),
    __metadata("design:type", Date)
], UserMeta.prototype, "birthday", void 0);
UserMeta = __decorate([
    (0, typeorm_1.Entity)('user_meta')
], UserMeta);
exports.UserMeta = UserMeta;

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
exports.UserOtp = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let UserOtp = class UserOtp {
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
], UserOtp.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Users_1.Users, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({
        referencedColumnName: 'id',
        name: 'user_id'
    }),
    __metadata("design:type", Users_1.Users)
], UserOtp.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'mediumint',
        width: 6
    }),
    __metadata("design:type", Number)
], UserOtp.prototype, "otp_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        nullable: false,
        default: () => 'now()'
    }),
    __metadata("design:type", Date)
], UserOtp.prototype, "otp_expiry", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        width: 1,
    }),
    __metadata("design:type", Number)
], UserOtp.prototype, "otp_status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        width: 1
    }),
    __metadata("design:type", Number)
], UserOtp.prototype, "otp_retry_count", void 0);
UserOtp = __decorate([
    (0, typeorm_1.Entity)('user_otp')
], UserOtp);
exports.UserOtp = UserOtp;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
var typeorm_1 = require("typeorm");
var posts_entity_1 = require("./posts.entity");
var UserEntity = exports.UserEntity = /** @class */ (function () {
    function UserEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], UserEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', unique: true })
    ], UserEntity.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)('text')
    ], UserEntity.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)('integer')
    ], UserEntity.prototype, "age", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true })
    ], UserEntity.prototype, "info", void 0);
    __decorate([
        (0, typeorm_1.Column)('json')
    ], UserEntity.prototype, "address", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return posts_entity_1.PostEntity; }, function (post) { return post.user; }),
        (0, typeorm_1.JoinColumn)({ name: 'userId' })
    ], UserEntity.prototype, "posts", void 0);
    UserEntity = __decorate([
        (0, typeorm_1.Entity)('User')
    ], UserEntity);
    return UserEntity;
}());

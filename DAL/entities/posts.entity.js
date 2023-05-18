"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostEntity = void 0;
var typeorm_1 = require("typeorm");
var users_entity_1 = require("./users.entity");
var PostEntity = exports.PostEntity = /** @class */ (function () {
    function PostEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], PostEntity.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp', default: function () { return 'CURRENT_TIMESTAMP'; } })
    ], PostEntity.prototype, "dateCreation", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: false })
    ], PostEntity.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: false })
    ], PostEntity.prototype, "text", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'integer', nullable: false })
    ], PostEntity.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return users_entity_1.UserEntity; }, function (user) { return user.posts; }),
        (0, typeorm_1.JoinColumn)({ name: 'userId' })
    ], PostEntity.prototype, "user", void 0);
    PostEntity = __decorate([
        (0, typeorm_1.Entity)('Post')
    ], PostEntity);
    return PostEntity;
}());

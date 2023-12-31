"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const http_exception_filter_1 = require("./common/filter/http-exception.filter");
const mobile_module_1 = require("./common/modules/mobile.module");
const users_module_1 = require("./common/modules/users.module");
const auth_module_1 = require("./common/modules/auth.module");
const comment_module_1 = require("./common/modules/comment.module");
const utils_module_1 = require("./common/modules/utils.module");
const upload_module_1 = require("./common/modules/upload.module");
const jwt_1 = require("@nestjs/jwt");
const Axios_module_1 = require("./common/modules/Axios.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            jwt_1.JwtModule.registerAsync({
                useFactory: () => ({
                    secret: process.env.CLIENT_SECRETE,
                }),
            }),
            mongoose_1.MongooseModule.forRoot(process.env.DB),
            Axios_module_1.AxiosModule,
            mobile_module_1.MobileModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            comment_module_1.CommentModule,
            utils_module_1.UtilsModule,
            upload_module_1.UploadModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
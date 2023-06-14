"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const validation_pipe_1 = require("./common/pipes/validation.pipe");
const admin = require("firebase-admin");
const configuration_1 = require("./config/configuration");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use((0, helmet_1.default)());
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    app.setGlobalPrefix('api');
    const { firebase, storageBucket } = (0, configuration_1.config)();
    admin.initializeApp({
        credential: admin.credential.cert(firebase),
        storageBucket: storageBucket,
    });
    await app.listen(process.env.PORT || 5000, async () => {
        console.log('listening on port ' + (await app.getUrl()));
    });
}
bootstrap();
//# sourceMappingURL=main.js.map
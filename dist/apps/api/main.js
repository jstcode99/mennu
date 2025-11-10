"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_module_1 = require("./infrastructure/config/app.module");
const core_1 = require("@nestjs/core");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
        ],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    await app.listen(3000);
    console.log('🚀 App corriendo en http://localhost:3000');
}
bootstrap();

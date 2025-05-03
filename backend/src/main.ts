import {NestFactory} from '@nestjs/core';
import {DataSource} from "typeorm";
import {AppModule} from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const connection = app.get(DataSource);
    await connection.initialize();

    // Example: Seed data here
    // const repo = connection.getRepository(YourEntity);
    // await repo.save([{...}]);

    await app.listen(3000);
}
bootstrap();

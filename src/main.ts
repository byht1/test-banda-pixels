import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;

  const app = await NestFactory.create(AppModule, { cors: true });

  // app.enableCors();
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Музикальна платформа')
    .setDescription('Документація REST API')
    .setVersion('0.0.1')
    .addServer('http://localhost:5000')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(PORT, () =>
    console.log(`server start http://localhost:${PORT}/docs`),
  );
}
bootstrap();

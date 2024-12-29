import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let allowedOrigins = process.env.CORS_ORIGINS?.split(',') || '*';

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,PUT,POST,DELETE',
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('API Pública')
    .setDescription('Documentación de la API Task management')
    .setVersion('1.0')
    .setContact(
      'Diego Sagredo',
      'https://github.com/diegosagredo911',
      'sagredodhiego@gmail.com',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
  console.log(
    `corriendo en : http://localhost:${process.env.PORT ?? 3001}/api/docs`,
  );
}
bootstrap();

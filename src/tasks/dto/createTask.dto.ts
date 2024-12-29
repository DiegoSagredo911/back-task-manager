import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateTask {
  @ApiProperty({ description: 'El título de la tarea' }) // Documentación de Swagger
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Descripción de la tarea (opcional)',
    required: false,
  }) // Documentación de Swagger
  @IsOptional()
  @IsString()
  description?: string;
}

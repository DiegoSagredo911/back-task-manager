import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateTask {
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

  @ApiProperty({
    description: 'Estado de la tarea (opcional)',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: true | false;
}

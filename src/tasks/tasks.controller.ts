import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.schema';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { CreateTask } from './dto/createTask.dto';
import { UpdateTask } from './dto/updateTask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiBody({
    type: CreateTask,
    description: 'Crea una nueva tarea con título y descripción opcional',
  })
  async createTask(
    @Body() taskData: Task,
  ): Promise<{ status: number; message: string }> {
    return this.tasksService.createTask(taskData);
  }

  @Get()
  @ApiQuery({
    name: 'completed',
    required: false, // El parámetro es opcional
    description:
      'Filtrar tareas por estado de completado. Puede ser "completed" o "pending".',
    enum: ['completed', 'pending'], // Valores permitidos
    example: 'completed', // Ejemplo de valor para mostrar en Swagger
  })
  async getAllTasks(@Query('completed') completed: string) {
    return this.tasksService.getAllTasks(completed);
  }
  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }
  @Put(':id')
  @ApiBody({
    type: UpdateTask,
    description: 'Actualiza una tarea con título, descripción y estado',
  })
  async updateTask(
    @Param('id') id: string,
    @Body() task: Task,
  ): Promise<{ status: number; message: string }> {
    return this.tasksService.updateTask(id, task);
  }
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}

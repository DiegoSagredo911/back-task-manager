import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { log } from 'console';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getAllTasks(completed): Promise<Task[]> {
    try {
      if (completed != undefined) {
        if (completed !== 'completed' && completed !== 'pending') {
          throw new HttpException('Estado no válido', 400);
        }
        const completedConvert = completed == 'completed' ? true : false;
        return await this.taskModel
          .find({ completed: completedConvert })
          .sort({ createdAt: -1 })
          .exec();
      }

      return await this.taskModel.find().sort({ createdAt: -1 }).exec();
    } catch (error) {
      throw new HttpException('Error al Listar las tarea', 500);
    }
  }

  async getTaskById(id: string): Promise<Task> {
    if (typeof id !== 'string') {
      throw new HttpException('Id no válida', 400);
    }
    const task = await this.taskModel
      .findById(id)
      .exec()
      .catch((err) => {
        log(err.message);
        throw new HttpException('Tarea no encontrada', 404);
      });
    return task;
  }

  async createTask(task: Task): Promise<{ status: number; message: string }> {
    if (!task.title || task.title.length == 0) {
      throw new HttpException('El título es requerido', 400);
    }
    delete task.createdAt;
    delete task._id;
    const newTask = new this.taskModel(task);
    await newTask.save().catch((err) => {
      log(err.message);
      throw new HttpException('Error al crear la tarea', 500);
    });
    return { status: 201, message: 'Tarea creada' };
  }

  async updateTask(
    id: string,
    task: Task,
  ): Promise<{ status: number; message: string }> {
    delete task.createdAt;
    delete task._id;
    await this.taskModel
      .findByIdAndUpdate(id, task)
      .exec()
      .catch((err) => {
        log('el error fue' + err.message);
        if (err.name === 'CastError') {
          throw new HttpException('id no encontrada', 400);
        } else if (err.name === 'ValidationError') {
          throw new HttpException('Error en los datos', 400);
        } else {
          throw new HttpException('Error al actualizar la tarea', 500);
        }
      });
    return { status: 200, message: 'Tarea actualizada' };
  }

  async deleteTask(id: string): Promise<{ status: number; message: string }> {
    if (typeof id !== 'string') {
      throw new HttpException('Id no válida', 400);
    }
    await this.taskModel
      .findByIdAndDelete(id)
      .exec()
      .catch((err) => {
        log(err.message);
        throw new HttpException('Tarea no encontrada', 404);
      });
    return { status: 200, message: 'Tarea eliminada' };
  }
}

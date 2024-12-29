import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTaskModel = {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
    sort: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getModelToken('Task'),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería crear una tarea', async () => {
    const createTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
      completed: false,
    };
    const result = { status: 201, message: 'Tarea creada' };
    jest.spyOn(service, 'createTask').mockResolvedValue(result);

    expect(await controller.createTask(createTaskDto)).toBe(result);
  });

  it('debería listar todas las tarea', async () => {
    const tasks = [
      { title: 'Task 1', description: 'Description 1', completed: false },
    ];
    jest.spyOn(service, 'getAllTasks').mockResolvedValue(tasks);

    expect(await controller.getAllTasks('completed')).toBe(tasks);
  });

  it('debería obtener la tarea con id 1', async () => {
    const task = {
      _id: '1',
      title: 'Test Tarea',
      description: 'Test Descripcion',
      completed: false,
    };
    jest.spyOn(service, 'getTaskById').mockResolvedValue(task);

    expect(await controller.getTaskById('1')).toBe(task);
  });

  it('debería actualizar una tarea', async () => {
    const updateTaskDto = {
      title: 'Actualizar Tarea',
      description: 'Actualizar Description',
    };
    const result = { status: 200, message: 'Tarea actualizada' };
    jest.spyOn(service, 'updateTask').mockResolvedValue(result);

    expect(await controller.updateTask('1', updateTaskDto)).toBe(result);
  });

  it('debería eliminar una tarea', async () => {
    const result = { status: 200, message: 'Tarea eliminada' };
    jest.spyOn(service, 'deleteTask').mockResolvedValue(result);

    expect(await controller.deleteTask('1')).toBe(result);
  });
});

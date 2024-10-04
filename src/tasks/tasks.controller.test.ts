import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { TasksController } from './tasks.controller';
import { TaskStatus } from './tasks-status.enum';
import { TasksService } from './tasks.service';
import { Task } from './tasks.schema';

describe('TasksController', () => {
    let tasksController: TasksController;
    let tasksService: {
        create: jest.Mock<Promise<Task>>;
        findAll: jest.Mock<Promise<Task[]>>;
        findOne: jest.Mock<Promise<Task | null>>;
        update: jest.Mock<Promise<Task>>;
        remove: jest.Mock<Promise<void>>;
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [
                {
                    provide: TasksService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        tasksController = module.get<TasksController>(TasksController);
        tasksService = module.get<TasksService>(TasksService);
    });

    describe('create', () => {
        it('should create a task', async () => {
            const createTaskDto: CreateTaskDto = {
                title: 'Test Task',
                description: 'Test Description',
                status: TaskStatus.TODO,
            };
            const result: Task = { id: '1', ...createTaskDto }; // Assurez-vous que l'id est inclus

            jest.spyOn(tasksService, 'create').mockResolvedValueOnce(result);

            expect(await tasksController.create(createTaskDto)).toBe(result);
        });
    });

    describe('findAll', () => {
        it('should return an array of tasks', async () => {
            const result: Task[] = [
                { id: '1', title: 'Test Task', description: 'Test Description', status: TaskStatus.TODO },
            ];

            jest.spyOn(tasksService, 'findAll').mockResolvedValueOnce(result);

            expect(await tasksController.findAll()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('should return a single task', async () => {
            const result: Task = {
                id: '1',
                title: 'Test Task',
                description: 'Test Description',
                status: TaskStatus.TODO,
            };

            jest.spyOn(tasksService, 'findOne').mockResolvedValueOnce(result);

            expect(await tasksController.findOne('1')).toBe(result);
        });
    });

    describe('update', () => {
        it('should update a task', async () => {
            const updateTaskDto: UpdateTaskDto = {
                title: 'Updated Task',
                description: 'Updated Description',
                status: TaskStatus.IN_PROGRESS,
            };
            const result: Task = { id: '1', ...updateTaskDto };

            jest.spyOn(tasksService, 'update').mockResolvedValueOnce(result);

            expect(await tasksController.update('1', updateTaskDto)).toBe(result);
        });
    });

    describe('remove', () => {
        it('should remove a task', async () => {
            jest.spyOn(tasksService, 'remove').mockResolvedValueOnce();

            expect(await tasksController.remove('1')).toBeUndefined();
        });
    });
});

// Tests d'intégration
describe('TasksController Integration', () => {
    let app: INestApplication;
    let tasksService = {
        create: jest.fn().mockResolvedValue({ id: '1', title: 'Test Task', description: 'Test Description', status: TaskStatus.TODO }),
        findAll: jest.fn().mockResolvedValue([{ id: '1', title: 'Test Task', description: 'Test Description', status: TaskStatus.TODO }]),
        findOne: jest.fn().mockResolvedValue({ id: '1', title: 'Test Task', description: 'Test Description', status: TaskStatus.TODO }),
        update: jest.fn().mockResolvedValue({ id: '1', title: 'Updated Task', description: 'Updated Description', status: TaskStatus.IN_PROGRESS }),
        remove: jest.fn().mockResolvedValue(undefined),
    };

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [TasksController],
            providers: [
                {
                    provide: TasksService,
                    useValue: tasksService,
                },
            ],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it('/POST tasks', () => {
        return request(app.getHttpServer())
            .post('/tasks')
            .send({ title: 'Test Task', description: 'Test Description', status: TaskStatus.TODO })
            .expect(201)
            .expect(tasksService.create.mock.results[0].value); // Récupère le résultat du mock
    });

    it('/GET tasks', () => {
        return request(app.getHttpServer())
            .get('/tasks')
            .expect(200)
            .expect(tasksService.findAll.mock.results[0].value);
    });

    it('/GET tasks/:id', () => {
        return request(app.getHttpServer())
            .get('/tasks/1')
            .expect(200)
            .expect(tasksService.findOne.mock.results[0].value);
    });

    it('/PUT tasks/:id', () => {
        return request(app.getHttpServer())
            .put('/tasks/1')
            .send({ title: 'Updated Task', description: 'Updated Description', status: TaskStatus.IN_PROGRESS })
            .expect(200)
            .expect(tasksService.update.mock.results[0].value);
    });

    it('/DELETE tasks/:id', () => {
        return request(app.getHttpServer())
            .delete('/tasks/1')
            .expect(200)
            .expect(tasksService.remove.mock.results[0].value);
    });

    afterAll(async () => {
        await app.close();
    });
});

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { TasksService } from './tasks.service';
import { Task } from './tasks.schema';

// src/tasks/tasks.controller.ts

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.tasksService.create(createTaskDto);
    return task; // Assurez-vous que l'ID est inclus dans l'objet retourné
  }

  @Get()
  async findAll(): Promise<Task[]> {
    const tasks = await this.tasksService.findAll();
    return tasks; // Toutes les tâches, y compris leurs IDs
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    const task = await this.tasksService.findOne(id);
    return task; // La tâche avec l'ID fourni
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.tasksService.update(id, updateTaskDto);
    return updatedTask; // La tâche mise à jour, y compris l'ID
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.tasksService.remove(id);
    return; // Aucune réponse nécessaire, mais vous pouvez gérer des messages ici si besoin
  }
}

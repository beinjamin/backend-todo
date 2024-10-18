/**
 * TasksService - Service responsable de la gestion des tâches (CRUD) en interaction avec la base de données MongoDB.
 * Utilise Mongoose pour effectuer les opérations sur les documents de la collection 'tasks'.
 * Chaque méthode gère une partie spécifique du cycle de vie d'une tâche (création, récupération, mise à jour, suppression).
 * Les exceptions comme NotFoundException sont levées lorsque les opérations échouent.
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { Task, TaskDocument } from './tasks.schema';

@Injectable()
export class TasksService {
  // Injection du modèle Mongoose pour effectuer des opérations sur les documents Task.
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  /**
   * Crée une nouvelle tâche dans la base de données à partir des données reçues.
   * @param createTaskDto - Contient les informations nécessaires pour créer une tâche.
   * @returns La tâche nouvellement créée.
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  /**
   * Récupère toutes les tâches présentes dans la base de données.
   * @returns Un tableau de tâches.
   */
  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  /**
   * Récupère une tâche spécifique par son ID.
   * @param id - L'identifiant unique de la tâche à rechercher.
   * @returns La tâche trouvée ou lève une exception si non trouvée.
   * @throws NotFoundException - Si la tâche avec l'ID spécifié n'existe pas.
   */
  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  /**
   * Met à jour une tâche existante par son ID avec les nouvelles données fournies.
   * @param id - L'identifiant de la tâche à mettre à jour.
   * @param updateTaskDto - Les nouvelles données pour mettre à jour la tâche.
   * @returns La tâche mise à jour ou lève une exception si non trouvée.
   * @throws NotFoundException - Si la tâche avec l'ID spécifié n'existe pas.
   */
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return updatedTask;
  }

  /**
   * Supprime une tâche spécifique par son ID.
   * @param id - L'identifiant de la tâche à supprimer.
   * @throws NotFoundException - Si la tâche avec l'ID spécifié n'existe pas.
   */
  async remove(id: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}

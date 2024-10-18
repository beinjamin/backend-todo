/**
 * TasksController gère les opérations CRUD (Create, Read, Update, Delete) pour les tâches.
 * Il expose des endpoints RESTful permettant d'interagir avec les tâches via HTTP.
 * Le contrôleur utilise TasksService pour effectuer les opérations sur les données.
 * 
 * @Controller('tasks') : Indique que cette classe est un contrôleur et gère les requêtes envoyées à l'endpoint '/tasks'.
 */
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';

@Controller('tasks')
export class TasksController {
  // Injection de dépendance : le service TasksService est injecté pour gérer la logique métier
  constructor(private readonly tasksService: TasksService) {}

  /**
   * @Get() - Endpoint pour récupérer toutes les tâches.
   * Correspond à une requête GET sur '/tasks'.
   * Retourne toutes les tâches en utilisant le service TasksService.
   */
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  /**
   * @Get(':id') - Endpoint pour récupérer une tâche spécifique par son ID.
   * Correspond à une requête GET sur '/tasks/:id'.
   * @param id - L'identifiant de la tâche à récupérer.
   * Retourne la tâche correspondant à l'ID fourni.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  /**
   * @Post() - Endpoint pour créer une nouvelle tâche.
   * Correspond à une requête POST sur '/tasks'.
   * @param createTaskDto - Les données de la nouvelle tâche à créer.
   * Utilise le service pour créer une tâche et retourne la tâche créée.
   */
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  /**
   * @Put(':id') - Endpoint pour mettre à jour une tâche existante par son ID.
   * Correspond à une requête PUT sur '/tasks/:id'.
   * @param id - L'identifiant de la tâche à mettre à jour.
   * @param updateTaskDto - Les nouvelles données de la tâche.
   * Utilise le service pour mettre à jour la tâche et retourne la tâche mise à jour.
   */
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  /**
   * @Delete(':id') - Endpoint pour supprimer une tâche par son ID.
   * Correspond à une requête DELETE sur '/tasks/:id'.
   * @param id - L'identifiant de la tâche à supprimer.
   * Utilise le service pour supprimer la tâche et retourne une confirmation de suppression.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}

/**
 * TasksModule - Module responsable de la gestion des tâches dans l'application NestJS.
 * 
 * Un module dans NestJS regroupe un ensemble cohérent de fonctionnalités, incluant des contrôleurs, des services et éventuellement d'autres composants. 
 * Ici, le module Tasks encapsule la logique des tâches et lie les différents composants nécessaires à leur gestion (controller et service).
 * 
 * - controllers: Le contrôleur (TasksController) gère les requêtes HTTP entrantes pour les tâches.
 * - providers: Le service (TasksService) contient la logique métier pour manipuler les tâches.
 * 
 * Ce module peut être importé dans d'autres modules de l'application pour réutiliser la logique associée aux tâches.
 */
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  // Liste des contrôleurs responsables de gérer les requêtes liées aux tâches.
  controllers: [TasksController],
  
  // Liste des services injectables qui fournissent la logique métier pour la gestion des tâches.
  providers: [TasksService],
})
export class TasksModule {}

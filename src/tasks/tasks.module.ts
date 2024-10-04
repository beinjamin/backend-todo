// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task, TaskSchema } from './tasks.schema'; // Importer le schéma

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]), // Enregistrer le schéma Mongoose
    ],
    controllers: [TasksController], // Enregistrer le contrôleur
    providers: [TasksService], // Enregistrer le service
})
export class TasksModule { }

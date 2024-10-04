// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task, TaskSchema } from './tasks.schema'; // Importer le sch�ma

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]), // Enregistrer le sch�ma Mongoose
    ],
    controllers: [TasksController], // Enregistrer le contr�leur
    providers: [TasksService], // Enregistrer le service
})
export class TasksModule { }

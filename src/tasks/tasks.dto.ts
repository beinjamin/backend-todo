// src/tasks/tasks.dto.ts
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from './tasks-status.enum'; // Assurez-vous d'importer l'enum ici

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(TaskStatus) // Utilisation de l'enum
    status: TaskStatus; // Utilisation de l'enum
}

export class UpdateTaskDto {
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsEnum(TaskStatus) // Utilisation de l'enum
    status?: TaskStatus; // Utilisation de l'enum
}

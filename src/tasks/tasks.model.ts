import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// src/tasks/tasks.model.ts

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  status: string;

  // L'ID est ajouté comme propriété optionnelle
  id?: string; // Cela est nécessaire pour TypeScript
}

export const TaskSchema = SchemaFactory.createForClass(Task);

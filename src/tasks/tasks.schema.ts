/**
 * Task - Classe représentant le schéma d'une tâche dans MongoDB.
 * Chaque instance de la classe Task correspond à un document dans la collection 'tasks'.
 * Utilise les décorateurs @Schema et @Prop de Mongoose pour définir la structure et les règles de validation.
 * 
 * TaskDocument - Type utilisé pour combiner Task et Document de Mongoose, ce qui permet d'inclure les fonctionnalités Mongoose comme l'accès aux méthodes et propriétés des documents.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// TaskDocument représente le type d'un document Task avec les propriétés Mongoose ajoutées.
export type TaskDocument = Task & Document;

@Schema() // Décorateur indiquant que cette classe est un schéma Mongoose.
export class Task {
  /**
   * @Prop() - Champ "title" obligatoire pour chaque tâche.
   * Définit le titre de la tâche, qui est requis dans chaque document.
   */
  @Prop({ required: true })
  title: string;

  /**
   * @Prop() - Champ "description" facultatif pour chaque tâche.
   * Peut contenir une description détaillée de la tâche.
   */
  @Prop()
  description: string;

  /**
   * @Prop() - Champ "createdAt" avec une valeur par défaut définie à la date actuelle.
   * Utilisé pour stocker la date de création d'une tâche.
   */
  @Prop({ default: Date.now })
  createdAt: Date;
}

// Génère le schéma Mongoose pour la classe Task en utilisant SchemaFactory.
export const TaskSchema = SchemaFactory.createForClass(Task);

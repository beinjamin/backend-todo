/**
 * Task - Classe représentant le schéma d'une tâche dans MongoDB.
 * 
 * Ce schéma définit la structure des documents de la collection 'tasks', ainsi que les règles de validation pour chaque champ. 
 * La classe utilise les décorateurs @Schema et @Prop de Mongoose pour spécifier les propriétés de la tâche.
 * 
 * TaskDocument - Type combinant Task et Document de Mongoose, permettant d'accéder aux fonctionnalités Mongoose pour manipuler les documents.
 * 
 * Propriétés :
 * - title: Titre de la tâche, obligatoire.
 * - description: Description de la tâche, obligatoire.
 * - status: Statut de la tâche (par exemple, 'open', 'in progress', 'done'), obligatoire.
 * - id: Propriété optionnelle utilisée pour TypeScript afin de faciliter la gestion des objets en mémoire (non stockée dans MongoDB).
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// TaskDocument représente un document Task avec les propriétés Mongoose ajoutées.
export type TaskDocument = Task & Document;

@Schema() // Décorateur indiquant que cette classe est un schéma Mongoose.
export class Task {
  /**
   * @Prop() - Champ "title" obligatoire.
   * Contient le titre de la tâche, requis pour chaque document.
   */
  @Prop({ required: true })
  title: string;

  /**
   * @Prop() - Champ "description" obligatoire.
   * Contient la description de la tâche, requis pour chaque document.
   */
  @Prop({ required: true })
  description: string;

  /**
   * @Prop() - Champ "status" obligatoire.
   * Indique le statut de la tâche (par exemple, 'open', 'in progress', 'done').
   */
  @Prop({ required: true })
  status: string;

  /**
   * id - Propriété optionnelle.
   * Non stockée dans MongoDB, cette propriété est utilisée uniquement pour le typage dans TypeScript.
   */
  id?: string;
}

// Génère le schéma Mongoose à partir de la classe Task.
export const TaskSchema = SchemaFactory.createForClass(Task);

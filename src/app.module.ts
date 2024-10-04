import { TasksModule } from 'tasks/tasks.module';
import { Module } from '@nestjs/common';

import { ModelModule } from './model/model.module';
import { UsersModule } from './users/users.module';
import { ListsModule } from './lists/lists.module';
import { ItemsModule } from './items/items.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ModelModule,
    UsersModule,
    ListsModule,
    ItemsModule,
    TasksModule,

  ],
  controllers: [
    AppController,
  ],
  components: [],
})
export class AppModule {}

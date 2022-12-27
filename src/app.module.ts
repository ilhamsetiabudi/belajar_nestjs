import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity, todoItem } from './entity/index';
import { ActivityService } from './modules/activity/activity.service';
import { todoItemService } from './modules/todoItem/todo.service';
import { todoController } from './modules/todoItem/todo.controller';
import { ActivityController } from './modules/activity/activity.controller';
import { createConnection } from './helper/typeorm/typeorm';
import { setEnv, mysql } from './config';
@Module({
  imports: [
    setEnv(),
    createConnection(mysql()),
    TypeOrmModule.forFeature([Activity, todoItem]),
  ],
  controllers: [AppController, ActivityController, todoController],
  providers: [AppService, ActivityService, todoItemService],
})
export class AppModule {}

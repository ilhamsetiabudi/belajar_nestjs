import {
  Body,
  Controller,
  HttpStatus,
  Post,
  HttpException,
  Get,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateTodoItem } from './create-todoItem.dto';
import { todoItemService } from './todo.service';
import { error, success } from '../../helper/response-handling/response';
import { createTodo, updateTodo } from './validation';

@Controller('todo-items')
export class todoController {
  constructor(private readonly todoService: todoItemService) {}

  @Post('')
  async create(@Body() data: CreateTodoItem) {
    const valid = createTodo.validate(data);
    if (valid.error) {
      throw new HttpException(
        error(valid.error.message, 'Bad Request'),
        HttpStatus.BAD_REQUEST,
      );
    }
    const insert: any = await this.todoService.createOne(valid.value);
    if (insert.err) {
      throw new HttpException(
        error(insert.message, 'Bad Request'),
        HttpStatus.BAD_REQUEST,
      );
    }
    delete insert.data.deleted_at;
    return success(insert.data, 'Success');
  }

  @Get('')
  async get(@Query('activity_group_id') activity_group_id: string) {
    const parameter: any = {};
    if (activity_group_id) {
      parameter.activity_group_id = activity_group_id;
    }
    const find = await this.todoService.findAll(parameter);
    if (find.err) {
      return success([], 'Success');
    }
    return success(find.data, 'Success');
  }

  @Get(':id')
  async getOne(@Param('id') id: any) {
    const find = await this.todoService.findOne({ activity_group_id: id });
    if (find.err) {
      throw new HttpException(
        error(`Activity Group with ID ${id} Not Found`, 'Not Found'),
        HttpStatus.NOT_FOUND,
      );
    }
    return success(find.data, 'Success');
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const find = await this.todoService.findOne({ activity_group_id: id });
    if (find.err) {
      throw new HttpException(
        error(`Activity Group with ID ${id} Not Found`, 'Not Found'),
        HttpStatus.NOT_FOUND,
      );
    }
    const valid = updateTodo.validate(data);
    if (valid.error) {
      throw new HttpException(
        error(valid.error.message, 'Bad Request'),
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.todoService.updateOne(id, { title: valid.value.title });
    find.data.title = valid.value.title;
    find.data.updated_at = new Date();
    return success(find.data, 'Success');
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const find = await this.todoService.findOne({ activity_group_id: id });
    if (find.err) {
      throw new HttpException(
        error(`Activity Group with ID ${id} Not Found`, 'Not Found'),
        HttpStatus.NOT_FOUND,
      );
    }
    await this.todoService.updateOne(id, { deleted_at: new Date() });
    return success({}, 'Success');
  }
}

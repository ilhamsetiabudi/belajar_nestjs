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
} from '@nestjs/common';
import { CreateActivity } from './create-activity.dto';
import { ActivityService } from './activity.service';
import { error, success } from '../../helper/response-handling/response';
import { createActivity, updateActivity } from './validation';

@Controller('activity-groups')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post('')
  async create(@Body() data: CreateActivity) {
    const valid = createActivity.validate(data);
    if (valid.error) {
      throw new HttpException(
        error(valid.error.message, 'Bad Request'),
        HttpStatus.BAD_REQUEST,
      );
    }
    const insert: any = await this.activityService.createOne(valid.value);
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
  async get() {
    const find = await this.activityService.findAll({});
    if (find.err) {
      return success([], 'Success');
    }
    return success(find.data, 'Success');
  }

  @Get(':id')
  async getOne(@Param('id') id: any) {
    const find = await this.activityService.findOne(id);
    if (find.err) {
      throw new HttpException(
        error(`Activity with ID ${id} Not Found`, 'Not Found'),
        HttpStatus.NOT_FOUND,
      );
    }
    return success(find.data, 'Success');
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const find = await this.activityService.findOne(id);
    if (find.err) {
      throw new HttpException(
        error(`Activity with ID ${id} Not Found`, 'Not Found'),
        HttpStatus.NOT_FOUND,
      );
    }
    const valid = updateActivity.validate(data);
    if (valid.error) {
      throw new HttpException(
        error(valid.error.message, 'Bad Request'),
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.activityService.updateOne(id, { title: valid.value.title });
    find.data.title = valid.value.title;
    find.data.updated_at = new Date();
    return success(find.data, 'Success');
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const find = await this.activityService.findOne(id);
    if (find.err) {
      throw new HttpException(
        error(`Activity with ID ${id} Not Found`, 'Not Found'),
        HttpStatus.NOT_FOUND,
      );
    }
    await this.activityService.updateOne(id, { deleted_at: new Date() });
    return success({}, 'Success');
  }
}

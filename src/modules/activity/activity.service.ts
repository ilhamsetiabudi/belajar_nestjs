import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '../../entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async createOne(payload: any) {
    const create: any = await this.activityRepository.save(payload);
    if (!create) {
      return { err: true, data: null };
    } else {
      return { err: false, data: create };
    }
  }

  async findAll(parameter: any) {
    const find: any = await this.activityRepository.find(parameter);
    if (find.length < 1) {
      return { err: true, data: null };
    } else {
      return { err: false, data: find };
    }
  }

  async findOne(id: string) {
    const find: any = await this.activityRepository.findOne({ where: { id } });
    if (!find) {
      return { err: true, data: null };
    } else {
      return { err: false, data: find };
    }
  }

  async updateOne(id: string, payload: object) {
    await this.activityRepository.update({ id }, payload);
  }

  delete(id: string) {
    return this.activityRepository.delete(id);
  }
}

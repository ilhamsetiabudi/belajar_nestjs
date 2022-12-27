import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { todoItem } from '../../entity';

@Injectable()
export class todoItemService {
  constructor(
    @InjectRepository(todoItem)
    private readonly todoRepository: Repository<todoItem>,
  ) {}

  async createOne(payload: any) {
    const create: any = await this.todoRepository.save(payload);
    if (!create) {
      return { err: true, data: null };
    } else {
      return { err: false, data: create };
    }
  }

  async findAll(parameter: any) {
    const find: any = await this.todoRepository.find({ where: parameter });
    if (find.length < 1) {
      return { err: true, data: null };
    } else {
      return { err: false, data: find };
    }
  }

  async findOne(parameter: any) {
    const find: any = await this.todoRepository.findOne({ where: parameter });
    if (!find) {
      return { err: true, data: null };
    } else {
      return { err: false, data: find };
    }
  }

  async updateOne(id: string, payload: object) {
    await this.todoRepository.update({ id }, payload);
  }

  delete(id: string) {
    return this.todoRepository.delete(id);
  }
}

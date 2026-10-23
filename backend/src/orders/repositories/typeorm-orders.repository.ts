import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import type { IOrdersRepository } from './orders.repository.interface';

@Injectable()

export class TypeOrmOrdersRepository implements IOrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async create(order: Partial<Order>): Promise<Order> {
    const newOrder = this.repository.create(order);
    return this.repository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    return this.repository.find({
      relations: {
        produtos: true,
      },

    });

  }
  async findById(id: number): Promise<Order | null> {
    return this.repository.findOne({
        where: { id },
        relations: {
            produtos: true,
        },
    });
  }
  async save(order: Order): Promise<Order> {
    return this.repository.save(order); 
  }
}
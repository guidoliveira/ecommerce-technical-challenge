import type { Order } from '../entities/order.entity';

export interface IOrdersRepository {

  create(order: Partial<Order>): Promise<Order>;

  findAll(): Promise<Order[]>;
  findById(id: number): Promise<Order | null>;
  save(order: Order): Promise<Order>;

}
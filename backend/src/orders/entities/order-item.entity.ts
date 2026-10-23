import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from '../../products/entities/product.entity';

import { Order } from './order.entity';

@Entity('order_items')

export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Order, (order) => order.produtos, {
    onDelete: 'CASCADE',
  })

  order: Order;

  @ManyToOne(() => Product, {
    eager: true,
  })

  produto: Product;

  @Column({ type: 'int' })

  quantidade: number;

  @Column({
    name: 'preco_unitario',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  precoUnitario: number;
}
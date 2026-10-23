import {

  Column,

  Entity,

  OneToMany,

  PrimaryGeneratedColumn,

} from 'typeorm';

import { OrderStatus } from '../enums/order-status.enum';

import { OrderItem } from './order-item.entity';

@Entity('orders')

export class Order {

  @PrimaryGeneratedColumn()

  id: number;

  @OneToMany(() => OrderItem, (item: OrderItem) => item.order, {

    cascade: true,

  })

  produtos: OrderItem[];

  @Column({

    name: 'total_pedido',

    type: 'decimal',

    precision: 10,

    scale: 2,

  })

  totalPedido: number;

  @Column({

    type: 'enum',

    enum: OrderStatus,

    default: OrderStatus.PENDENTE,

  })

  status: OrderStatus;

}
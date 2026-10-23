import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ORDERS_REPOSITORY_TOKEN } from './repositories/orders.repository.token';
import { TypeOrmOrdersRepository } from './repositories/typeorm-orders.repository';
import { AuthModule } from '../auth/auth.module';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      Product,
    ]),
      AuthModule,
  ],

  controllers: [OrdersController],

  providers: [
    OrdersService,
    TypeOrmOrdersRepository,
    {
      provide: ORDERS_REPOSITORY_TOKEN,
      useExisting: TypeOrmOrdersRepository,
    },
  ],
})

export class OrdersModule {}
import {

  BadRequestException,
  Inject,
  Injectable, 
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderStatus } from './enums/order-status.enum';
import type { IOrdersRepository } from './repositories/orders.repository.interface';
import { ORDERS_REPOSITORY_TOKEN } from './repositories/orders.repository.token';

@Injectable()

export class OrdersService {

  constructor(
    @Inject(ORDERS_REPOSITORY_TOKEN)
    private readonly ordersRepository: IOrdersRepository,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {

    const itens: OrderItem[] = [];
    let totalPedido = 0;
    for (const itemDto of createOrderDto.produtos) {
      const produto = await this.productsRepository.findOne({
        where: {
          id: itemDto.produtoId,
        },
      });

      if (!produto) {
        throw new NotFoundException(
          `Produto ${itemDto.produtoId} não encontrado`,
        );
      }

      if (produto.quantidadeEstoque < itemDto.quantidade) {
        throw new BadRequestException(
          `Estoque insuficiente para o produto ${produto.nome}`,
        );
      }

      const precoUnitario = Number(produto.preco);
      totalPedido += precoUnitario * itemDto.quantidade;
      const item = new OrderItem();
      item.produto = produto;
      item.quantidade = itemDto.quantidade;
      item.precoUnitario = precoUnitario;
      itens.push(item);
    }

    return this.ordersRepository.create({
      produtos: itens,
      totalPedido,
      status: OrderStatus.PENDENTE,
    });
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.findAll();

  }
  async complete(id: number): Promise<Order> {
    const order = await this.ordersRepository.findById(id);
    if (!order) {
        throw new NotFoundException('Pedido não encontrado');

    }

  if (order.status === OrderStatus.CONCLUIDO) {
    throw new BadRequestException('Pedido já está concluído');
    }

  if (order.status === OrderStatus.CANCELADO) {
    throw new BadRequestException('Pedido cancelado não pode ser concluído',);
    }

  for (const item of order.produtos) {
    const produto = await this.productsRepository.findOne({
      where: {
        id: item.produto.id,
      },
    });

    if (!produto) {
        throw new NotFoundException(`Produto ${item.produto.id} não encontrado`,);
    }

    if (produto.quantidadeEstoque < item.quantidade) {
      throw new BadRequestException(`Estoque insuficiente para o produto ${produto.nome}`,
      );

    }
    produto.quantidadeEstoque -= item.quantidade;
    await this.productsRepository.save(produto);

  }

  order.status = OrderStatus.CONCLUIDO;
  return this.ordersRepository.save(order);

}
  async cancel(id: number): Promise<Order> {
  const order = await this.ordersRepository.findById(id);
  if (!order) {
    throw new NotFoundException('Pedido não encontrado');
  }

  if (order.status === OrderStatus.CONCLUIDO) {
    throw new BadRequestException('Pedido concluído não pode ser cancelado',);
  }

  if (order.status === OrderStatus.CANCELADO) {
    throw new BadRequestException('Pedido já está cancelado',);
  }
  order.status = OrderStatus.CANCELADO;
  return this.ordersRepository.save(order);

    }

}
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { OrdersService } from './orders.service';
import { OrderStatus } from './enums/order-status.enum';
import type { IOrdersRepository } from './repositories/orders.repository.interface';
import { ORDERS_REPOSITORY_TOKEN } from './repositories/orders.repository.token';
import {Order} from './entities/order.entity'
import { OrderItem } from './entities/order-item.entity';

describe('OrdersService', () => {
  let service: OrdersService;
  let ordersRepository: jest.Mocked<IOrdersRepository>;
  let productsRepository: jest.Mocked<Repository<Product>>;

  beforeEach(async () => {
    ordersRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
    };

    productsRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<Product>>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: ORDERS_REPOSITORY_TOKEN,
          useValue: ordersRepository,
        },

        {
          provide: getRepositoryToken(Product),
          useValue: productsRepository,
        },
      ],

    }).compile();

    service = module.get<OrdersService>(OrdersService);

  });
  it('deve rejeitar pedido quando o estoque for insuficiente', async () => {

    const produto: Product = {
      id: 2,
      nome: 'Notebook',
      categoria: 'Eletronicos',
      descricao: 'Notebook para desenvolvimento',
      preco: 3500,
      quantidadeEstoque: 2,
    };

    productsRepository.findOne.mockResolvedValue(produto);

    const dto = {
      produtos: [
        {
          produtoId: 2,
          quantidade: 5,
        },
      ],
    };
    await expect(service.create(dto)).rejects.toThrow(
      BadRequestException,
    );

    expect(ordersRepository.create).not.toHaveBeenCalled();

  });
  it('não deve concluir um pedido que já está concluído', async () => {
    const order: Order = {
      id: 1,
      produtos: [],
      totalPedido: 3700,
      status: OrderStatus.CONCLUIDO,
    };

    ordersRepository.findById.mockResolvedValue(order);
    await expect(service.complete(1)).rejects.toThrow(
      BadRequestException,
    );
    expect(ordersRepository.save).not.toHaveBeenCalled();
    expect(productsRepository.save).not.toHaveBeenCalled();
  });
  it('deve diminuir o estoque ao concluir um pedido', async () => {

  const produto: Product = {

    id: 2,

    nome: 'Notebook',

    categoria: 'Eletronicos',

    descricao: 'Notebook para desenvolvimento',

    preco: 3500,

    quantidadeEstoque: 10,

  };

  const order: Order = {

    id: 1,

    produtos: [

      {

        id: 1,

        produto,

        quantidade: 2,

        precoUnitario: 3500,

      } as OrderItem,

    ],

    totalPedido: 7000,

    status: OrderStatus.PENDENTE,

  };

  ordersRepository.findById.mockResolvedValue(order);

  ordersRepository.save.mockResolvedValue({
    ...order,
    status: OrderStatus.CONCLUIDO,
  });

  productsRepository.findOne.mockResolvedValue(produto);

  productsRepository.save.mockResolvedValue(produto);

  const result = await service.complete(1);

  expect(productsRepository.save).toHaveBeenCalledWith(

    expect.objectContaining({

      quantidadeEstoque: 8,

    }),

  );

  expect(result.status).toBe(OrderStatus.CONCLUIDO);

});
});
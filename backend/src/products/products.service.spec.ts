import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PRODUCTS_REPOSITORY_TOKEN } from './repositories/products.repository.token';
import type { IProductsRepository } from './repositories/products.repository.interface';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: jest.Mocked<IProductsRepository>;
  beforeEach(async () => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PRODUCTS_REPOSITORY_TOKEN,
          useValue: repository,
        },
      ],
    }).compile();
    service = module.get<ProductsService>(ProductsService);
  });

  it('deve criar um produto', async () => {
    const dto = {
      nome: 'Notebook',
      categoria: 'Eletronicos',
      descricao: 'Notebook para desenvolvimento',
      preco: 3500,
      quantidadeEstoque: 10,
    };

    const product = {
      id: 1,
      ...dto,
    };

    repository.create.mockResolvedValue(product);
    const result = await service.create(dto);
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(product);
  });
});
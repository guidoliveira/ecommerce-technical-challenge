import {

  Inject,

  Injectable,

  NotFoundException,

} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';

import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from './entities/product.entity';

import type { IProductsRepository } from './repositories/products.repository.interface';

import { PRODUCTS_REPOSITORY_TOKEN } from './repositories/products.repository.token';

@Injectable()

export class ProductsService {

  constructor(

    @Inject(PRODUCTS_REPOSITORY_TOKEN)

    private readonly productsRepository: IProductsRepository,

  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {

    return this.productsRepository.create(createProductDto);

  }

  async findAll(): Promise<Product[]> {

    return this.productsRepository.findAll();

  }

  async findOne(id: number): Promise<Product> {

    const product = await this.productsRepository.findById(id);

    if (!product) {

      throw new NotFoundException('Produto não encontrado');

    }

    return product;

  }

  async update(

    id: number,

    updateProductDto: UpdateProductDto,

  ): Promise<Product> {

    return this.productsRepository.update(id, updateProductDto);

  }

  async remove(id: number): Promise<void> {

    await this.productsRepository.delete(id);

  }

}
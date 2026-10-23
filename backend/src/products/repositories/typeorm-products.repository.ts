import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { IProductsRepository } from './products.repository.interface';

@Injectable()

export class TypeOrmProductsRepository implements IProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async create(product: Partial<Product>): Promise<Product> {
    const newProduct = this.repository.create(product);
    return this.repository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Product | null> {
    return this.repository.findOne({
      where: { id },
    });

  }

  async update(
    id: number,
    product: Partial<Product>,

  ): Promise<Product> {

    const existingProduct = await this.findById(id);

    if (!existingProduct) {
      throw new NotFoundException('Produto não encontrado');

    }

    const updatedProduct = this.repository.merge(
      existingProduct,
      product,
    );

    return this.repository.save(updatedProduct);

  }

  async delete(id: number): Promise<void> {

    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Produto não encontrado');
    }

  }

}
import { Product } from '../entities/product.entity';

export interface IProductsRepository {

  create(product: Partial<Product>): Promise<Product>;

  findAll(): Promise<Product[]>;

  findById(id: number): Promise<Product | null>;

  update(id: number, product: Partial<Product>): Promise<Product>;

  delete(id: number): Promise<void>;

}
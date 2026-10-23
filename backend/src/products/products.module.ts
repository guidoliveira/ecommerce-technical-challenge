import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { TypeOrmProductsRepository } from './repositories/typeorm-products.repository';
import { PRODUCTS_REPOSITORY_TOKEN } from './repositories/products.repository.token';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    TypeOrmProductsRepository,
    {
      provide: PRODUCTS_REPOSITORY_TOKEN,
      useExisting: TypeOrmProductsRepository,
    }
  ]
})
export class ProductsModule {}

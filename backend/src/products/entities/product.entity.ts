import {

  Column,

  Entity,

  PrimaryGeneratedColumn,

} from 'typeorm';

@Entity('products')

export class Product {

  @PrimaryGeneratedColumn()

  id: number;

  @Column()

  nome: string;

  @Column()

  categoria: string;

  @Column({ type: 'text' })

  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })

  preco: number;

  @Column({ name: 'quantidade_estoque', type: 'int' })

  quantidadeEstoque: number;

}
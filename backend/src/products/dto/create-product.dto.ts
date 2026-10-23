import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Notebook' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'Eletronicos' })
  @IsString()
  @IsNotEmpty()
  categoria: string;

  @ApiProperty({ example: 'Notebook para desenvolvimento' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: 3500 })
  @IsNumber()
  @IsPositive()
  preco: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  quantidadeEstoque: number;
}

 
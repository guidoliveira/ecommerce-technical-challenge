import {
  ArrayMinSize,
  IsArray,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { OrderItemDto } from './order-item.dto';

import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    type: [OrderItemDto],
    example: [ 
      {
        produtoId: 2,
        quantidade: 1,
      },
      {
        produtoId: 4,
        quantidade: 2
      },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  produtos: OrderItemDto[];

}
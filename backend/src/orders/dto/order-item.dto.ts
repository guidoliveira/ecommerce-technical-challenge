import {IsInt,IsPositive} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {

    @ApiProperty({example: 2})
    @IsInt()
    @IsPositive()
    produtoId: number;

    @ApiProperty({example: 1})
    @IsInt()
    @IsPositive()
    quantidade: number;
}

import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()

@UseGuards(JwtAuthGuard)

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}
  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()

  findAll() {
    return this.ordersService.findAll();
  }

  @Patch('/:id/complete')
  complete(
    @Param('id', ParseIntPipe) id: number,      
  ) {
    return this.ordersService.complete(id);
  }

  @Patch('/:id/cancel')

  cancel(
    @Param('id', ParseIntPipe) id: number,
    ) {
  return this.ordersService.cancel(id);
  }

}
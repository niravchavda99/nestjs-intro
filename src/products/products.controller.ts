/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') productTitle: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ): any {
    const generatedProductId = this.productsService.insertProduct(
      productTitle,
      productDescription,
      productPrice,
    );
    return { id: generatedProductId };
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.fetchProduct(id);
  }

  @Get()
  getAllProducts() {
    return this.productsService.fetchProducts();
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body('title') updatedTitle: string,
    @Body('description') updatedDescription: string,
    @Body('price') updatedPrice: number,
  ) {
    this.productsService.updateProduct(
      id,
      updatedTitle,
      updatedDescription,
      updatedPrice,
    );
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    this.productsService.deleteProduct(id);
    return null;
  }
}

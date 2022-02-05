/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {

    }

    @Post()
    addProduct(
        @Body('title') productTitle: string,
        @Body('description') productDescription: string,
        @Body('price') productPrice: number,
    ): any {

        const generatedProductId = this.productsService.insertProduct(productTitle, productDescription, productPrice);
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

}
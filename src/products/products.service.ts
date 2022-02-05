/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number): string {
        const productId = Math.random().toString();
        const newProduct = new Product(productId, title, desc, price);
        this.products.push(newProduct);
        return productId;
    }

    fetchProducts() {
        return [...this.products];
    }

    fetchProduct(id: string) {
        const product = this.products.find(p => p.id === id);
        if (!product) throw new NotFoundException('Could not find product!');
        return { ...product };
    }
}
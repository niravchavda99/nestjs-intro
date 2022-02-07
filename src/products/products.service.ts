/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { title } from 'process';
import { Product } from './product.model';

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
    const product: Product = this.findProduct(id)[0];
    return { ...product };
  }

  updateProduct(
    productId: string,
    updatedTitle: string,
    updatedDescription: string,
    updatedPrice: number,
  ) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (updatedTitle) {
      updatedProduct.title = updatedTitle;
    }
    if (updatedDescription) {
      updatedProduct.description = updatedDescription;
    }
    if (updatedPrice) {
      updatedProduct.price = updatedPrice;
    }
  }

  private findProduct(productId: string): [Product, number] {
    const productIndex = this.products.findIndex((p) => p.id === productId);
    const product = this.products[productIndex];
    if (!product) throw new NotFoundException('Could not find product!');
    return [product, productIndex];
  }

  deleteProduct(id: string) {
    const index = this.findProduct(id)[1];
    this.products.splice(index, 1);
  }
}

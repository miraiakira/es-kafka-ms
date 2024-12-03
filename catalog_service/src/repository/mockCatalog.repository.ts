import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository {
  findStock(ids: number[]): Promise<Product[]> {
    throw new Error("Method not implemented.");
  }
  create(data: Product): Promise<Product> {
    const mockProduct = {
      id: 123,
      ...data,
    } as Product;
    return Promise.resolve(mockProduct);
  }
  update(data: Product): Promise<Product> {
    return Promise.resolve(data as unknown as Product);
  }
  delete(id: number): Promise<{ id: number }> {
    return Promise.resolve({ id });
  }
  find(): Promise<Product[]> {
    return Promise.resolve([]);
  }
  findOne(id: number): Promise<Product> {
    return Promise.resolve({} as unknown as Product);
  }
}

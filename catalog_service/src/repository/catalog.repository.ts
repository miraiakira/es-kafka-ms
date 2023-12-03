import { ICatalogRepository } from '../interface/catalogRepository.interface'
import { Product } from '../models/product.model'

export class CatalogRepository implements ICatalogRepository {
  create (data: Product): Promise<Product> {
    throw new Error('Method not implemented.')
  }
  update (data: Product): Promise<Product> {
    throw new Error('Method not implemented.')
  }
  delete (id: number): Promise<{ id: number }> {
    throw new Error('Method not implemented.')
  }
  find (limit: number, offset: number): Promise<Product[]> {
    return Promise.resolve([])
  }
  findOne (id: number): Promise<Product> {
    throw new Error('Method not implemented.')
  }
}

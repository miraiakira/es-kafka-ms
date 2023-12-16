import { Factory } from 'rosie'
import { Product } from '../../models/product.model'
import { faker } from '@faker-js/faker'
1

export const ProductFactory = new Factory<Product>()
  .attr('id', faker.number.int({ min: 1, max: 100 }))
  .attr('name', faker.commerce.productName())
  .attr('description', faker.commerce.productDescription())
  .attr('stock', faker.number.int({ min: 10, max: 100 }))
  .attr('price', +faker.commerce.price())

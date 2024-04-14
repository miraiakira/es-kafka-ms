import { DB } from '../db/db.connection';
import { carts } from '../db/schema';
import { CartRepositoryType } from '../types/repository.type';

const db = {};

const createCart = async (input: any): Promise<{}> => {
  // connect to db
  const result = await DB.insert(carts)
    .values({
      customerId: 123,
    })
    .returning({ cartId: carts.id });

  console.log(result);
  // perform db operations
  return Promise.resolve({
    message: 'fake response from cart repository',
    input,
  });
};
const findCart = async (input: any): Promise<{}> => {
  return Promise.resolve({});
};
const updateCart = async (input: any): Promise<{}> => {
  return Promise.resolve({});
};
const deleteCart = async (input: any): Promise<{}> => {
  return Promise.resolve({});
};

export const CartRepository: CartRepositoryType = {
  create: createCart,
  find: findCart,
  update: updateCart,
  delete: deleteCart,
};
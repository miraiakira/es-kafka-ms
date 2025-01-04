import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { OrderWithLineItems } from "../types/message.type";

export class CatalogService {
  private _repository: ICatalogRepository;

  constructor(repository: ICatalogRepository) {
    this._repository = repository;
  }

  async createProduct(input: any) {
    const data = await this._repository.create(input);
    if (!data.id) {
      throw new Error("unable to create product");
    }
    return data;
  }

  async updateProduct(input: any) {
    const data = await this._repository.update(input);
    if (!data.id) {
      throw new Error("unable to update product");
    }
    return data;
  }

  // instead of this we will get product from Elastic search
  async getProducts(limit: number, offset: number) {
    const products = await this._repository.find(limit, offset);
    return products;
  }

  async getProduct(id: number) {
    const product = await this._repository.findOne(id);
    return product;
  }

  async deleteProduct(id: number) {
    const response = await this._repository.delete(id);
    // delete record from Elastic search
    return response;
  }

  async getProductStock(ids: number[]) {
    const products = await this._repository.findStock(ids);
    if (!products) {
      throw new Error("unable to get product stock details");
    }
    return products;
  }

  async handleBrokerMessage(message: any) {
    console.log("Catalog Service received message", message);
    const orderData = message.data as OrderWithLineItems;
    const { orderItems } = orderData;
    orderItems.forEach(async (item) => {
      console.log("Updating stock for product", item.productId, item.qty);
      const product = await this.getProduct(item.productId);
      if (!product) {
        console.log(
          "Product not found during stock update for create order",
          item.productId
        );
      } else {
        const updatedStock = product.stock - item.qty;
        await this.updateProduct({ ...product, stock: updatedStock });
      }
      // perform stock update operation
    });
  }
}

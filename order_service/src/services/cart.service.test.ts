import * as Repository from "../repository/cart.repository";
import { CartRepositoryType } from "../repository/cart.repository";
import { CreateCart } from "./cart.service";

describe("cartService", () => {
  let repo: CartRepositoryType;

  beforeEach(() => {
    repo = Repository.CartRepository;
  });

  afterEach(() => {
    repo = {} as CartRepositoryType;
  });

  it("should return correct data while creating cart", async () => {
    const mockCart = {
      productId: 1,
      customerId: 1,
      qty: 1,
    };

    const res = await CreateCart(mockCart, repo);

    jest
      .spyOn(Repository.CartRepository, "createCart")
      .mockImplementationOnce(() => Promise.resolve(1));

    expect(res).toEqual(1);
  });
});

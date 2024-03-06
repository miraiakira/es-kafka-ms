import { CartRepositoryType } from "../types/repository.type"
import * as Repository from '../repository/cart.repository'
import { CreateCart } from "./cart.service";

describe("cartService", () => {
    let repo: CartRepositoryType;

    beforeEach(() => {
        repo = Repository.CartRepository
    })

    afterEach(() => {
        repo = {} as CartRepositoryType;
    })

    it("should return correct data while creating cart", async () => {
        const mockCart = {
            title: "smart phone",
            amount: 1200,
        }

        const res = await CreateCart(mockCart, repo)

        jest.spyOn(Repository.CartRepository, "create").mockImplementationOnce(() => Promise.resolve({
            message: "fake response from cart repository",
            input: mockCart,
        }))

        expect(res).toEqual({
            message: "fake response from cart repository",
            input: mockCart
        })
    })
})
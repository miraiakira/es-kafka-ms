import { GetOrderDetails } from "../utils";

export const CreatePayment = async (
  userId: number,
  orderId: number,
  paymentGateway: unknown
) => {
  // get order details from order service
  const order = await GetOrderDetails(orderId);
  if (order.customerId !== userId) {
    throw new Error("use not authorized to create payment");
  }
  // create a new payment record

  // amount has to be fetched from the order service

  return {
    secret: "my super secret",
    pubKey: "my super public key",
    amount: 100,
  };
};

export const VerifyPayment = async (
  paymentId: string,
  paymentGateway: unknown
) => {};

import { GetOrderDetails, PaymentGateway } from "../utils";
import { SendPaymentUpdateMessage } from "./broker.service";

export const CreatePayment = async (
  userId: number,
  orderNumber: number,
  paymentGateway: PaymentGateway
) => {
  // get order details from order service
  const order = await GetOrderDetails(orderNumber);
  if (order.customerId !== userId) {
    throw new Error("use not authorized to create payment");
  }

  // create a new payment record
  const amountInCents = order.amount * 100;
  const orderMetaData = {
    orderNumber: order.orderNumber,
    userId: userId,
  };

  // call payment gateway to create payment
  const paymentResponse = await paymentGateway.createPayment(
    amountInCents,
    orderMetaData
  );

  console.log("payment response", paymentResponse);

  // return payment secrets
  return {
    secret: paymentResponse.secret,
    pubKey: paymentResponse.pubKey,
    amount: amountInCents,
    order: order, // just for testing
  };
};

export const VerifyPayment = async (
  paymentId: string,
  paymentGateway: PaymentGateway
) => {
  // call payment gateway to verify payment
  const paymentResponse = await paymentGateway.getPayment(paymentId);
  console.log("payment status", paymentResponse.status);
  console.log("payment log", paymentResponse.paymentLog);

  // update order status through message broker
  const response = await SendPaymentUpdateMessage({
    status: paymentResponse.status,
    orderNumber: paymentResponse.orderNumber,
    paymentLog: paymentResponse.paymentLog,
  });

  console.log("payment send message broker response", response);

  return { message: "Payment verified", status: paymentResponse.status };
};

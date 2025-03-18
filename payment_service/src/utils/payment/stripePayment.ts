import Stripe from "stripe";
import { PaymentGateway } from "./payment.type";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-02-24.acacia",
});

const createPayment = async (
  amount: number,
  metadata: { orderNumber: number; userId: number }
): Promise<{ secret: string; pubKey: string; amount: number }> => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    metadata: metadata,
  });

  return {
    secret: paymentIntent.client_secret as string,
    pubKey: process.env.STRIPE_PUBLIC_KEY as string,
    amount: paymentIntent.amount,
  };
};

const getPayment = async (
  paymentId: string
): Promise<Record<string, unknown>> => {
  const paymentResponse = await stripe.paymentIntents.retrieve(paymentId, {});
  const { status } = paymentResponse;
  console.log("payment response", JSON.stringify(paymentResponse));
  const orderNumber = paymentResponse?.metadata["orderNumber"];
  return { status, orderNumber, paymentLog: paymentResponse };
};

export const StripePayment: PaymentGateway = {
  createPayment,
  getPayment,
};

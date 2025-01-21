import { Producer } from "kafkajs";
import { MessageBroker } from "../utils";
import { PaymentEvent } from "../types";

// initializing the broker
export const InitializeBroker = async () => {
  const producer = await MessageBroker.connectProducer<Producer>();
  producer.on("producer.connect", () => {
    console.log("Order service producer connected successfully");
  });
};

// publish dedicated events based on usecases
export const SendPaymentUpdateMessage = async (data: unknown) => {
  await MessageBroker.publish({
    event: PaymentEvent.UPDATE_PAYMENT,
    topic: "OrderEvents",
    headers: {},
    message: {
      data,
    },
  });
};

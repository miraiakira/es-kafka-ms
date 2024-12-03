import { Consumer, Producer } from "kafkajs";
import { MessageBroker } from "../utils/broker";
import { HandleSubscription } from "./order.service";
import { OrderEvent } from "../types";

// initializing the broker
export const InitializeBroker = async () => {
  const producer = await MessageBroker.connectProducer<Producer>();
  producer.on("producer.connect", () => {
    console.log("producer connected successfully");
  });

  const consumer = await MessageBroker.connectConsumer<Consumer>();
  consumer.on("consumer.connect", () => {
    console.log("consumer connected successfully");
  });

  // keep listening to comsumers events
  // perform the action based on the event
  await MessageBroker.subscribe(HandleSubscription, "OrderEvents");
};

// publish dedicated events based on usecases
export const SendCreateOrdermessage = async (data: any) => {
  const result = await MessageBroker.publish({
    event: OrderEvent.CREATE_ORDER,
    topic: "CatalogEvents",
    headers: {},
    message: data,
  });
  return result;
};

export const SendOrderCancelMessage = async (data: any) => {
  const result = await MessageBroker.publish({
    event: OrderEvent.CANCEL_ORDER,
    topic: "CatalogEvents",
    headers: {},
    message: data,
  });
  return result;
};

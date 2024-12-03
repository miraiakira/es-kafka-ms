export type OrderLineItemType = {
  id: number;
  productId: number;
  itemName: string;
  orderId: number;
  qty: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export interface OrderWithLineItems {
  id?: number;
  customerId: number;
  orderNumber: number;
  txnId: string | null;
  amount: string;
  status: string;
  orderItems: OrderLineItemType[];
  createdAt?: Date;
  updatedAt?: Date;
}

// orderNumber: integer("order_number").notNull().unique(),
// customerId: integer("customer_id").notNull(),
// amount: numeric("amount").notNull(),
// status: varchar("status").notNull(),
// txnId: varchar("txn_id").notNull(),

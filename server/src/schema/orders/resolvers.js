import mongoose from "mongoose";
const Schema = mongoose.Schema;

const resolvers = {
  Query: {
    getOrders: async (_, args) => {
      const Orders = await Order.find({});
      return Orders;
    },
    getOrder: async (_, args) => {
      const Order = await Order.findById({ _id: args._id });
      return Order;
    },
  },

  Mutation: {
    createOrder: async (_, args) => {
      let userPaymentinfo = {
        card_no: args.card_no,
        cvv: args.cvv,
        exp_date: cardDate,
      };
      let cardDate = {
        month: args.month,
        year: args.year,
      };
      let itemIds = {
        item_id: args.item_id,
      };
      let priceDetails = {
        total_price: args.total_price,
        tax: args.tax,
        shipping_cost: args.shipping_cost,
      };
      let address = {
        apartment: args.apartment,
        street: args.street,
        city: args.city,
        country: args.country,
        zipcode: args.zipcode,
      };
      let saveOrder = {
        item_ids: itemIds,
        estimated_delivery: args.estimated_delivery,
        address: address,
        user_id: args.user_id,
        price_details: priceDetails,
        payment_info: userPaymentinfo,
      };
      const newOrder = new Order(saveOrder);
      const createOrder = await newOrder.save();

      return createOrder;
    },
  },
};

const Order = mongoose.model(
  "Order",

  new Schema({
    user_id: {
      type: Schema.ObjectId,
      required: true,
    },
    item_ids: [
      new Schema({
        item_id: Schema.ObjectId,
      }),
    ],
    estimated_delivery: {
      type: String,
      required: true,
    },
    payment_info: {
      card_no: { type: String, required: true },
      cvv: { type: Number, required: true },
      exp_date: new Schema({
        month: { type: Number, required: true },
        year: { type: Number, required: true },
      }),
    },
    address: {
      apartment: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, reqired: true },
      country: { type: String, required: true },
      zipcode: { type: String, required: true },
    },
    total_price: {
      total_price: { type: String, required: true },
      tax: { type: String, required: true },
      shipping_cost: { type: String, required: true },
    },
  })
);

export default resolvers;

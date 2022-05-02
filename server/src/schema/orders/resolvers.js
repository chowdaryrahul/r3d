import mongoose from "mongoose";
const Schema = mongoose.Schema;

const resolvers = {
  Query: {
    getOrders: async (_, args) => {
      const Orders = await Order.find({});
      return Orders;
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
      let saveOrder = {
        image_id: args.image_id,
        estimated_delivery: args.estimated_delivery,
        user_id: args.user_id,
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
    image_id: {
      type: Schema.ObjectId,
      required: true,
    },
    estimated_delivery: {
      type: String,
      required: true,
    },
    payment_info: [
      new Schema({
        card_no: { type: String, required: true },
        cvv: { type: Number, required: true },
        exp_date: new Schema({
          month: { type: Number, required: true },
          year: { type: Number, required: true },
        }),
      }),
    ],
  })
);

export default resolvers;

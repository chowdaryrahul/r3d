import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Item = mongoose.model(
  "Item",

  new Schema({
    title: {
      type: String,
      required: true,
    },
  })
);

const resolvers = {
  Query: {
    fetchItems: async (_, args) => {
      const items = await Item.find({});
      return items;
    },
  },
};

export default resolvers;

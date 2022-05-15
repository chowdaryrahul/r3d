import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Item = mongoose.model(
  "Item",

  new Schema({
    title: {
      type: String,
      required: true,
    },
    likeDetails: [
      {
        user_id: {
          type: String,
          required: false,
        },
        user_name: {
          type: String,
          required: false,
        },
        liked: {
          type: Boolean,
          required: false,
        },
      },
      { _id: false },
    ],
    totalLikes: {
      type: Number,
      required: false,
    },
    user_id: {
      type: String,
      unique: false,
      required: false,
    },
    user_name: {
      type: String,
      unique: false,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    tags: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    upload_date: {
      type: String,
      required: false,
    },
    license: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    print_settings: {
      printer: {
        type: String,
        required: false,
      },
      printer_brand: {
        type: String,
        required: false,
      },
      rafts: {
        type: String,
        required: false,
      },
      supports: {
        type: String,
        required: false,
      },
      resolution: {
        type: String,
        required: false,
      },
      infill: {
        type: String,
        required: false,
      },
      filament_brand: {
        type: String,
        required: false,
      },
      filament_color: {
        type: String,
        required: false,
      },
      filament_material: {
        type: String,
        required: false,
      },
    },
    comments: [
      {
        user_id: {
          type: String,
          required: false,
        },
        user_name: {
          type: String,
          required: false,
        },
        comt_text: {
          type: String,
          required: false,
        },
      },
      { _id: false },
    ],
    multiple_images_of_obj: [
      {
        type: String,
        required: false,
      },
    ],
  })
);

const resolvers = {
  Query: {
    fetchItems: async (_, args) => {
      const items = await Item.find({});
      return items;
    },
    fetchItem: async (_, args) => {
      const item = await Item.findById({ _id: args._id });
      return item;
    },
    fetchMultipleItemById: async (_, args) => {
      let itemArr = [];
      let itemArrData = await Promise.all(
        args._ids.map(async (itemIds) => {
          const item = await Item.findById({ _id: itemIds });
          itemArr.push(item);
        })
      );
      return itemArr;
    },
  },

  Mutation: {
    createItem: async (_, args) => {
      let printerSettings = {
        printer: args.printer,
        printer_brand: args.printer_brand,
        rafts: args.rafts,
        supports: args.supports,
        resolution: args.resolution,
        infill: args.infill,
        filament_brand: args.filament_brand,
        filament_color: args.filament_color,
        filament_material: args.filament_material,
      };

      let saveItem = {
        title: args.title,
        totalLikes: 0,
        user_id: args.user_id,
        user_name: args.user_name,
        category: args.category,
        tags: args.tags,
        description: args.description,
        upload_date: args.upload_date,
        license: args.license,
        price: args.price,
        print_settings: printerSettings,
        multiple_images_of_obj: args.multiple_images_of_obj,
      };
      const newItem = new Item(saveItem);
      const createdItem = await newItem.save();

      return createdItem;
    },

    likeItem: async (_, args) => {
      let likeDetailsVal = {
        user_id: args.user_id,
        user_name: args.user_name,
        liked: true,
      };
      const updateLikeCount = await Item.findOneAndUpdate(
        { _id: args._id },
        { totalLikes: args.totalLikes + 1 }
      );
      const updateItem = await Item.findOneAndUpdate(
        { _id: args._id },
        { $push: { likeDetails: likeDetailsVal } }
      );
      return await Item.findById({ _id: args._id });
    },

    unlikeItem: async (_, args) => {
      let likeDetailsVal = {
        user_id: args.user_id,
        user_name: args.user_name,
        liked: true,
      };
      const updateunLikeCount = await Item.findOneAndUpdate(
        { _id: args._id },
        { totalLikes: args.totalLikes - 1 }
      );
      const updateItemUnlike = await Item.findOneAndUpdate(
        { _id: args._id },
        { $pull: { likeDetails: likeDetailsVal } }
      );
      return await Item.findById({ _id: args._id });
    },

    commentItem: async (_, args) => {
      let commentsVal = {
        user_id: args.user_id,
        user_name: args.user_name,
        comt_text: args.comt_text,
      };
      const updateComment = await Item.findOneAndUpdate(
        { _id: args._id },
        { $push: { comments: commentsVal } }
      );
      return await Item.findById({ _id: args._id });
    },

    uncommentItem: async (_, args) => {
      let commentsVal = {
        user_id: args.user_id,
        user_name: args.user_name,
        comt_text: args.comt_text,
      };
      const updateComment = await Item.findOneAndUpdate(
        { _id: args._id },
        { $pull: { comments: commentsVal } }
      );
      return await Item.findById({ _id: args._id });
    },
  },
};

export default resolvers;

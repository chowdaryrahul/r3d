import mongoose from "mongoose";
const Schema = mongoose.Schema;
import mongoosastic from "mongoosastic";
// import { createReadStream } from 'fs';
// import { createModel } from 'mongoose-gridfs';

// use default bucket
// const Attachment = createModel();

const Item = mongoose.model(
  "Item",

  new Schema({
    title: {
      type: String,
      required: true,
      es_indexed: true
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
    ],
    totalLikes: {
      type: Number,
      required: false,
    },
    user_id: {
      type: String,
      required: false,
      unique: true,
    },
    user_name: {
      type: String,
      required: false,
      unique: true,
    },
    category: {
      type: String,
      required: false,
      es_indexed: true
    },
    tags: {
      type: String,
      required: false,
      es_indexed: true
    },
    description: {
      type: String,
      required: false,
      es_indexed: true
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
        es_indexed: true
      },
      printer_brand: {
        type: String,
        required: false,
        es_indexed: true
      },
      rafts: {
        type: String,
        required: false,
        es_indexed: true
      },
      supports: {
        type: String,
        required: false,
        es_indexed: true
      },
      resolution: {
        type: String,
        required: false,
        es_indexed: true
      },
      infill: {
        type: String,
        required: false,
        es_indexed: true
      },
      filament_brand: {
        type: String,
        required: false,
        es_indexed: true
      },
      filament_color: {
        type: String,
        required: false,
        es_indexed: true
      },
      filament_material: {
        type: String,
        required: false,
        es_indexed: true
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
    ],
    multiple_images_of_obj: [
      {
        type: String,
        required: false,
      },
    ],
  }).plugin(mongoosastic)
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
        liked: true
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
        comt_text: args.comt_text
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

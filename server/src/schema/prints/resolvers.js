import mongoose from "mongoose";
const Schema = mongoose.Schema;
// import { createReadStream } from 'fs';
// import { createModel } from 'mongoose-gridfs';

// use default bucket
// const Attachment = createModel();

const Item = mongoose.model(
  "Item",

  new Schema({
    title: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      required: false
    },
    user_id: {
      type: String,
      required: false,
      unique: true
    },
    user_name: {
      type: String,
      required: false,
      unique: true
    },
    category: {
      type: String,
      required: false
    },
    tags: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    upload_date: {
      type: String,
      required: false
    },
    license: {
      type: String,
      required: false
    },
    price: {
      type: Number,
      required: false
    },
    print_settings: {
      printer: {
        type: String,
        required: false
      },
      printer_brand: {
        type: String,
        required: false
      },
      rafts: {
        type: String,
        required: false
      },
      supports: {
        type: String,
        required: false
      },
      resolution: {
        type: String,
        required: false
      },
      infill: {
        type: String,
        required: false
      },
      filament_brand: {
        type: String,
        required: false
      },
      filament_color: {
        type: String,
        required: false
      },
      filament_material: {
        type: String,
        required: false
      }
    },
    comments: [{
      type: String,
      required: false
    }],
    // multiple_images_of_obj: [{
    //   data: Buffer,
    //   contentType: String
    // }]
  })
);

const resolvers = {
  Query: {
    fetchItems: async (_, args) => {
      const items = await Item.find({});
      return items;
    }
  },

  Mutation: {
    createItem: async(_, args) => {

      // const readStream = createReadStream(ss);
      // const readStream = createReadStream('D:/ss.png');
      // const options = ({ filename: 'ss.png', contentType: 'image/png' });
      // Attachment.write(options, readStream, (error, file) => {
      //   filename: 'ss.png'
      // });


      let printerSettings = {
        printer: args.printer,
        printer_brand: args.printer_brand,
        rafts: args.rafts,
        supports: args.supports,
        resolution: args.resolution,
        infill: args.infill,
        filament_brand: args.filament_brand,
        filament_color: args.filament_color,
        filament_material: args.filament_material
      }

      let saveItem = {
          title: args.title,
          likes: args.likes,
          user_id: args.user_id,
          user_name: args.user_name,
          category: args.category,
          tags: args.tags,
          description: args.description,
          upload_date: args.upload_date,
          license: args.license,
          price: args.price,
          print_settings: printerSettings,
          // multiple_images_of_obj: args.multiple_images_of_obj
        }
      const newItem = new Item(saveItem);
      const createdItem = await newItem.save();

      return createdItem;
    }
  }

  
};

export default resolvers;

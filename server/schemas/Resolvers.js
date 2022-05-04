import { GraphQLUpload } from "graphql-upload";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import gm from "gm";
import { UserInfoModel } from "../models/userInfoModel.js";
import { ApolloError } from "apollo-server-core";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
let graphicMagick = gm.subClass({ imageMagick: true });

export const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    getDetails: async function () {

      const details = await UserInfoModel.find({})
      console.log(details)
        const files = fs.readdirSync("schemas/files");
        console.log(__dirname);
        const userData = details.map((data)=>{
          const {name, description, category, image} = data

          return {name, description, category, url:`http://localhost:5000/files/${image[0]}`}
        })
            
         console.log(userData)
        return userData
      
    },
  },
  Mutation: {
    detailsUpload: async function (root, { file, details }) {
      console.log(file);
      console.log(details);
      const { createReadStream, filename, encoding, mimetype } = await file;
      const stream = createReadStream();

      fs.mkdirSync(path.join(__dirname, "files"), { recursive: true });

      const output = fs.createWriteStream(
        path.join(__dirname, "files", `${Math.random(6)}_${filename}`)
      );
      console.log(output);
      const filePath = String(output.path).replace(/\\/g, "/");
      console.log(filePath);
      stream.pipe(output);
       var savedDetails = []
      await new Promise(function (resolve, reject) {
        output.on("close", () => {
          console.log("File uploaded", filePath);
          const pathArray = filePath.split('/');
           console.log("Pathh=>",pathArray);
          // const pathArray = patharray.split('/');
          const AllDetails = {
            name: details.name,
            category:details.category,
            description: details.description,
            image: pathArray[pathArray.length - 1],
          };
           savedDetails = new UserInfoModel({...AllDetails})
          savedDetails.save()
          .catch((err)=>console.log(err))
          console.log(savedDetails);
          resolve();
        });

        output.on("error", (err) => {
          reject(err);
          throw new ApolloError(err)
        });
      });
      graphicMagick(filePath)
        .resize(300, 300)
        .write(filePath, function (err) {
          if (err) console.log(err);
        });
       if(savedDetails){
        return {
          name: details.name,
          description: details.description,
        }
      }
    },
  },
};

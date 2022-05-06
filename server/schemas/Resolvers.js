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
    getAllDetails: async function (_, {offset, limit, category}) {
       console.log("OFFSET", offset);
       const details = await UserInfoModel.find({})
        
       console.log(details.length)
       if(category === "all"){

      const details = await UserInfoModel.find({}).limit(limit).skip(offset)
      console.log(details)
      const count = await UserInfoModel.find({})
      const lastItemId = count[count.length-1]._id;

        const files = fs.readdirSync("schemas/files");
        console.log(__dirname);
        const userData = details.map((data)=>{
          const {name, description, category, image, comments, username, time} = data

          return {lastItemId:String(lastItemId), time, username, description, comments, name, postId:String(data._id), category, url:`http://localhost:5000/files/${image[0]}`}
        })
            
         console.log(userData)
        return userData
       }else{
         const count = await UserInfoModel.find({category:category})
         const lastItemId = count[count.length-1]._id;
         const details = await UserInfoModel.find({category:category}).limit(limit).skip(offset)
        console.log(details)
          const files = fs.readdirSync("schemas/files");
          console.log(__dirname);
          const userData = details.map((data)=>{
            const {name, description, category, image, comments, username, time} = data
  
            return { lastItemId:String(lastItemId), username, description, comments, name, postId:String(data._id), category, url:`http://localhost:5000/files/${image[0]}`}
          })
              
           console.log(userData)
          return userData
       }
    },
    getDetails: async function (_, {userId}) {

      const details = await UserInfoModel.find({userId:userId})
      console.log(details)
        const files = fs.readdirSync("schemas/files");
        console.log(__dirname);
        const userData = details.map((data)=>{
          const {name, description, category, image, comments, username, time} = data

          return {time, username, description, comments, name, postId:String(data._id), category, url:`http://localhost:5000/files/${image[0]}`}
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
            username:details.username,
            userId:details.userId,
            category:details.category,
            description: details.description,
            image: pathArray[pathArray.length - 1],
            time: new Date().getTime()
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
    AddComment:async function (root, args){
       console.log(args)
      const {postId, content} = args.comment;
      console.log(postId)
      const updatedData = await UserInfoModel.findOneAndUpdate({_id:postId}, {comments:content}, {new:true});

      console.log(updatedData)
      return [...updatedData.comments]
    }
  },
};

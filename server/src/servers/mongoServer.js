import mongoose from "mongoose";
import mongoConfig from "../configs/mongoConfig";
import process from "process";

const MongoDBServerInit = async () => {
  mongoose
    .connect(mongoConfig.serverUrl, {
      useNewUrlParser: true,
    })
    .then(
      () => {
        console.log(`💼 MongoDB Server ready at http://localhost:27017`);
      },
      (err) => {
        console.error.bind(console, "MongoDB connection error:");
      }
    );

  process.on("SIGINT", () => {
    mongoose.connection.close();
    process.exit(0);
  });
};

export default MongoDBServerInit;

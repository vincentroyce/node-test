import dotenv from 'dotenv'
import mongoose from 'mongoose'

function ConnectToDB() {
  //DB Connection
  mongoose
    .connect(dotenv.config().parsed.DB_URL_CONNECTION, {
      dbName: "shop-database",
    })
    .then(() => {
      console.log("Database connected...");
    })
    .catch((err) => {
      console.log(err);
    });
}
export default ConnectToDB;

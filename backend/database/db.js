import { connect } from "mongoose";
require("dotenv");
// const uri = "mongodb://localhost:27017/echo";

const connectToMongo = () => {
  connect("mongodb+srv://nayanp:NayanP45@echofinal.cfgu1f6.mongodb.net/?retryWrites=true&w=majority&appName=echoFinal")
    .then(() => {
    console.log("Connected to Mongo");
    })
    .catch((e) => {
    console.error(e);
  })
};

export default connectToMongo;
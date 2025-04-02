import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  id: { type: Number },
  count: { type: Number },
});
const counterModel = mongoose.model("emailCounter", counterSchema);

export default counterModel;

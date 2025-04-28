import mongoose from "mongoose";

const NewsMetaSchema = new mongoose.Schema({
    metaTitle: String,
    metaDescription: String,
  });
  
  const NewsMeta = mongoose.models.NewsMeta || mongoose.model("NewsMeta", NewsMetaSchema);
  
  export default NewsMeta;

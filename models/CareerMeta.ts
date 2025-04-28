import mongoose from "mongoose";

const CareerMetaSchema = new mongoose.Schema({
    metaTitle: String,
    metaDescription: String,
})

export default mongoose.models.CareerMeta || mongoose.model("CareerMeta", CareerMetaSchema)

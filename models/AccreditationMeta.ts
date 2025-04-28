import mongoose from "mongoose";

const AccreditationMeta = new mongoose.Schema({
    metaTitle: String,
    metaDescription: String
})

export default mongoose.models.AccreditationMeta || mongoose.model("AccreditationMeta", AccreditationMeta)
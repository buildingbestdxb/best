import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    headerScript: String,
    bodyScript: String,
});

export default mongoose.models.Tag || mongoose.model("Tag", tagSchema);
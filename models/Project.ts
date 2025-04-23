import mongoose from "mongoose";

const SpecificationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  value: {
    type: String,
  },
  logo:{
    type:String,
  }
});

const ProjectSchema = new mongoose.Schema({
  bannerImage:{
    type:String
  },
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  description: {
    type: String,
  },
  images: [String],
  type:{
    type:String,
    required:true
  },
  status:{
    type:String,
    required:true
  },
  location:{
    type:String,
  },
  specifications: [SpecificationSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export default Project;

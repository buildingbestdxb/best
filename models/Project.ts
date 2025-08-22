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
  },
  logoAlt:{
    type:String
  }
});

const ProjectSchema = new mongoose.Schema({
  bannerImage:{
    type:String
  },
  bannerAlt:{
    type:String
  },
  name: {
    type: String,
    required: true,
  },
  slug:{
    type:String,
  },
  thumbnail: {
    type: String,
  },
  thumbnailAlt:{
    type:String
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
  },
  location:{
    type:String,
  },
  specifications: [SpecificationSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  index:{
    type:Number,
  },
  metaTitle:{
    type:String
  },
  metaDescription:{
    type:String
  }
});

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export default Project;

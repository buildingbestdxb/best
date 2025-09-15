import mongoose from "mongoose";

const LeadershipSchema = new mongoose.Schema({
  metaTitle:{
    type:String
  },
  metaDescription:{
    type:String
  },
  bannerImage:{
    type:String
  },
  bannerImageAlt:{
    type:String
  },
  pageTitle:{
    type:String
  },
  messageSection:{
    items:[{
      title:String,
      image:String,
      imageAlt:String,
      name:String,
      designation:String,
      message:String
    }]
  }
});

const Leadership = mongoose.models.Leadership || mongoose.model("Leadership", LeadershipSchema);

export default Leadership;
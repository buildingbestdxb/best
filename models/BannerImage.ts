import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  pageName: {
    type: String,
    required: true,
  },
  image:{
    type:String,
  }
});

const Banner = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

export default Banner;

import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  applyLink: {
    type: String,
    required: true,
  },
  datePosted: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  responsibilities:{
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Careers = mongoose.models.Careers || mongoose.model("Careers", careerSchema);

export default Careers;

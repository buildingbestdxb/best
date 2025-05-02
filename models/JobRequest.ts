import mongoose from "mongoose";


const JobRequestSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    cityandcountry: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: String, // or Date if you're storing as actual Date
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    experienceinconstruction: {
      type: String,
      required: true,
    },
    experienceinuae: {
      type: String,
      required: true,
    },
    currentposition: {
      type: String,
      required: true,
    },
    currentemployer: {
      type: String,
      required: true,
    },
    currentsalary: {
      type: String,
      required: true,
    },
    expectedsalary: {
      type: String,
      required: true,
    },
    noticeperiod: {
      type: String,
      required: true,
    },
    hasrelative: {
      type: String,
      required: true,
    },
    relativeName: {
      type: String,
      default: '',
    },
    haspreviouswork: {
      type: String,
      required: true,
    },
    hasresponsibilities: {
      type: String,
      required: true,
    },
    softwares: {
      type: String,
      required: true,
    },
    companyType: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    coverLetter: {
      type: String,
      default: '',
    },
    linkedinProfile: {
      type: String,
      default: '',
    },  
    appliedFor:{
      type:String,
      required:true
    }
  }, { timestamps: true });


export default mongoose.models.JobRequest || mongoose.model("JobRequest",JobRequestSchema)


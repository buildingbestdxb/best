import mongoose from "mongoose";

const sectorSchema = new mongoose.Schema({
    bannerImage:{
        type:String,
        default:""
    },
    name: {
        type: String,
    },
    image: {
        type: String,
        default:""
    },
    icon: {
        type: String,
        default:""
    },
    bannerAlt: {
        type: String,
        default:""
    },
    imageAlt: {
        type: String,
        default:""
    },
    iconAlt: {
        type: String,
        default:""
    },
    metaTitle:{
        type:String
    },
    metaDescription:{
        type:String
    }
});

const Sector = mongoose.models.Sector || mongoose.model("Sector", sectorSchema);

export default Sector;
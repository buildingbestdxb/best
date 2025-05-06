import mongoose from "mongoose";

const contactMetaSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
        required: true,
    },
    metaDescription: {
        type: String,
        required: true,
    }
});

const ContactMeta = mongoose.models.ContactMeta || mongoose.model("ContactMeta", contactMetaSchema);

export default ContactMeta;

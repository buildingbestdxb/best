import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    region: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    fax: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    address_card: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
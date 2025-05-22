import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    region: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    fax: {
        type: String,
    },
    mail: {
        type: String,
    },
    address_card: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    }
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
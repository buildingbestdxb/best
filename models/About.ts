import mongoose from "mongoose";

const AboutSchema  = new mongoose.Schema({
    who_we_are:{
        type:String,
        required:true
    },
    core_value:{
        title:{
            type:String
        },
        content:{
            type:String,
        },
        image:{
            type:String,
        },
        cards:[
            {
                logo:{type:String},
                title:{type:String}
            },
        ],
        seals:[{
            logo:{type:String}
        }]
    },
    strength_and_vision:{
        content:{
            type:String,
        },
        image:{
            type:String,
        },
        clients:[
            {
                logo:String
            },
        ]
    },
    history:[{
        year:{
            type:String,
        },
        image:{
            type:String,
        },
        content:{
                type:String
        },
    }]
})

export default mongoose.models.About || mongoose.model("About",AboutSchema)
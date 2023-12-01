const mongoose = require('mongoose');

const SaveSchema = new mongoose.Schema({
    mal_id:{
        type:Number,
        required:true,
    },
    saved_type:{
        type:String,
        required:true,
    },
    user_id:{
        type:String,
        required:true,
    },
})

const Save = mongoose.model('Save',SaveSchema);
module.exports = Save;
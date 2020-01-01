const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskSchema = new Schema({
    userId : {
        type : Schema.ObjectId,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Task", taskSchema);

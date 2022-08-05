const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type:Number,
        // min age require is 1 and max age require is 30
        min: 1,
        max:30
    },
    email: {
        type: String,
        //setting required for true means in object we need to give email otherwise error will come
        required: true,
        //convert all uppercase to lowercase letter
        lowercase: true
    },
    createdAt:{
        type: Date,
        default: ()=> Date.now()
    },
    updatedAt:{
        type: Date,
        default: ()=> Date.now()
    },
    bestfriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address:{
        street: String,
        city: String
    }
})

// here mydata is name of collection in database.
module.exports = mongoose.model('mydata', userSchema)
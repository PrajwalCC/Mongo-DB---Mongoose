const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type:Number,
        // min age require is 1 and max age require is 30
        min: 1,
        max:30,
        validate:{
            validator: v => v > 18,
            message: (props)=> `age ${props.value} is not value`
        }

    },
    email: {
        type: String,
        //setting required for true means in object we need to give email otherwise error will come
        required: true,
        //convert all uppercase to lowercase letter
        lowercase: true,
        //email must be atleast 10 letters
        minLength: 10
    },
    createdAt:{
        type: Date,
        default: ()=> Date.now()
    },
    updatedAt:{
        type: Date,
        default: ()=> Date.now()
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "mydata"
    },
    hobbies: [String],
    address:{
        street: String,
        city: String
    }
})

userSchema.methods.sayHi = function () {
    console.log(`Hi. My name is ${this.name} `)
}

userSchema.statics.findByName = function (name) {
    return this.where({ name: new RegExp(name, "i")})
}

// here mydata is name of collection in database.
module.exports = mongoose.model('mydata', userSchema)
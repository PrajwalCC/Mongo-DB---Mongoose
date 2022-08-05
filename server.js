const mongoose = require("mongoose")
const mydata = require('./mydata')

mongoose.connect("mongodb://localhost/mydata",()=>{
    console.log("connected")
}, (err)=> console.log(err)
)

run()

async function run(){
    const newUser = await mydata.create({name:'Prajwal', age:20 , email:'prajwal@test'})
    // second method for creating objects 
    const newUser2 = new mydata({name:"kunal", age: 20, email:'kunal@test'})
    // kunal's object is locally copied in javascript, but not saved in database for saving we have to use save function
    await newUser2.save()  
    console.log(newUser, newUser2)
    
    // for updating kunal's object from name kunal to kaushal
    newUser2.name = 'Kaushal'
    await newUser2.save()
    console.log(newUser2)
}




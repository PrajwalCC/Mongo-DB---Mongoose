const mongoose = require("mongoose")
const mydata = require('./mydata')

mongoose.connect("mongodb://localhost/mydata",()=>{
    console.log("connected")
}, (err)=> console.log(err)
)

run()

async function run(){
    try {
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
        
        //this will give us all objects created till now of name Prajwal
        const newUser3 = await mydata.where("name").equals("Prajwal")
        console.log(newUser3)
        
       // this will give us all objects created till now of name Prajwal and age is less than 21 but greater than 18
        const newUser4 = await mydata.where("age")
           .gt(18)
           .lt(21)
           .where("name")
           .equals("Prajwal")
         //    limit allow us show only 1 objects
           .limit(1)
        // select function help us to show only age property of objects, rest all properties will not appear.
           .select("age")  
        //in Prajwal's object his Bestfriend's object will show up in bestFriend property with the help of populate function
        .populate("bestFriend")
        mydata[0].bestFriend = "62ed225a09ffe687733621f0"
        await mydata[0].save()
        console.log(newUser4)

        // read this findOne function from documentation .. here may be some mistakes...
        const newUser5 = await mydata.findOne({ name: "Prajwal" })
        console.log(newUser5)
        newUser5.sayHi()
        

    } catch(err){
        console.log(err.message)
    }
}




const mongoose = require("mongoose")

const mongoDBUrl = "mongodb+srv://limbaniharsh1:YnHNkY4TwKGA6vhw@cluster0.s1dphf6.mongodb.net/?retryWrites=true&w=majority"
// const mongoDBUrl = "mongodb+srv://limbaniharsh1:limbani@cluster0.nek9wa4.mongodb.net/test1?retryWrites=true&w=majority"
const connectDB =()=>{
    return mongoose.connect(mongoDBUrl).then(()=>console.log('connection success')).catch((error)=>console.log("connection failed"))
}
// const connectDB = mongoose.connect(mongoDBUrl)
module.exports = {connectDB}


// 2IZnx1vNmHtJaiY2
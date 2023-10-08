const app = require(".")
const { connectDB } = require("./config/db")
const PORT = 3080
app.listen(PORT,async()=>{
     
    try {
        await connectDB()
    console.log("e-commerce api listning on port : ",PORT)
    } catch (error) {
        console.log(error)
    }

    
})
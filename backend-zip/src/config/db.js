const mongoose = require("mongoose")

const mongoDbUrl='mongodb+srv://yogeshKont004:qiHOZLxxSRiOlpyL@cluster0.0t9wp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const connectDb=()=>{
    return mongoose.connect(mongoDbUrl)
}

module.exports={connectDb}

// 152.58.75.172/32  
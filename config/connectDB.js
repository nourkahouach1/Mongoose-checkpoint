const mongoose=require('mongoose')
const connectDB= async()=>{
  try {
   await mongoose.connect(process.env.MONGU_URI, { useNewUrlParser: true, useUnifiedTopology: true })
     console.log("db connect");
  } catch (error) {
    console.log(error);
  }
}

module.exports=connectDB;
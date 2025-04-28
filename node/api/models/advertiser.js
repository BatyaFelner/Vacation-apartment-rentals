import mongoose from "mongoose";


const advertiserschem= new mongoose.Schema(
  {

    email:{
    type:String,
    unique:true
     }
  ,
  password:String,
  phone:String,
  Anotherphone:{
   type:String,
  require:false
  },
  apartments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "apartment", 
    },
  ]
    
    }
)
export default mongoose.model('advertiser', advertiserschem)
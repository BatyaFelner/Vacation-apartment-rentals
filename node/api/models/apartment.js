import mongoose from "mongoose";

const Apartmentchem= new mongoose.Schema(
    {

   name:{
type:String,
required:true},
description:String,
Image:String,
 codecategory:{
  type: mongoose.Types.ObjectId,
                ref: "category", 
 },
 codecity :{
      type: mongoose.Types.ObjectId,
                    ref: "City", 
 },
 adress:String,
 numbeds:Number,
 adds:String,
 price:Number,
 codeadvertiser
 :{
      type: mongoose.Schema.Types.ObjectId,
                    ref: "advertiser", 
 }
    }


)
export default mongoose.model('aparment', Apartmentchem)
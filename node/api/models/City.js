import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
   
  },
  apartments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "apartment",
    },
  ]
});

export default mongoose.model("City", CitySchema);




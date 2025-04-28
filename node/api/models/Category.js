import mongoose from "mongoose";

const Categorychem = new mongoose.Schema(
    {
        nameCategory: {
            type: String,
            required: true,
        },
        apartments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "apartment", 
            },
        ] 
    }
);

export default mongoose.model('category', Categorychem);

import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  image: { type: String, required: true },
  description: { type: String, required: true },
  status:{type:String,default:'Visible'},
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shop",
    required: true,
  }, //creating a reference with shop database
});

const eventModel =
  mongoose.models.event || mongoose.model("event", eventSchema);

export default eventModel;

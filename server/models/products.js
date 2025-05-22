import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shop",
    required: true,
  }, //creating a reference with shops table
});

const productModel = mongoose.models.product || mongoose.model('product',productSchema)

export default productModel

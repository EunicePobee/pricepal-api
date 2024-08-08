import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import mongooseErrors from "mongoose-errors";

const productSchema = new Schema({
    productName: { type: String, required: true },
    categoryId: {type: Types.ObjectId, ref: 'Category', required: true },
    companyId: {type: Types.ObjectId, ref: 'Company', required: true },
    price: { type: Number, required: true }
}, {
    timestamps: true
});

productSchema
    .plugin(mongooseErrors)
    .plugin(toJSON);

export const ProductModel = model('Product', productSchema);
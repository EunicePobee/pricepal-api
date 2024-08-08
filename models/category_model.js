import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import mongooseErrors from "mongoose-errors";

const categorySchema = new Schema({
    categoryName: { type: String, required: true },
    companies: [{type: Types.ObjectId, ref: 'Company'}]
    
}, {
    timestamps: true
});

categorySchema
    .plugin(mongooseErrors)
    .plugin(toJSON);

export const CategoryModel = model('Category', categorySchema);
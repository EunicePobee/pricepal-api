import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import mongooseErrors from "mongoose-errors";

const companySchema = new Schema({
    companyName: { type: String, required: true },
    categoryId: {type: Types.ObjectId, ref: 'Category', required: true },
    logo: { type: String, required: true },
    products: [{type: Types.ObjectId, ref: 'Product'}]
}, {
    timestamps: true
});

companySchema
    .plugin(mongooseErrors)
    .plugin(toJSON);

export const CompanyModel = model('Company', companySchema);

    module.exports = function (app) {
        const modelName = "invoice_items";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            invoiceNo: { type:  String , comment: "Invoice No, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , comment: "Description, p, false, true, true, true, true, true, true, , , , ," },
quantity: { type: Number, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
unit: { type:  String , comment: "Unit, p, false, true, true, true, true, true, true, , , , ," },
unitPrice: { type: Number, comment: "Unit Price, p_number, false, true, true, true, true, true, true, , , , ," },
discount: { type: Number, comment: "Discount, p_number, false, true, true, true, true, true, true, , , , ," },
taxRate: { type: Number, comment: "Tax Rate, p_number, false, true, true, true, true, true, true, , , , ," },
lineAmount: { type: Number, comment: "Line Amount, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
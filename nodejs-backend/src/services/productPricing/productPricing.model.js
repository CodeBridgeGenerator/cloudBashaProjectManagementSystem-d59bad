
    module.exports = function (app) {
        const modelName = "product_pricing";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            pricingNo: { type:  String , comment: "Pricing No, p, false, true, true, true, true, true, true, , , , ," },
productCode: { type:  String , comment: "Product Code, p, false, true, true, true, true, true, true, , , , ," },
productName: { type:  String , comment: "Product  Name, p, false, true, true, true, true, true, true, , , , ," },
category: { type:  String , comment: "Category, p, false, true, true, true, true, true, true, , , , ," },
pricingType: { type:  String , comment: "Pricing Type, p, false, true, true, true, true, true, true, , , , ," },
unit: { type:  String , maxLength: 150, index: true, trim: true, comment: "Unit, p, false, true, true, true, true, true, true, , , , ," },
costPrice: { type: Number, comment: "Cost Price, p_number, false, true, true, true, true, true, true, , , , ," },
sellingPrice: { type: Number, comment: "Selling Price, p_number, false, true, true, true, true, true, true, , , , ," },
currency: { type:  String , comment: "Currency, p, false, true, true, true, true, true, true, , , , ," },
billingCycle: { type:  String , comment: "Billing Cycle, p, false, true, true, true, true, true, true, , , , ," },
effectiveFrom: { type: Date, comment: "Effective From, p_date, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
notes: { type:  String , comment: "Notes, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
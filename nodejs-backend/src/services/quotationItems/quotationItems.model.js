
    module.exports = function (app) {
        const modelName = "quotation_items";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            quoteNo: { type: Schema.Types.ObjectId, ref: "quotations", comment: "Quote No, dropdown, false, true, true, true, true, true, true, quotations, quotations, one-to-one, quoteNo," },
category: { type:  String , comment: "Category, p, false, true, true, true, true, true, true, , , , ," },
serviceName: { type:  String , comment: "Service Name, p, false, true, true, true, true, true, true, , , , ," },
quantity: { type: Number, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
unit: { type:  String , comment: "Unit, p, false, true, true, true, true, true, true, , , , ," },
detailDescription: { type:  String , comment: "Detail Description, p, false, true, true, true, true, true, true, , , , ," },
specification: { type:  String , comment: "Specification, p, false, true, true, true, true, true, true, , , , ," },
included: { type: Boolean, required: false, comment: "Included, p_boolean, false, true, true, true, true, true, true, , , , ," },
unitPrice: { type: Number, comment: "Unit Price, p_number, false, true, true, true, true, true, true, , , , ," },
amount: { type: Number, comment: "Amount, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
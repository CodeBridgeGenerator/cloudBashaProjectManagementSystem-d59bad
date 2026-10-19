
    module.exports = function (app) {
        const modelName = "quotation_payment_milestones";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            quoteNo: { type: Schema.Types.ObjectId, ref: "quotations", comment: "Quote No, dropdown, false, true, true, true, true, true, true, quotations, quotations, one-to-one, quoteNo," },
milestone: { type:  String , comment: "Milestone, p, false, true, true, true, true, true, true, , , , ," },
percentage: { type: Number, comment: "Percentage, p_number, false, true, true, true, true, true, true, , , , ," },
beforeTaxAmount: { type: Number, comment: "Before Tax Amount, p_number, false, true, true, true, true, true, true, , , , ," },
afterTaxAmount: { type: Number, comment: "After Tax Amount, p_number, false, true, true, true, true, true, true, , , , ," },
paymentTerms: { type:  String , comment: "Payment Terms, p, false, true, true, true, true, true, true, , , , ," },
sequence: { type: Number, comment: "Sequence, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
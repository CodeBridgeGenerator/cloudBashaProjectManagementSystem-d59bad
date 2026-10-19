
    module.exports = function (app) {
        const modelName = "quotations";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            quoteNo: { type:  String , maxLength: 150, index: true, trim: true, comment: "Quote No, p, false, true, true, true, true, true, true, , , , ," },
proposalRef: { type: Schema.Types.ObjectId, ref: "proposals", comment: "Proposal Ref, dropdown, false, true, true, true, true, true, true, proposals, proposals, one-to-one, proposalRef," },
client: { type: Schema.Types.ObjectId, ref: "clients", comment: "Client, dropdown, false, true, true, true, true, true, true, clients, clients, one-to-one, company," },
attentionTo: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Attention To, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
projectTitle: { type:  String , comment: "Project Title, p, false, true, true, true, true, true, true, , , , ," },
quoteDate: { type: Date, comment: "Quote Date, p_date, false, true, true, true, true, true, true, , , , ," },
validTillDate: { type: Date, comment: "Valid Till Date, p_date, false, true, true, true, true, true, true, , , , ," },
paymentTerms: { type:  String , comment: "Payment Terms, p, false, true, true, true, true, true, true, , , , ," },
paymentMethod: { type:  String , comment: "Payment Method, p, false, true, true, true, true, true, true, , , , ," },
preparedBy: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Prepared By, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
currency: { type: Number, max: 10000000, comment: "Currency, p_number, false, true, true, true, true, true, true, , , , ," },
subTotal: { type: Number, comment: "Sub Total, p_number, false, true, true, true, true, true, true, , , , ," },
discount: { type: Number, comment: "Discount, p_number, false, true, true, true, true, true, true, , , , ," },
taxRate: { type: Number, comment: "Tax Rate, p_number, false, true, true, true, true, true, true, , , , ," },
taxAmount: { type: Number, comment: "Tax Amount, p_number, false, true, true, true, true, true, true, , , , ," },
finalAmount: { type: Number, comment: "Final Amount, p_number, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
generatedDoc: { type:  String , comment: "Generated Doc, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };

    module.exports = function (app) {
        const modelName = "proposals";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            proposalRef: { type:  String , comment: "Proposal Ref, p, false, true, true, true, true, true, true, , , , ," },
leadNo: { type: Schema.Types.ObjectId, ref: "leads", comment: "Lead No, dropdown, false, true, true, true, true, true, true, leads, leads, one-to-one, companyName," },
projectTitle: { type:  String , comment: "Project Title, p, false, true, true, true, true, true, true, , , , ," },
proposalDate: { type: Date, comment: "Proposal Date, p_date, false, true, true, true, true, true, true, , , , ," },
validTillDate: { type: Date, comment: "Valid Till Date, p_date, false, true, true, true, true, true, true, , , , ," },
scopeSummary: { type:  String , comment: "Scope Summary, p, false, true, true, true, true, true, true, , , , ," },
estimatedAmount: { type: Number, comment: "Estimated Amount, currency, false, true, true, true, true, true, true, , , , ," },
currency: { type:  String , comment: "Currency, p, false, true, true, true, true, true, true, , , , ," },
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
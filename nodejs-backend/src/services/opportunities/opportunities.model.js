
    module.exports = function (app) {
        const modelName = "opportunities";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            clientNo: { type: Schema.Types.ObjectId, ref: "clients", comment: "Client No, dropdown, false, true, true, true, true, true, true, clients, clients, one-to-one, clientNo," },
leadNo: { type: Schema.Types.ObjectId, ref: "leads", comment: "Lead No, dropdown, false, true, true, true, true, true, true, leads, leads, one-to-one, companyName," },
opportunityName: { type:  String , comment: "Opportunity Name, p, false, true, true, true, true, true, true, , , , ," },
requestType: { type:  String , comment: "Request Type, p, false, true, true, true, true, true, true, , , , ," },
requestDate: { type: Date, comment: "Request Date, p_date, false, true, true, true, true, true, true, , , , ," },
contactName: { type:  String , comment: "Contact Name, p, false, true, true, true, true, true, true, , , , ," },
responsibleTo: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Responsible To, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
estimatedValue: { type: Number, comment: "Estimated Value, p_number, false, true, true, true, true, true, true, , , , ," },
currency: { type:  String , comment: "Currency, p, false, true, true, true, true, true, true, , , , ," },
stage: { type:  String , comment: "Stage, p, false, true, true, true, true, true, true, , , , ," },
probability: { type: Number, comment: "Probability, p_number, false, true, true, true, true, true, true, , , , ," },
expectedCloseDate: { type: Number, comment: "Expected Close Date, p_number, false, true, true, true, true, true, true, , , , ," },
outcome: { type:  String , comment: "Outcome, p, false, true, true, true, true, true, true, , , , ," },
nextAction: { type:  String , comment: "Next Action, p, false, true, true, true, true, true, true, , , , ," },
accountableTo: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Accountable To, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
consultedTo: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Consulted To, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
informedTo: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Informed To, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
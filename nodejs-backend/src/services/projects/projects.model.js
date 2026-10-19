
    module.exports = function (app) {
        const modelName = "projects";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            projectNo: { type:  String , comment: "Project No, p, false, true, true, true, true, true, true, , , , ," },
client: { type: Schema.Types.ObjectId, ref: "clients", comment: "Client, dropdown, false, true, true, true, true, true, true, clients, clients, one-to-one, company," },
proposalRef: { type: Schema.Types.ObjectId, ref: "proposals", comment: "Proposal Ref, dropdown, false, true, true, true, true, true, true, proposals, proposals, one-to-one, proposalRef," },
quoteNo: { type: Schema.Types.ObjectId, ref: "quotations", comment: "Quote No, dropdown, false, true, true, true, true, true, true, quotations, quotations, one-to-one, quoteNo," },
projectName: { type:  String , comment: "Project Name, p, false, true, true, true, true, true, true, , , , ," },
projectManager: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Project Manager, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
startDate: { type: Date, comment: "Start Date, p_date, false, true, true, true, true, true, true, , , , ," },
targetEndDate: { type: Date, comment: "Target End Date, p_date, false, true, true, true, true, true, true, , , , ," },
projectValue: { type: Number, comment: "Project Value, p_number, false, true, true, true, true, true, true, , , , ," },
currency: { type: Number, max: 10000000, comment: "Currency, p_number, false, true, true, true, true, true, true, , , , ," },
phase: { type:  String , comment: "Phase, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
progress: { type: Number, comment: "Progress, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
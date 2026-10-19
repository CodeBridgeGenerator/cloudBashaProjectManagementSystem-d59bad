
    module.exports = function (app) {
        const modelName = "renewals";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            renewalNo: { type:  String , comment: "Renewal No, p, false, true, true, true, true, true, true, , , , ," },
renewalType: { type:  String , comment: "Renewal Type, p, false, true, true, true, true, true, true, , , , ," },
referenceNo: { type:  String , comment: "Reference No, p, false, true, true, true, true, true, true, , , , ," },
clientName: { type: Schema.Types.ObjectId, ref: "clients", comment: "Client Name, dropdown, false, true, true, true, true, true, true, clients, clients, one-to-one, company," },
projectName: { type: Schema.Types.ObjectId, ref: "projects", comment: "Project Name, dropdown, false, true, true, true, true, true, true, projects, projects, one-to-one, projectName," },
currentEndDate: { type: Date, comment: "Current End Date, p_date, false, true, true, true, true, true, true, , , , ," },
renewalDate: { type: Date, comment: "Renewal Date, p_date, false, true, true, true, true, true, true, , , , ," },
renewalAmount: { type: Number, comment: "Renewal Amount, p_number, false, true, true, true, true, true, true, , , , ," },
currency: { type:  String , comment: "Currency, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
assignedTo: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Assigned To, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
notes: { type:  String , comment: "Notes, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
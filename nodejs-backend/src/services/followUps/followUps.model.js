
    module.exports = function (app) {
        const modelName = "follow_ups";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            referenceType: { type:  String , comment: "Reference Type, p, false, true, true, true, true, true, true, , , , ," },
referenceNo: { type:  String , comment: "Reference No, p, false, true, true, true, true, true, true, , , , ," },
assignedTo: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Assigned To, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
followUpType: { type:  String , comment: "Follow Up Type, p, false, true, true, true, true, true, true, , , , ," },
subject: { type:  String , comment: "Subject, p, false, true, true, true, true, true, true, , , , ," },
followUpDate: { type: Date, comment: "Follow Up Date, calendar_24, false, true, true, true, true, true, true, , , , ," },
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
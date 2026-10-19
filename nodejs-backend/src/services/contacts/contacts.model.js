
    module.exports = function (app) {
        const modelName = "contacts";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            contactName: { type:  String , comment: "Contact Name, p, false, true, true, true, true, true, true, , , , ," },
company: { type:  String , comment: "Company, p, false, true, true, true, true, true, true, , , , ," },
position: { type:  String , comment: "Position, p, false, true, true, true, true, true, true, , , , ," },
email: { type:  String , comment: "Email, p, false, true, true, true, true, true, true, , , , ," },
phone: { type:  String , comment: "Phone, p, false, true, true, true, true, true, true, , , , ," },
department: { type:  String , comment: "Department, p, false, true, true, true, true, true, true, , , , ," },
primaryContact: { type: Boolean, required: false, comment: "Primary Contact, p_boolean, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };

    module.exports = function (app) {
        const modelName = "clients";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            clientNo: { type:  String , comment: "Client No, p, false, true, true, true, true, true, true, , , , ," },
company: { type: Schema.Types.ObjectId, ref: "companies", comment: "Company, dropdown, false, true, true, true, true, true, true, companies, companies, one-to-one, name," },
primaryContact: { type:  String , comment: "Primary Contact, p, false, true, true, true, true, true, true, , , , ," },
email: { type:  String , comment: "Email, p, false, true, true, true, true, true, true, , , , ," },
phone: { type:  String , comment: "Phone, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
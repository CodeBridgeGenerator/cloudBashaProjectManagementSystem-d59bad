
    module.exports = function (app) {
        const modelName = "service_catalogue";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            serviceCode: { type:  String , comment: "Service Code, p, false, true, true, true, true, true, true, , , , ," },
serviceName: { type:  String , comment: "Service Name, p, false, true, true, true, true, true, true, , , , ," },
serviceCategory: { type:  String , comment: "Service Category, p, false, true, true, true, true, true, true, , , , ," },
billingType: { type:  String , comment: "Billing Type, p, false, true, true, true, true, true, true, , , , ," },
defaultUnit: { type:  String , maxLength: 150, index: true, trim: true, comment: "Default Unit, p, false, true, true, true, true, true, true, , , , ," },
defaultUnitPrice: { type: Number, comment: "Default Unit Price, p_number, false, true, true, true, true, true, true, , , , ," },
currency: { type:  String , comment: "Currency, p, false, true, true, true, true, true, true, , , , ," },
active: { type: Boolean, required: false, comment: "Active, p_boolean, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
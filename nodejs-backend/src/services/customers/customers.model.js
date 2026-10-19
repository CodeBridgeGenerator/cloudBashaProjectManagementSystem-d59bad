
    module.exports = function (app) {
        const modelName = "customers";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerNo: { type:  String , comment: "Customer No, p, false, true, true, true, true, true, true, , , , ," },
customerName: { type:  String , comment: "Customer Name, p, false, true, true, true, true, true, true, , , , ," },
email: { type:  String , comment: "Email, p, false, true, true, true, true, true, true, , , , ," },
phone: { type:  String , comment: "Phone, p, false, true, true, true, true, true, true, , , , ," },
customerType: { type:  String , comment: "Customer Type, p, false, true, true, true, true, true, true, , , , ," },
productOrService: { type:  String , comment: "Product Or Service, p, false, true, true, true, true, true, true, , , , ," },
subscriptionStatus: { type:  String , comment: "Subscription Status, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, avatar, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
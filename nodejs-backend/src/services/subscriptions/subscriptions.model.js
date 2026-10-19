
    module.exports = function (app) {
        const modelName = "subscriptions";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            subscriptionNo: { type:  String , comment: "Subscription No, p, false, true, true, true, true, true, true, , , , ," },
clientName: { type: Schema.Types.ObjectId, ref: "clients", comment: "Client Name, dropdown, false, true, true, true, true, true, true, clients, clients, one-to-one, company," },
projectName: { type: Schema.Types.ObjectId, ref: "projects", comment: "Project Name, dropdown, false, true, true, true, true, true, true, projects, projects, one-to-one, projectName," },
serviceName: { type:  String , comment: "Service Name, p, false, true, true, true, true, true, true, , , , ," },
provider: { type:  String , comment: "Provider, p, false, true, true, true, true, true, true, , , , ," },
startDate: { type:  String , comment: "Start Date, p, false, true, true, true, true, true, true, , , , ," },
renewalDate: { type:  String , comment: "Renewal Date, p, false, true, true, true, true, true, true, , , , ," },
billingCycle: { type:  String , comment: "Billing Cycle, p, false, true, true, true, true, true, true, , , , ," },
cost: { type: Number, comment: "Cost, p_number, false, true, true, true, true, true, true, , , , ," },
sellingPrice: { type: Number, comment: "Selling Price, p_number, false, true, true, true, true, true, true, , , , ," },
currency: { type:  String , comment: "Currency, p, false, true, true, true, true, true, true, , , , ," },
autoRenew: { type: Boolean, required: false, comment: "Auto Renew, p_boolean, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
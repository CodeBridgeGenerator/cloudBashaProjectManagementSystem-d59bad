
    module.exports = function (app) {
        const modelName = "sm_items";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            smNo: { type:  String , comment: "SM No, p, false, true, true, true, true, true, true, , , , ," },
serviceName: { type:  String , comment: "Service Name, p, false, true, true, true, true, true, true, , , , ," },
quantity: { type: Number, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
specification: { type:  String , comment: "Specification, p, false, true, true, true, true, true, true, , , , ," },
costingBasis: { type:  String , comment: "Costing Basis, p, false, true, true, true, true, true, true, , , , ," },
included: { type: Boolean, required: false, comment: "Included, p_boolean, false, true, true, true, true, true, true, , , , ," },
billingCycle: { type:  String , comment: "Billing Cycle, p, false, true, true, true, true, true, true, , , , ," },
unitPrice: { type: Number, comment: "Unit Price, p_number, false, true, true, true, true, true, true, , , , ," },
annualAmount: { type: Number, comment: "Annual Amount, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
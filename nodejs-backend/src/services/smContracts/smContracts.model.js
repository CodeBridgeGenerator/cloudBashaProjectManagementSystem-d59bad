
    module.exports = function (app) {
        const modelName = "sm_contracts";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            sMNo: { type:  String , comment: "S M No, p, false, true, true, true, true, true, true, , , , ," },
clientName: { type: Schema.Types.ObjectId, ref: "clients", comment: "Client Name, dropdown, false, true, true, true, true, true, true, clients, clients, one-to-one, company," },
projectName: { type: Schema.Types.ObjectId, ref: "projects", comment: "Project Name, dropdown, false, true, true, true, true, true, true, projects, projects, one-to-one, projectName," },
quoteNo: { type: Schema.Types.ObjectId, ref: "quotations", comment: "Quote No, dropdown, false, true, true, true, true, true, true, quotations, quotations, one-to-one, quoteNo," },
agreementTitle: { type:  String , comment: "Agreement Title, p, false, true, true, true, true, true, true, , , , ," },
startDate: { type: Date, comment: "Start Date, p_date, false, true, true, true, true, true, true, , , , ," },
endDate: { type: Date, comment: "End Date, p_date, false, true, true, true, true, true, true, , , , ," },
contractPeriod: { type:  String , comment: "Contract Period, p, false, true, true, true, true, true, true, , , , ," },
paymentTerms: { type:  String , comment: "Payment Terms, p, false, true, true, true, true, true, true, , , , ," },
currency: { type:  String , comment: "Currency, p, false, true, true, true, true, true, true, , , , ," },
subTotal: { type: Number, comment: "Sub Total, p_number, false, true, true, true, true, true, true, , , , ," },
taxRate: { type: Number, comment: "Tax Rate, p_number, false, true, true, true, true, true, true, , , , ," },
finalAmount: { type: Number, comment: "Final Amount, p_number, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
nextRenewalDate: { type:  String , comment: "Next Renewal Date, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
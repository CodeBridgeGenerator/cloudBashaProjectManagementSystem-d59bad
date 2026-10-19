
    module.exports = function (app) {
        const modelName = "payments";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            paymentNo: { type:  String , comment: "Payment No, p, false, true, true, true, true, true, true, , , , ," },
projectName: { type:  String , comment: "Project Name, p, false, true, true, true, true, true, true, , , , ," },
clientName: { type: Schema.Types.ObjectId, ref: "clients", comment: "Client Name, dropdown, false, true, true, true, true, true, true, clients, clients, one-to-one, company," },
invoiceNo: { type: Schema.Types.ObjectId, ref: "invoices", comment: "Invoice No, dropdown, false, true, true, true, true, true, true, invoices, invoices, one-to-one, invoiceNo," },
projectName: { type: Schema.Types.ObjectId, ref: "projects", comment: "Project Name, dropdown, false, true, true, true, true, true, true, projects, projects, one-to-one, projectName," },
paymentDate: { type: Date, comment: "Payment Date, p_date, false, true, true, true, true, true, true, , , , ," },
amount: { type: Number, comment: "Amount, p_number, false, true, true, true, true, true, true, , , , ," },
currency: { type:  String , comment: "Currency, p, false, true, true, true, true, true, true, , , , ," },
paymentMethod: { type:  String , comment: "Payment Method, p, false, true, true, true, true, true, true, , , , ," },
referenceNo: { type:  String , comment: "Reference No, p, false, true, true, true, true, true, true, , , , ," },
notes: { type:  String , comment: "Notes, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
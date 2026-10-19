
    module.exports = function (app) {
        const modelName = "receipts";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            receiptNo: { type:  String , comment: "Receipt No, p, false, true, true, true, true, true, true, , , , ," },
paymentNo: { type: Schema.Types.ObjectId, ref: "payments", comment: "Payment No, dropdown, false, true, true, true, true, true, true, payments, payments, one-to-one, paymentNo," },
clientName: { type: Schema.Types.ObjectId, ref: "clients", comment: "Client Name, dropdown, false, true, true, true, true, true, true, clients, clients, one-to-one, company," },
invoiceNo: { type:  String , comment: "Invoice No, p, false, true, true, true, true, true, true, , , , ," },
receiptDate: { type: Date, comment: "Receipt Date, p_date, false, true, true, true, true, true, true, , , , ," },
amount: { type: Number, comment: "Amount, p_number, false, true, true, true, true, true, true, , , , ," },
currency: { type:  String , comment: "Currency, p, false, true, true, true, true, true, true, , , , ," },
receiptFile: { type:  String , comment: "Receipt File, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
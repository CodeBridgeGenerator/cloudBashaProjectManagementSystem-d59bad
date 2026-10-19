
    module.exports = function (app) {
        const modelName = "invoices";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            invoiceNo: { type:  String , comment: "Invoice No, p, false, true, true, true, true, true, true, , , , ," },
clientName: { type: Schema.Types.ObjectId, ref: "clients", comment: "Client Name, dropdown, false, true, true, true, true, true, true, clients, clients, one-to-one, company," },
projectName: { type: Schema.Types.ObjectId, ref: "projects", comment: "Project Name, dropdown, false, true, true, true, true, true, true, projects, projects, one-to-one, projectName," },
quoteNo: { type: Schema.Types.ObjectId, ref: "quotations", comment: "Quote No, dropdown, false, true, true, true, true, true, true, quotations, quotations, one-to-one, quoteNo," },
milestone: { type:  String , comment: "Milestone, p, false, true, true, true, true, true, true, , , , ," },
invoiceDate: { type: Date, comment: "Invoice Date, p_date, false, true, true, true, true, true, true, , , , ," },
dueDate: { type: Date, comment: "Due Date, p_date, false, true, true, true, true, true, true, , , , ," },
currency: { type:  String , comment: "Currency, p, false, true, true, true, true, true, true, , , , ," },
subTotal: { type: Number, comment: "Sub Total, p_number, false, true, true, true, true, true, true, , , , ," },
discount: { type: Number, comment: "Discount, p_number, false, true, true, true, true, true, true, , , , ," },
taxRate: { type: Number, comment: "Tax Rate, p_number, false, true, true, true, true, true, true, , , , ," },
taxAmount: { type: Number, comment: "Tax Amount, p_number, false, true, true, true, true, true, true, , , , ," },
totalAmount: { type: Number, comment: "Total Amount, p_number, false, true, true, true, true, true, true, , , , ," },
paidAmount: { type: Number, comment: "Paid Amount, p_number, false, true, true, true, true, true, true, , , , ," },
balance: { type: Number, comment: "Balance, p_number, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };
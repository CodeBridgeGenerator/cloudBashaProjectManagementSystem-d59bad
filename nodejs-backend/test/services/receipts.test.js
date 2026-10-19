const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("receipts service", async () => {
  let thisService;
  let receiptCreated;
  let usersServiceResults;
  let users;

  const clientsCreated = await app.service("clients").Model.create({"receiptNo":"new value","paymentNo":"new value","projectName":"new value","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value"});
const clientsCreated = await app.service("clients").Model.create({"receiptNo":"new value","paymentNo":"new value","projectName":"parentObjectId","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","invoiceNo":"new value","projectNo":"new value","client":"parentObjectId"});
const leadsCreated = await app.service("leads").Model.create({"receiptNo":"new value","paymentNo":"new value","projectName":"parentObjectId","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","invoiceNo":"new value","projectNo":"new value","client":`${clientsCreated._id}`,"proposalRef":"new value","leadNo":"parentObjectId","companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value"});
const proposalsCreated = await app.service("proposals").Model.create({"receiptNo":"new value","paymentNo":"new value","projectName":"parentObjectId","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","invoiceNo":"new value","projectNo":"new value","client":`${clientsCreated._id}`,"proposalRef":"new value","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.721Z","validTillDate":"2026-10-19T15:23:12.721Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value"});
const quotationsCreated = await app.service("quotations").Model.create({"receiptNo":"new value","paymentNo":"new value","projectName":"parentObjectId","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","invoiceNo":"new value","projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.721Z","validTillDate":"2026-10-19T15:23:12.721Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":"new value","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.721Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23});
const projectsCreated = await app.service("projects").Model.create({"receiptNo":"new value","paymentNo":"new value","projectName":"new value","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","invoiceNo":"new value","projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.721Z","validTillDate":"2026-10-19T15:23:12.721Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.721Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.722Z","targetEndDate":"2026-10-19T15:23:12.722Z","projectValue":23,"phase":"new value","progress":23});
const invoicesCreated = await app.service("invoices").Model.create({"receiptNo":"new value","paymentNo":"new value","projectName":`${projectsCreated._id}`,"clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","invoiceNo":"new value","projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.721Z","validTillDate":"2026-10-19T15:23:12.721Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value","quoteNo":"parentObjectId","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.721Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.722Z","targetEndDate":"2026-10-19T15:23:12.722Z","projectValue":23,"phase":"new value","progress":23,"milestone":"new value","invoiceDate":"2026-10-19T15:23:12.722Z","dueDate":"2026-10-19T15:23:12.722Z","totalAmount":23,"paidAmount":23,"balance":23});
const paymentsCreated = await app.service("payments").Model.create({"receiptNo":"new value","paymentNo":"new value","projectName":"parentObjectId","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","invoiceNo":`${invoicesCreated._id}`,"projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.721Z","validTillDate":"2026-10-19T15:23:12.721Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value","quoteNo":"parentObjectId","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.721Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.722Z","targetEndDate":"2026-10-19T15:23:12.722Z","projectValue":23,"phase":"new value","progress":23,"milestone":"new value","invoiceDate":"2026-10-19T15:23:12.722Z","dueDate":"2026-10-19T15:23:12.722Z","totalAmount":23,"paidAmount":23,"balance":23,"paymentDate":"2026-10-19T15:23:12.722Z","amount":23,"referenceNo":"new value"});

  beforeEach(async () => {
    thisService = await app.service("receipts");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (receipts)");
  });

  describe("#create", () => {
    const options = {"receiptNo":"new value","paymentNo":`${paymentsCreated._id}`,"projectName":"parentObjectId","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","invoiceNo":"new value","projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.721Z","validTillDate":"2026-10-19T15:23:12.721Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value","quoteNo":"parentObjectId","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.721Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.722Z","targetEndDate":"2026-10-19T15:23:12.722Z","projectValue":23,"phase":"new value","progress":23,"milestone":"new value","invoiceDate":"2026-10-19T15:23:12.722Z","dueDate":"2026-10-19T15:23:12.722Z","totalAmount":23,"paidAmount":23,"balance":23,"paymentDate":"2026-10-19T15:23:12.722Z","amount":23,"referenceNo":"new value","receiptDate":"2026-10-19T15:23:12.723Z","receiptFile":"new value"};

    beforeEach(async () => {
      receiptCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new receipt", () => {
      assert.strictEqual(receiptCreated.receiptNo, options.receiptNo);
assert.strictEqual(receiptCreated.paymentNo.toString(), options.paymentNo.toString());
assert.strictEqual(receiptCreated.clientName.toString(), options.clientName.toString());
assert.strictEqual(receiptCreated.invoiceNo, options.invoiceNo);
assert.strictEqual(receiptCreated.receiptDate.toISOString(), options.receiptDate);
assert.strictEqual(receiptCreated.amount, options.amount);
assert.strictEqual(receiptCreated.currency, options.currency);
assert.strictEqual(receiptCreated.receiptFile, options.receiptFile);
    });
  });

  describe("#get", () => {
    it("should retrieve a receipt by ID", async () => {
      const retrieved = await thisService.Model.findById(receiptCreated._id);
      assert.strictEqual(retrieved._id.toString(), receiptCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"receiptNo":"updated value","paymentNo":`${paymentsCreated._id}`,"clientName":`${clientsCreated._id}`,"invoiceNo":"updated value","receiptDate":"2026-10-19T15:23:12.723Z","amount":100,"currency":"updated value","receiptFile":"updated value"};

    it("should update an existing receipt ", async () => {
      const receiptUpdated = await thisService.Model.findByIdAndUpdate(
        receiptCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(receiptUpdated.receiptNo, options.receiptNo);
assert.strictEqual(receiptUpdated.paymentNo.toString(), options.paymentNo.toString());
assert.strictEqual(receiptUpdated.clientName.toString(), options.clientName.toString());
assert.strictEqual(receiptUpdated.invoiceNo, options.invoiceNo);
assert.strictEqual(receiptUpdated.receiptDate.toISOString(), options.receiptDate);
assert.strictEqual(receiptUpdated.amount, options.amount);
assert.strictEqual(receiptUpdated.currency, options.currency);
assert.strictEqual(receiptUpdated.receiptFile, options.receiptFile);
    });
  });

  describe("#delete", async () => {
    it("should delete a receipt", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("proposals").Model.findByIdAndDelete(proposalsCreated._id);
await app.service("quotations").Model.findByIdAndDelete(quotationsCreated._id);
await app.service("projects").Model.findByIdAndDelete(projectsCreated._id);
await app.service("invoices").Model.findByIdAndDelete(invoicesCreated._id);
await app.service("payments").Model.findByIdAndDelete(paymentsCreated._id);;

      const receiptDeleted = await thisService.Model.findByIdAndDelete(receiptCreated._id);
      assert.strictEqual(receiptDeleted._id.toString(), receiptCreated._id.toString());
    });
  });
});
const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("payments service", async () => {
  let thisService;
  let paymentCreated;
  let usersServiceResults;
  let users;

  const clientsCreated = await app.service("clients").Model.create({"paymentNo":"new value","projectName":"new value","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value"});
const clientsCreated = await app.service("clients").Model.create({"paymentNo":"new value","projectName":"parentObjectId","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","invoiceNo":"new value","projectNo":"new value","client":"parentObjectId"});
const leadsCreated = await app.service("leads").Model.create({"paymentNo":"new value","projectName":"parentObjectId","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","invoiceNo":"new value","projectNo":"new value","client":`${clientsCreated._id}`,"proposalRef":"new value","leadNo":"parentObjectId","companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value"});
const proposalsCreated = await app.service("proposals").Model.create({"paymentNo":"new value","projectName":"parentObjectId","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","invoiceNo":"new value","projectNo":"new value","client":`${clientsCreated._id}`,"proposalRef":"new value","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.641Z","validTillDate":"2026-10-19T15:23:12.641Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value"});
const quotationsCreated = await app.service("quotations").Model.create({"paymentNo":"new value","projectName":"parentObjectId","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","invoiceNo":"new value","projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.641Z","validTillDate":"2026-10-19T15:23:12.646Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":"new value","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.646Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23});
const projectsCreated = await app.service("projects").Model.create({"paymentNo":"new value","projectName":"new value","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","invoiceNo":"new value","projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.641Z","validTillDate":"2026-10-19T15:23:12.646Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.646Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.647Z","targetEndDate":"2026-10-19T15:23:12.647Z","projectValue":23,"phase":"new value","progress":23});
const invoicesCreated = await app.service("invoices").Model.create({"paymentNo":"new value","projectName":`${projectsCreated._id}`,"clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","invoiceNo":"new value","projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.641Z","validTillDate":"2026-10-19T15:23:12.646Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value","quoteNo":"parentObjectId","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.646Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.647Z","targetEndDate":"2026-10-19T15:23:12.647Z","projectValue":23,"phase":"new value","progress":23,"milestone":"new value","invoiceDate":"2026-10-19T15:23:12.647Z","dueDate":"2026-10-19T15:23:12.647Z","totalAmount":23,"paidAmount":23,"balance":23});

  beforeEach(async () => {
    thisService = await app.service("payments");

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
    assert.ok(thisService, "Registered the service (payments)");
  });

  describe("#create", () => {
    const options = {"paymentNo":"new value","projectName":"parentObjectId","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","invoiceNo":`${invoicesCreated._id}`,"projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.641Z","validTillDate":"2026-10-19T15:23:12.646Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value","quoteNo":"parentObjectId","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.646Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.647Z","targetEndDate":"2026-10-19T15:23:12.647Z","projectValue":23,"phase":"new value","progress":23,"milestone":"new value","invoiceDate":"2026-10-19T15:23:12.647Z","dueDate":"2026-10-19T15:23:12.647Z","totalAmount":23,"paidAmount":23,"balance":23,"paymentDate":"2026-10-19T15:23:12.647Z","amount":23,"referenceNo":"new value"};

    beforeEach(async () => {
      paymentCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new payment", () => {
      assert.strictEqual(paymentCreated.paymentNo, options.paymentNo);
assert.strictEqual(paymentCreated.projectName, options.projectName);
assert.strictEqual(paymentCreated.clientName.toString(), options.clientName.toString());
assert.strictEqual(paymentCreated.invoiceNo.toString(), options.invoiceNo.toString());
assert.strictEqual(paymentCreated.projectName.toString(), options.projectName.toString());
assert.strictEqual(paymentCreated.paymentDate.toISOString(), options.paymentDate);
assert.strictEqual(paymentCreated.amount, options.amount);
assert.strictEqual(paymentCreated.currency, options.currency);
assert.strictEqual(paymentCreated.paymentMethod, options.paymentMethod);
assert.strictEqual(paymentCreated.referenceNo, options.referenceNo);
assert.strictEqual(paymentCreated.notes, options.notes);
    });
  });

  describe("#get", () => {
    it("should retrieve a payment by ID", async () => {
      const retrieved = await thisService.Model.findById(paymentCreated._id);
      assert.strictEqual(retrieved._id.toString(), paymentCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"paymentNo":"updated value","projectName":`${projectsCreated._id}`,"clientName":`${clientsCreated._id}`,"invoiceNo":`${invoicesCreated._id}`,"paymentDate":"2026-10-19T15:23:12.647Z","amount":100,"currency":"updated value","paymentMethod":"updated value","referenceNo":"updated value","notes":"updated value"};

    it("should update an existing payment ", async () => {
      const paymentUpdated = await thisService.Model.findByIdAndUpdate(
        paymentCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(paymentUpdated.paymentNo, options.paymentNo);
assert.strictEqual(paymentUpdated.projectName, options.projectName);
assert.strictEqual(paymentUpdated.clientName.toString(), options.clientName.toString());
assert.strictEqual(paymentUpdated.invoiceNo.toString(), options.invoiceNo.toString());
assert.strictEqual(paymentUpdated.projectName.toString(), options.projectName.toString());
assert.strictEqual(paymentUpdated.paymentDate.toISOString(), options.paymentDate);
assert.strictEqual(paymentUpdated.amount, options.amount);
assert.strictEqual(paymentUpdated.currency, options.currency);
assert.strictEqual(paymentUpdated.paymentMethod, options.paymentMethod);
assert.strictEqual(paymentUpdated.referenceNo, options.referenceNo);
assert.strictEqual(paymentUpdated.notes, options.notes);
    });
  });

  describe("#delete", async () => {
    it("should delete a payment", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("proposals").Model.findByIdAndDelete(proposalsCreated._id);
await app.service("quotations").Model.findByIdAndDelete(quotationsCreated._id);
await app.service("projects").Model.findByIdAndDelete(projectsCreated._id);
await app.service("invoices").Model.findByIdAndDelete(invoicesCreated._id);;

      const paymentDeleted = await thisService.Model.findByIdAndDelete(paymentCreated._id);
      assert.strictEqual(paymentDeleted._id.toString(), paymentCreated._id.toString());
    });
  });
});
const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("invoices service", async () => {
  let thisService;
  let invoiceCreated;
  let usersServiceResults;
  let users;

  const clientsCreated = await app.service("clients").Model.create({"invoiceNo":"new value","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value"});
const clientsCreated = await app.service("clients").Model.create({"invoiceNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId"});
const leadsCreated = await app.service("leads").Model.create({"invoiceNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":`${clientsCreated._id}`,"proposalRef":"new value","leadNo":"parentObjectId","companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value"});
const proposalsCreated = await app.service("proposals").Model.create({"invoiceNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":`${clientsCreated._id}`,"proposalRef":"new value","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.493Z","validTillDate":"2026-10-19T15:23:12.493Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value"});
const quotationsCreated = await app.service("quotations").Model.create({"invoiceNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.493Z","validTillDate":"2026-10-19T15:23:12.493Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":"new value","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.493Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23});
const projectsCreated = await app.service("projects").Model.create({"invoiceNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"new value","projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.493Z","validTillDate":"2026-10-19T15:23:12.493Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.493Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.493Z","targetEndDate":"2026-10-19T15:23:12.493Z","projectValue":23,"phase":"new value","progress":23});

  beforeEach(async () => {
    thisService = await app.service("invoices");

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
    assert.ok(thisService, "Registered the service (invoices)");
  });

  describe("#create", () => {
    const options = {"invoiceNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":`${projectsCreated._id}`,"projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.493Z","validTillDate":"2026-10-19T15:23:12.493Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value","quoteNo":"parentObjectId","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.493Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.493Z","targetEndDate":"2026-10-19T15:23:12.493Z","projectValue":23,"phase":"new value","progress":23,"milestone":"new value","invoiceDate":"2026-10-19T15:23:12.494Z","dueDate":"2026-10-19T15:23:12.494Z","totalAmount":23,"paidAmount":23,"balance":23};

    beforeEach(async () => {
      invoiceCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new invoice", () => {
      assert.strictEqual(invoiceCreated.invoiceNo, options.invoiceNo);
assert.strictEqual(invoiceCreated.clientName.toString(), options.clientName.toString());
assert.strictEqual(invoiceCreated.projectName.toString(), options.projectName.toString());
assert.strictEqual(invoiceCreated.quoteNo.toString(), options.quoteNo.toString());
assert.strictEqual(invoiceCreated.milestone, options.milestone);
assert.strictEqual(invoiceCreated.invoiceDate.toISOString(), options.invoiceDate);
assert.strictEqual(invoiceCreated.dueDate.toISOString(), options.dueDate);
assert.strictEqual(invoiceCreated.currency, options.currency);
assert.strictEqual(invoiceCreated.subTotal, options.subTotal);
assert.strictEqual(invoiceCreated.discount, options.discount);
assert.strictEqual(invoiceCreated.taxRate, options.taxRate);
assert.strictEqual(invoiceCreated.taxAmount, options.taxAmount);
assert.strictEqual(invoiceCreated.totalAmount, options.totalAmount);
assert.strictEqual(invoiceCreated.paidAmount, options.paidAmount);
assert.strictEqual(invoiceCreated.balance, options.balance);
assert.strictEqual(invoiceCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a invoice by ID", async () => {
      const retrieved = await thisService.Model.findById(invoiceCreated._id);
      assert.strictEqual(retrieved._id.toString(), invoiceCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"invoiceNo":"updated value","clientName":`${clientsCreated._id}`,"projectName":`${projectsCreated._id}`,"quoteNo":`${quotationsCreated._id}`,"milestone":"updated value","invoiceDate":"2026-10-19T15:23:12.494Z","dueDate":"2026-10-19T15:23:12.494Z","currency":"updated value","subTotal":100,"discount":100,"taxRate":100,"taxAmount":100,"totalAmount":100,"paidAmount":100,"balance":100,"status":"updated value"};

    it("should update an existing invoice ", async () => {
      const invoiceUpdated = await thisService.Model.findByIdAndUpdate(
        invoiceCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(invoiceUpdated.invoiceNo, options.invoiceNo);
assert.strictEqual(invoiceUpdated.clientName.toString(), options.clientName.toString());
assert.strictEqual(invoiceUpdated.projectName.toString(), options.projectName.toString());
assert.strictEqual(invoiceUpdated.quoteNo.toString(), options.quoteNo.toString());
assert.strictEqual(invoiceUpdated.milestone, options.milestone);
assert.strictEqual(invoiceUpdated.invoiceDate.toISOString(), options.invoiceDate);
assert.strictEqual(invoiceUpdated.dueDate.toISOString(), options.dueDate);
assert.strictEqual(invoiceUpdated.currency, options.currency);
assert.strictEqual(invoiceUpdated.subTotal, options.subTotal);
assert.strictEqual(invoiceUpdated.discount, options.discount);
assert.strictEqual(invoiceUpdated.taxRate, options.taxRate);
assert.strictEqual(invoiceUpdated.taxAmount, options.taxAmount);
assert.strictEqual(invoiceUpdated.totalAmount, options.totalAmount);
assert.strictEqual(invoiceUpdated.paidAmount, options.paidAmount);
assert.strictEqual(invoiceUpdated.balance, options.balance);
assert.strictEqual(invoiceUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a invoice", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("proposals").Model.findByIdAndDelete(proposalsCreated._id);
await app.service("quotations").Model.findByIdAndDelete(quotationsCreated._id);
await app.service("projects").Model.findByIdAndDelete(projectsCreated._id);;

      const invoiceDeleted = await thisService.Model.findByIdAndDelete(invoiceCreated._id);
      assert.strictEqual(invoiceDeleted._id.toString(), invoiceCreated._id.toString());
    });
  });
});
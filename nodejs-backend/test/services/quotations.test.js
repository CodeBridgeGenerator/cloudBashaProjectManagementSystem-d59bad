const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("quotations service", async () => {
  let thisService;
  let quotationCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"quoteNo":"new value","proposalRef":"new value","leadNo":"parentObjectId","companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value"});
const proposalsCreated = await app.service("proposals").Model.create({"quoteNo":"new value","proposalRef":"new value","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.324Z","validTillDate":"2026-10-19T15:23:12.324Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value"});
const clientsCreated = await app.service("clients").Model.create({"quoteNo":"new value","proposalRef":`${proposalsCreated._id}`,"leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.324Z","validTillDate":"2026-10-19T15:23:12.324Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value"});

  beforeEach(async () => {
    thisService = await app.service("quotations");

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
    assert.ok(thisService, "Registered the service (quotations)");
  });

  describe("#create", () => {
    const options = {"quoteNo":"new value","proposalRef":`${proposalsCreated._id}`,"leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.324Z","validTillDate":"2026-10-19T15:23:12.324Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","client":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.324Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23};

    beforeEach(async () => {
      quotationCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new quotation", () => {
      assert.strictEqual(quotationCreated.quoteNo, options.quoteNo);
assert.strictEqual(quotationCreated.proposalRef.toString(), options.proposalRef.toString());
assert.strictEqual(quotationCreated.client.toString(), options.client.toString());
assert.strictEqual(quotationCreated.attentionTo.toString(), options.attentionTo.toString());
assert.strictEqual(quotationCreated.projectTitle, options.projectTitle);
assert.strictEqual(quotationCreated.quoteDate.toISOString(), options.quoteDate);
assert.strictEqual(quotationCreated.validTillDate.toISOString(), options.validTillDate);
assert.strictEqual(quotationCreated.paymentTerms, options.paymentTerms);
assert.strictEqual(quotationCreated.paymentMethod, options.paymentMethod);
assert.strictEqual(quotationCreated.preparedBy.toString(), options.preparedBy.toString());
assert.strictEqual(quotationCreated.currency, options.currency);
assert.strictEqual(quotationCreated.subTotal, options.subTotal);
assert.strictEqual(quotationCreated.discount, options.discount);
assert.strictEqual(quotationCreated.taxRate, options.taxRate);
assert.strictEqual(quotationCreated.taxAmount, options.taxAmount);
assert.strictEqual(quotationCreated.finalAmount, options.finalAmount);
assert.strictEqual(quotationCreated.status, options.status);
assert.strictEqual(quotationCreated.generatedDoc, options.generatedDoc);
    });
  });

  describe("#get", () => {
    it("should retrieve a quotation by ID", async () => {
      const retrieved = await thisService.Model.findById(quotationCreated._id);
      assert.strictEqual(retrieved._id.toString(), quotationCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"quoteNo":"updated value","proposalRef":`${proposalsCreated._id}`,"client":`${clientsCreated._id}`,"attentionTo":`${profilesCreated._id}`,"projectTitle":"updated value","quoteDate":"2026-10-19T15:23:12.324Z","validTillDate":"2026-10-19T15:23:12.324Z","paymentTerms":"updated value","paymentMethod":"updated value","preparedBy":`${profilesCreated._id}`,"currency":100,"subTotal":100,"discount":100,"taxRate":100,"taxAmount":100,"finalAmount":100,"status":"updated value","generatedDoc":"updated value"};

    it("should update an existing quotation ", async () => {
      const quotationUpdated = await thisService.Model.findByIdAndUpdate(
        quotationCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(quotationUpdated.quoteNo, options.quoteNo);
assert.strictEqual(quotationUpdated.proposalRef.toString(), options.proposalRef.toString());
assert.strictEqual(quotationUpdated.client.toString(), options.client.toString());
assert.strictEqual(quotationUpdated.attentionTo.toString(), options.attentionTo.toString());
assert.strictEqual(quotationUpdated.projectTitle, options.projectTitle);
assert.strictEqual(quotationUpdated.quoteDate.toISOString(), options.quoteDate);
assert.strictEqual(quotationUpdated.validTillDate.toISOString(), options.validTillDate);
assert.strictEqual(quotationUpdated.paymentTerms, options.paymentTerms);
assert.strictEqual(quotationUpdated.paymentMethod, options.paymentMethod);
assert.strictEqual(quotationUpdated.preparedBy.toString(), options.preparedBy.toString());
assert.strictEqual(quotationUpdated.currency, options.currency);
assert.strictEqual(quotationUpdated.subTotal, options.subTotal);
assert.strictEqual(quotationUpdated.discount, options.discount);
assert.strictEqual(quotationUpdated.taxRate, options.taxRate);
assert.strictEqual(quotationUpdated.taxAmount, options.taxAmount);
assert.strictEqual(quotationUpdated.finalAmount, options.finalAmount);
assert.strictEqual(quotationUpdated.status, options.status);
assert.strictEqual(quotationUpdated.generatedDoc, options.generatedDoc);
    });
  });

  describe("#delete", async () => {
    it("should delete a quotation", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("proposals").Model.findByIdAndDelete(proposalsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);;

      const quotationDeleted = await thisService.Model.findByIdAndDelete(quotationCreated._id);
      assert.strictEqual(quotationDeleted._id.toString(), quotationCreated._id.toString());
    });
  });
});
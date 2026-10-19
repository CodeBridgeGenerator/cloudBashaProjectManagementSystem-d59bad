const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("quotationPaymentMilestones service", async () => {
  let thisService;
  let quotationPaymentMilestoneCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"quoteNo":"new value","proposalRef":"new value","leadNo":"parentObjectId","companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value"});
const proposalsCreated = await app.service("proposals").Model.create({"quoteNo":"new value","proposalRef":"new value","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.361Z","validTillDate":"2026-10-19T15:23:12.361Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value"});
const clientsCreated = await app.service("clients").Model.create({"quoteNo":"new value","proposalRef":`${proposalsCreated._id}`,"leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.361Z","validTillDate":"2026-10-19T15:23:12.361Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value"});
const quotationsCreated = await app.service("quotations").Model.create({"quoteNo":"new value","proposalRef":`${proposalsCreated._id}`,"leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.361Z","validTillDate":"2026-10-19T15:23:12.361Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","client":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.361Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23});

  beforeEach(async () => {
    thisService = await app.service("quotationPaymentMilestones");

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
    assert.ok(thisService, "Registered the service (quotationPaymentMilestones)");
  });

  describe("#create", () => {
    const options = {"quoteNo":`${quotationsCreated._id}`,"proposalRef":`${proposalsCreated._id}`,"leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.361Z","validTillDate":"2026-10-19T15:23:12.361Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","client":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.361Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"milestone":"new value","percentage":23,"beforeTaxAmount":23,"afterTaxAmount":23,"sequence":23};

    beforeEach(async () => {
      quotationPaymentMilestoneCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new quotationPaymentMilestone", () => {
      assert.strictEqual(quotationPaymentMilestoneCreated.quoteNo.toString(), options.quoteNo.toString());
assert.strictEqual(quotationPaymentMilestoneCreated.milestone, options.milestone);
assert.strictEqual(quotationPaymentMilestoneCreated.percentage, options.percentage);
assert.strictEqual(quotationPaymentMilestoneCreated.beforeTaxAmount, options.beforeTaxAmount);
assert.strictEqual(quotationPaymentMilestoneCreated.afterTaxAmount, options.afterTaxAmount);
assert.strictEqual(quotationPaymentMilestoneCreated.paymentTerms, options.paymentTerms);
assert.strictEqual(quotationPaymentMilestoneCreated.sequence, options.sequence);
    });
  });

  describe("#get", () => {
    it("should retrieve a quotationPaymentMilestone by ID", async () => {
      const retrieved = await thisService.Model.findById(quotationPaymentMilestoneCreated._id);
      assert.strictEqual(retrieved._id.toString(), quotationPaymentMilestoneCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"quoteNo":`${quotationsCreated._id}`,"milestone":"updated value","percentage":100,"beforeTaxAmount":100,"afterTaxAmount":100,"paymentTerms":"updated value","sequence":100};

    it("should update an existing quotationPaymentMilestone ", async () => {
      const quotationPaymentMilestoneUpdated = await thisService.Model.findByIdAndUpdate(
        quotationPaymentMilestoneCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(quotationPaymentMilestoneUpdated.quoteNo.toString(), options.quoteNo.toString());
assert.strictEqual(quotationPaymentMilestoneUpdated.milestone, options.milestone);
assert.strictEqual(quotationPaymentMilestoneUpdated.percentage, options.percentage);
assert.strictEqual(quotationPaymentMilestoneUpdated.beforeTaxAmount, options.beforeTaxAmount);
assert.strictEqual(quotationPaymentMilestoneUpdated.afterTaxAmount, options.afterTaxAmount);
assert.strictEqual(quotationPaymentMilestoneUpdated.paymentTerms, options.paymentTerms);
assert.strictEqual(quotationPaymentMilestoneUpdated.sequence, options.sequence);
    });
  });

  describe("#delete", async () => {
    it("should delete a quotationPaymentMilestone", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("proposals").Model.findByIdAndDelete(proposalsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("quotations").Model.findByIdAndDelete(quotationsCreated._id);;

      const quotationPaymentMilestoneDeleted = await thisService.Model.findByIdAndDelete(quotationPaymentMilestoneCreated._id);
      assert.strictEqual(quotationPaymentMilestoneDeleted._id.toString(), quotationPaymentMilestoneCreated._id.toString());
    });
  });
});
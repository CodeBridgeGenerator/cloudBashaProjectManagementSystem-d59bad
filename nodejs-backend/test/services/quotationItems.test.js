const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("quotationItems service", async () => {
  let thisService;
  let quotationItemCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"quoteNo":"new value","proposalRef":"new value","leadNo":"parentObjectId","companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value"});
const proposalsCreated = await app.service("proposals").Model.create({"quoteNo":"new value","proposalRef":"new value","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.342Z","validTillDate":"2026-10-19T15:23:12.342Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value"});
const clientsCreated = await app.service("clients").Model.create({"quoteNo":"new value","proposalRef":`${proposalsCreated._id}`,"leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.342Z","validTillDate":"2026-10-19T15:23:12.342Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value"});
const quotationsCreated = await app.service("quotations").Model.create({"quoteNo":"new value","proposalRef":`${proposalsCreated._id}`,"leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.342Z","validTillDate":"2026-10-19T15:23:12.342Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","client":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.342Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23});

  beforeEach(async () => {
    thisService = await app.service("quotationItems");

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
    assert.ok(thisService, "Registered the service (quotationItems)");
  });

  describe("#create", () => {
    const options = {"quoteNo":`${quotationsCreated._id}`,"proposalRef":`${proposalsCreated._id}`,"leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.342Z","validTillDate":"2026-10-19T15:23:12.342Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","client":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.342Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"category":"new value","serviceName":"new value","quantity":23,"unit":"new value","detailDescription":"new value","specification":"new value","included":true,"unitPrice":23,"amount":23};

    beforeEach(async () => {
      quotationItemCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new quotationItem", () => {
      assert.strictEqual(quotationItemCreated.quoteNo.toString(), options.quoteNo.toString());
assert.strictEqual(quotationItemCreated.category, options.category);
assert.strictEqual(quotationItemCreated.serviceName, options.serviceName);
assert.strictEqual(quotationItemCreated.quantity, options.quantity);
assert.strictEqual(quotationItemCreated.unit, options.unit);
assert.strictEqual(quotationItemCreated.detailDescription, options.detailDescription);
assert.strictEqual(quotationItemCreated.specification, options.specification);
assert.strictEqual(quotationItemCreated.included, options.included);
assert.strictEqual(quotationItemCreated.included, options.included);
assert.strictEqual(quotationItemCreated.unitPrice, options.unitPrice);
assert.strictEqual(quotationItemCreated.amount, options.amount);
    });
  });

  describe("#get", () => {
    it("should retrieve a quotationItem by ID", async () => {
      const retrieved = await thisService.Model.findById(quotationItemCreated._id);
      assert.strictEqual(retrieved._id.toString(), quotationItemCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"quoteNo":`${quotationsCreated._id}`,"category":"updated value","serviceName":"updated value","quantity":100,"unit":"updated value","detailDescription":"updated value","specification":"updated value","included":false,"unitPrice":100,"amount":100};

    it("should update an existing quotationItem ", async () => {
      const quotationItemUpdated = await thisService.Model.findByIdAndUpdate(
        quotationItemCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(quotationItemUpdated.quoteNo.toString(), options.quoteNo.toString());
assert.strictEqual(quotationItemUpdated.category, options.category);
assert.strictEqual(quotationItemUpdated.serviceName, options.serviceName);
assert.strictEqual(quotationItemUpdated.quantity, options.quantity);
assert.strictEqual(quotationItemUpdated.unit, options.unit);
assert.strictEqual(quotationItemUpdated.detailDescription, options.detailDescription);
assert.strictEqual(quotationItemUpdated.specification, options.specification);
assert.strictEqual(quotationItemUpdated.included, options.included);
assert.strictEqual(quotationItemUpdated.included, options.included);
assert.strictEqual(quotationItemUpdated.unitPrice, options.unitPrice);
assert.strictEqual(quotationItemUpdated.amount, options.amount);
    });
  });

  describe("#delete", async () => {
    it("should delete a quotationItem", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("proposals").Model.findByIdAndDelete(proposalsCreated._id);
await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("quotations").Model.findByIdAndDelete(quotationsCreated._id);;

      const quotationItemDeleted = await thisService.Model.findByIdAndDelete(quotationItemCreated._id);
      assert.strictEqual(quotationItemDeleted._id.toString(), quotationItemCreated._id.toString());
    });
  });
});
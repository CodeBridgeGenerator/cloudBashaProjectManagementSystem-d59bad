const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("subscriptions service", async () => {
  let thisService;
  let subscriptionCreated;
  let usersServiceResults;
  let users;

  const clientsCreated = await app.service("clients").Model.create({"subscriptionNo":"new value","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value"});
const clientsCreated = await app.service("clients").Model.create({"subscriptionNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId"});
const leadsCreated = await app.service("leads").Model.create({"subscriptionNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":`${clientsCreated._id}`,"proposalRef":"new value","leadNo":"parentObjectId","companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value"});
const proposalsCreated = await app.service("proposals").Model.create({"subscriptionNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":`${clientsCreated._id}`,"proposalRef":"new value","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.776Z","validTillDate":"2026-10-19T15:23:12.776Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value"});
const quotationsCreated = await app.service("quotations").Model.create({"subscriptionNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.776Z","validTillDate":"2026-10-19T15:23:12.776Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":"new value","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.776Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23});
const projectsCreated = await app.service("projects").Model.create({"subscriptionNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"new value","projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.776Z","validTillDate":"2026-10-19T15:23:12.776Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.776Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.777Z","targetEndDate":"2026-10-19T15:23:12.777Z","projectValue":23,"phase":"new value","progress":23});

  beforeEach(async () => {
    thisService = await app.service("subscriptions");

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
    assert.ok(thisService, "Registered the service (subscriptions)");
  });

  describe("#create", () => {
    const options = {"subscriptionNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":`${projectsCreated._id}`,"projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.776Z","validTillDate":"2026-10-19T15:23:12.776Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.776Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"new value","targetEndDate":"2026-10-19T15:23:12.777Z","projectValue":23,"phase":"new value","progress":23,"serviceName":"new value","provider":"new value","renewalDate":"new value","billingCycle":"new value","cost":23,"sellingPrice":23,"autoRenew":true};

    beforeEach(async () => {
      subscriptionCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new subscription", () => {
      assert.strictEqual(subscriptionCreated.subscriptionNo, options.subscriptionNo);
assert.strictEqual(subscriptionCreated.clientName.toString(), options.clientName.toString());
assert.strictEqual(subscriptionCreated.projectName.toString(), options.projectName.toString());
assert.strictEqual(subscriptionCreated.serviceName, options.serviceName);
assert.strictEqual(subscriptionCreated.provider, options.provider);
assert.strictEqual(subscriptionCreated.startDate, options.startDate);
assert.strictEqual(subscriptionCreated.renewalDate, options.renewalDate);
assert.strictEqual(subscriptionCreated.billingCycle, options.billingCycle);
assert.strictEqual(subscriptionCreated.cost, options.cost);
assert.strictEqual(subscriptionCreated.sellingPrice, options.sellingPrice);
assert.strictEqual(subscriptionCreated.currency, options.currency);
assert.strictEqual(subscriptionCreated.autoRenew, options.autoRenew);
assert.strictEqual(subscriptionCreated.autoRenew, options.autoRenew);
assert.strictEqual(subscriptionCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a subscription by ID", async () => {
      const retrieved = await thisService.Model.findById(subscriptionCreated._id);
      assert.strictEqual(retrieved._id.toString(), subscriptionCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"subscriptionNo":"updated value","clientName":`${clientsCreated._id}`,"projectName":`${projectsCreated._id}`,"serviceName":"updated value","provider":"updated value","startDate":"updated value","renewalDate":"updated value","billingCycle":"updated value","cost":100,"sellingPrice":100,"currency":"updated value","autoRenew":false,"status":"updated value"};

    it("should update an existing subscription ", async () => {
      const subscriptionUpdated = await thisService.Model.findByIdAndUpdate(
        subscriptionCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(subscriptionUpdated.subscriptionNo, options.subscriptionNo);
assert.strictEqual(subscriptionUpdated.clientName.toString(), options.clientName.toString());
assert.strictEqual(subscriptionUpdated.projectName.toString(), options.projectName.toString());
assert.strictEqual(subscriptionUpdated.serviceName, options.serviceName);
assert.strictEqual(subscriptionUpdated.provider, options.provider);
assert.strictEqual(subscriptionUpdated.startDate, options.startDate);
assert.strictEqual(subscriptionUpdated.renewalDate, options.renewalDate);
assert.strictEqual(subscriptionUpdated.billingCycle, options.billingCycle);
assert.strictEqual(subscriptionUpdated.cost, options.cost);
assert.strictEqual(subscriptionUpdated.sellingPrice, options.sellingPrice);
assert.strictEqual(subscriptionUpdated.currency, options.currency);
assert.strictEqual(subscriptionUpdated.autoRenew, options.autoRenew);
assert.strictEqual(subscriptionUpdated.autoRenew, options.autoRenew);
assert.strictEqual(subscriptionUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a subscription", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("proposals").Model.findByIdAndDelete(proposalsCreated._id);
await app.service("quotations").Model.findByIdAndDelete(quotationsCreated._id);
await app.service("projects").Model.findByIdAndDelete(projectsCreated._id);;

      const subscriptionDeleted = await thisService.Model.findByIdAndDelete(subscriptionCreated._id);
      assert.strictEqual(subscriptionDeleted._id.toString(), subscriptionCreated._id.toString());
    });
  });
});
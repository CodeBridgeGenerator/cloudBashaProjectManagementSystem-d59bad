const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("renewals service", async () => {
  let thisService;
  let renewalCreated;
  let usersServiceResults;
  let users;

  const clientsCreated = await app.service("clients").Model.create({"renewalNo":"new value","renewalType":"new value","referenceNo":"new value","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value"});
const clientsCreated = await app.service("clients").Model.create({"renewalNo":"new value","renewalType":"new value","referenceNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId"});
const leadsCreated = await app.service("leads").Model.create({"renewalNo":"new value","renewalType":"new value","referenceNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":`${clientsCreated._id}`,"proposalRef":"new value","leadNo":"parentObjectId","companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value"});
const proposalsCreated = await app.service("proposals").Model.create({"renewalNo":"new value","renewalType":"new value","referenceNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":`${clientsCreated._id}`,"proposalRef":"new value","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.794Z","validTillDate":"2026-10-19T15:23:12.794Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value"});
const quotationsCreated = await app.service("quotations").Model.create({"renewalNo":"new value","renewalType":"new value","referenceNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.794Z","validTillDate":"2026-10-19T15:23:12.795Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":"new value","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.795Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23});
const projectsCreated = await app.service("projects").Model.create({"renewalNo":"new value","renewalType":"new value","referenceNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"new value","projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.794Z","validTillDate":"2026-10-19T15:23:12.795Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.795Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.795Z","targetEndDate":"2026-10-19T15:23:12.795Z","projectValue":23,"phase":"new value","progress":23});

  beforeEach(async () => {
    thisService = await app.service("renewals");

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
    assert.ok(thisService, "Registered the service (renewals)");
  });

  describe("#create", () => {
    const options = {"renewalNo":"new value","renewalType":"new value","referenceNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":`${projectsCreated._id}`,"projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"parentObjectId","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.794Z","validTillDate":"2026-10-19T15:23:12.795Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.795Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.795Z","targetEndDate":"2026-10-19T15:23:12.795Z","projectValue":23,"phase":"new value","progress":23,"currentEndDate":"2026-10-19T15:23:12.795Z","renewalDate":"2026-10-19T15:23:12.795Z","renewalAmount":23};

    beforeEach(async () => {
      renewalCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new renewal", () => {
      assert.strictEqual(renewalCreated.renewalNo, options.renewalNo);
assert.strictEqual(renewalCreated.renewalType, options.renewalType);
assert.strictEqual(renewalCreated.referenceNo, options.referenceNo);
assert.strictEqual(renewalCreated.clientName.toString(), options.clientName.toString());
assert.strictEqual(renewalCreated.projectName.toString(), options.projectName.toString());
assert.strictEqual(renewalCreated.currentEndDate.toISOString(), options.currentEndDate);
assert.strictEqual(renewalCreated.renewalDate.toISOString(), options.renewalDate);
assert.strictEqual(renewalCreated.renewalAmount, options.renewalAmount);
assert.strictEqual(renewalCreated.currency, options.currency);
assert.strictEqual(renewalCreated.status, options.status);
assert.strictEqual(renewalCreated.assignedTo.toString(), options.assignedTo.toString());
assert.strictEqual(renewalCreated.notes, options.notes);
    });
  });

  describe("#get", () => {
    it("should retrieve a renewal by ID", async () => {
      const retrieved = await thisService.Model.findById(renewalCreated._id);
      assert.strictEqual(retrieved._id.toString(), renewalCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"renewalNo":"updated value","renewalType":"updated value","referenceNo":"updated value","clientName":`${clientsCreated._id}`,"projectName":`${projectsCreated._id}`,"currentEndDate":"2026-10-19T15:23:12.795Z","renewalDate":"2026-10-19T15:23:12.795Z","renewalAmount":100,"currency":"updated value","status":"updated value","assignedTo":`${profilesCreated._id}`,"notes":"updated value"};

    it("should update an existing renewal ", async () => {
      const renewalUpdated = await thisService.Model.findByIdAndUpdate(
        renewalCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(renewalUpdated.renewalNo, options.renewalNo);
assert.strictEqual(renewalUpdated.renewalType, options.renewalType);
assert.strictEqual(renewalUpdated.referenceNo, options.referenceNo);
assert.strictEqual(renewalUpdated.clientName.toString(), options.clientName.toString());
assert.strictEqual(renewalUpdated.projectName.toString(), options.projectName.toString());
assert.strictEqual(renewalUpdated.currentEndDate.toISOString(), options.currentEndDate);
assert.strictEqual(renewalUpdated.renewalDate.toISOString(), options.renewalDate);
assert.strictEqual(renewalUpdated.renewalAmount, options.renewalAmount);
assert.strictEqual(renewalUpdated.currency, options.currency);
assert.strictEqual(renewalUpdated.status, options.status);
assert.strictEqual(renewalUpdated.assignedTo.toString(), options.assignedTo.toString());
assert.strictEqual(renewalUpdated.notes, options.notes);
    });
  });

  describe("#delete", async () => {
    it("should delete a renewal", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("proposals").Model.findByIdAndDelete(proposalsCreated._id);
await app.service("quotations").Model.findByIdAndDelete(quotationsCreated._id);
await app.service("projects").Model.findByIdAndDelete(projectsCreated._id);;

      const renewalDeleted = await thisService.Model.findByIdAndDelete(renewalCreated._id);
      assert.strictEqual(renewalDeleted._id.toString(), renewalCreated._id.toString());
    });
  });
});
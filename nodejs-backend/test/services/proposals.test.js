const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("proposals service", async () => {
  let thisService;
  let proposalCreated;
  let usersServiceResults;
  let users;

  const leadsCreated = await app.service("leads").Model.create({"proposalRef":"new value","leadNo":"parentObjectId","companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value"});

  beforeEach(async () => {
    thisService = await app.service("proposals");

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
    assert.ok(thisService, "Registered the service (proposals)");
  });

  describe("#create", () => {
    const options = {"proposalRef":"new value","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","email":"new value","phone":"new value","leadSource":"new value","assignedTo":"new value","status":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.274Z","validTillDate":"2026-10-19T15:23:12.274Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value"};

    beforeEach(async () => {
      proposalCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new proposal", () => {
      assert.strictEqual(proposalCreated.proposalRef, options.proposalRef);
assert.strictEqual(proposalCreated.leadNo.toString(), options.leadNo.toString());
assert.strictEqual(proposalCreated.projectTitle, options.projectTitle);
assert.strictEqual(proposalCreated.proposalDate.toISOString(), options.proposalDate);
assert.strictEqual(proposalCreated.validTillDate.toISOString(), options.validTillDate);
assert.strictEqual(proposalCreated.scopeSummary, options.scopeSummary);
assert.strictEqual(proposalCreated.estimatedAmount, options.estimatedAmount);
assert.strictEqual(proposalCreated.currency, options.currency);
assert.strictEqual(proposalCreated.status, options.status);
assert.strictEqual(proposalCreated.generatedDoc, options.generatedDoc);
    });
  });

  describe("#get", () => {
    it("should retrieve a proposal by ID", async () => {
      const retrieved = await thisService.Model.findById(proposalCreated._id);
      assert.strictEqual(retrieved._id.toString(), proposalCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"proposalRef":"updated value","leadNo":`${leadsCreated._id}`,"projectTitle":"updated value","proposalDate":"2026-10-19T15:23:12.274Z","validTillDate":"2026-10-19T15:23:12.274Z","scopeSummary":"updated value","estimatedAmount":100,"currency":"updated value","status":"updated value","generatedDoc":"updated value"};

    it("should update an existing proposal ", async () => {
      const proposalUpdated = await thisService.Model.findByIdAndUpdate(
        proposalCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(proposalUpdated.proposalRef, options.proposalRef);
assert.strictEqual(proposalUpdated.leadNo.toString(), options.leadNo.toString());
assert.strictEqual(proposalUpdated.projectTitle, options.projectTitle);
assert.strictEqual(proposalUpdated.proposalDate.toISOString(), options.proposalDate);
assert.strictEqual(proposalUpdated.validTillDate.toISOString(), options.validTillDate);
assert.strictEqual(proposalUpdated.scopeSummary, options.scopeSummary);
assert.strictEqual(proposalUpdated.estimatedAmount, options.estimatedAmount);
assert.strictEqual(proposalUpdated.currency, options.currency);
assert.strictEqual(proposalUpdated.status, options.status);
assert.strictEqual(proposalUpdated.generatedDoc, options.generatedDoc);
    });
  });

  describe("#delete", async () => {
    it("should delete a proposal", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);;

      const proposalDeleted = await thisService.Model.findByIdAndDelete(proposalCreated._id);
      assert.strictEqual(proposalDeleted._id.toString(), proposalCreated._id.toString());
    });
  });
});
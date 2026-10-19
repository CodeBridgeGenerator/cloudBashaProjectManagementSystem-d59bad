const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("projects service", async () => {
  let thisService;
  let projectCreated;
  let usersServiceResults;
  let users;

  const clientsCreated = await app.service("clients").Model.create({"projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value"});
const leadsCreated = await app.service("leads").Model.create({"projectNo":"new value","client":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"new value","leadNo":"parentObjectId","companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value"});
const proposalsCreated = await app.service("proposals").Model.create({"projectNo":"new value","client":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"new value","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.381Z","validTillDate":"2026-10-19T15:23:12.381Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value"});
const quotationsCreated = await app.service("quotations").Model.create({"projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.381Z","validTillDate":"2026-10-19T15:23:12.382Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":"new value","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.382Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23});

  beforeEach(async () => {
    thisService = await app.service("projects");

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
    assert.ok(thisService, "Registered the service (projects)");
  });

  describe("#create", () => {
    const options = {"projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.381Z","validTillDate":"2026-10-19T15:23:12.382Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.382Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectName":"new value","projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.382Z","targetEndDate":"2026-10-19T15:23:12.382Z","projectValue":23,"phase":"new value","progress":23};

    beforeEach(async () => {
      projectCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new project", () => {
      assert.strictEqual(projectCreated.projectNo, options.projectNo);
assert.strictEqual(projectCreated.client.toString(), options.client.toString());
assert.strictEqual(projectCreated.proposalRef.toString(), options.proposalRef.toString());
assert.strictEqual(projectCreated.quoteNo.toString(), options.quoteNo.toString());
assert.strictEqual(projectCreated.projectName, options.projectName);
assert.strictEqual(projectCreated.projectManager.toString(), options.projectManager.toString());
assert.strictEqual(projectCreated.startDate.toISOString(), options.startDate);
assert.strictEqual(projectCreated.targetEndDate.toISOString(), options.targetEndDate);
assert.strictEqual(projectCreated.projectValue, options.projectValue);
assert.strictEqual(projectCreated.currency, options.currency);
assert.strictEqual(projectCreated.phase, options.phase);
assert.strictEqual(projectCreated.status, options.status);
assert.strictEqual(projectCreated.progress, options.progress);
    });
  });

  describe("#get", () => {
    it("should retrieve a project by ID", async () => {
      const retrieved = await thisService.Model.findById(projectCreated._id);
      assert.strictEqual(retrieved._id.toString(), projectCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"projectNo":"updated value","client":`${clientsCreated._id}`,"proposalRef":`${proposalsCreated._id}`,"quoteNo":`${quotationsCreated._id}`,"projectName":"updated value","projectManager":`${profilesCreated._id}`,"startDate":"2026-10-19T15:23:12.382Z","targetEndDate":"2026-10-19T15:23:12.382Z","projectValue":100,"currency":100,"phase":"updated value","status":"updated value","progress":100};

    it("should update an existing project ", async () => {
      const projectUpdated = await thisService.Model.findByIdAndUpdate(
        projectCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(projectUpdated.projectNo, options.projectNo);
assert.strictEqual(projectUpdated.client.toString(), options.client.toString());
assert.strictEqual(projectUpdated.proposalRef.toString(), options.proposalRef.toString());
assert.strictEqual(projectUpdated.quoteNo.toString(), options.quoteNo.toString());
assert.strictEqual(projectUpdated.projectName, options.projectName);
assert.strictEqual(projectUpdated.projectManager.toString(), options.projectManager.toString());
assert.strictEqual(projectUpdated.startDate.toISOString(), options.startDate);
assert.strictEqual(projectUpdated.targetEndDate.toISOString(), options.targetEndDate);
assert.strictEqual(projectUpdated.projectValue, options.projectValue);
assert.strictEqual(projectUpdated.currency, options.currency);
assert.strictEqual(projectUpdated.phase, options.phase);
assert.strictEqual(projectUpdated.status, options.status);
assert.strictEqual(projectUpdated.progress, options.progress);
    });
  });

  describe("#delete", async () => {
    it("should delete a project", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("proposals").Model.findByIdAndDelete(proposalsCreated._id);
await app.service("quotations").Model.findByIdAndDelete(quotationsCreated._id);;

      const projectDeleted = await thisService.Model.findByIdAndDelete(projectCreated._id);
      assert.strictEqual(projectDeleted._id.toString(), projectCreated._id.toString());
    });
  });
});
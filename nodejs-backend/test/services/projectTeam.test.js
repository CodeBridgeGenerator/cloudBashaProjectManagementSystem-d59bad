const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("projectTeam service", async () => {
  let thisService;
  let projectTeamCreated;
  let usersServiceResults;
  let users;

  const clientsCreated = await app.service("clients").Model.create({"projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value"});
const leadsCreated = await app.service("leads").Model.create({"projectName":"parentObjectId","projectNo":"new value","client":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"new value","leadNo":"parentObjectId","companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value"});
const proposalsCreated = await app.service("proposals").Model.create({"projectName":"parentObjectId","projectNo":"new value","client":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"new value","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.398Z","validTillDate":"2026-10-19T15:23:12.398Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value"});
const quotationsCreated = await app.service("quotations").Model.create({"projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.398Z","validTillDate":"2026-10-19T15:23:12.398Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":"new value","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.398Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23});
const projectsCreated = await app.service("projects").Model.create({"projectName":"new value","projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.398Z","validTillDate":"2026-10-19T15:23:12.398Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.398Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.399Z","targetEndDate":"2026-10-19T15:23:12.399Z","projectValue":23,"phase":"new value","progress":23});

  beforeEach(async () => {
    thisService = await app.service("projectTeam");

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
    assert.ok(thisService, "Registered the service (projectTeam)");
  });

  describe("#create", () => {
    const options = {"projectName":`${projectsCreated._id}`,"projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.398Z","validTillDate":"2026-10-19T15:23:12.398Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.398Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.399Z","targetEndDate":"2026-10-19T15:23:12.399Z","projectValue":23,"phase":"new value","progress":23,"teamMember":"parentObjectId","role":"new value","allocation":23};

    beforeEach(async () => {
      projectTeamCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new projectTeam", () => {
      assert.strictEqual(projectTeamCreated.projectName.toString(), options.projectName.toString());
assert.strictEqual(projectTeamCreated.teamMember.toString(), options.teamMember.toString());
assert.strictEqual(projectTeamCreated.role, options.role);
assert.strictEqual(projectTeamCreated.allocation, options.allocation);
assert.strictEqual(projectTeamCreated.startDate.toISOString(), options.startDate);
assert.strictEqual(projectTeamCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a projectTeam by ID", async () => {
      const retrieved = await thisService.Model.findById(projectTeamCreated._id);
      assert.strictEqual(retrieved._id.toString(), projectTeamCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"projectName":`${projectsCreated._id}`,"teamMember":`${profilesCreated._id}`,"role":"updated value","allocation":100,"startDate":"2026-10-19T15:23:12.399Z","status":"updated value"};

    it("should update an existing projectTeam ", async () => {
      const projectTeamUpdated = await thisService.Model.findByIdAndUpdate(
        projectTeamCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(projectTeamUpdated.projectName.toString(), options.projectName.toString());
assert.strictEqual(projectTeamUpdated.teamMember.toString(), options.teamMember.toString());
assert.strictEqual(projectTeamUpdated.role, options.role);
assert.strictEqual(projectTeamUpdated.allocation, options.allocation);
assert.strictEqual(projectTeamUpdated.startDate.toISOString(), options.startDate);
assert.strictEqual(projectTeamUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a projectTeam", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("proposals").Model.findByIdAndDelete(proposalsCreated._id);
await app.service("quotations").Model.findByIdAndDelete(quotationsCreated._id);
await app.service("projects").Model.findByIdAndDelete(projectsCreated._id);;

      const projectTeamDeleted = await thisService.Model.findByIdAndDelete(projectTeamCreated._id);
      assert.strictEqual(projectTeamDeleted._id.toString(), projectTeamCreated._id.toString());
    });
  });
});
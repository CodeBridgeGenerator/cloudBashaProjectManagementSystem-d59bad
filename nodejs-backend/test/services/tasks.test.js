const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("tasks service", async () => {
  let thisService;
  let taskCreated;
  let usersServiceResults;
  let users;

  const clientsCreated = await app.service("clients").Model.create({"taskNo":"new value","projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value"});
const leadsCreated = await app.service("leads").Model.create({"taskNo":"new value","projectName":"parentObjectId","projectNo":"new value","client":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"new value","leadNo":"parentObjectId","companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value"});
const proposalsCreated = await app.service("proposals").Model.create({"taskNo":"new value","projectName":"parentObjectId","projectNo":"new value","client":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"new value","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.425Z","validTillDate":"2026-10-19T15:23:12.425Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value"});
const quotationsCreated = await app.service("quotations").Model.create({"taskNo":"new value","projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.425Z","validTillDate":"2026-10-19T15:23:12.425Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":"new value","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.425Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23});
const projectsCreated = await app.service("projects").Model.create({"taskNo":"new value","projectName":"new value","projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.425Z","validTillDate":"2026-10-19T15:23:12.425Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.425Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.425Z","targetEndDate":"2026-10-19T15:23:12.425Z","projectValue":23,"phase":"new value","progress":23});

  beforeEach(async () => {
    thisService = await app.service("tasks");

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
    assert.ok(thisService, "Registered the service (tasks)");
  });

  describe("#create", () => {
    const options = {"taskNo":"new value","projectName":`${projectsCreated._id}`,"projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"parentObjectId","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.425Z","validTillDate":"2026-10-19T15:23:12.425Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.425Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.425Z","targetEndDate":"2026-10-19T15:23:12.425Z","projectValue":23,"phase":"new value","progress":23,"taskName":"new value","description":"new value","priority":"new value","dueDate":"2026-10-19T15:23:12.425Z","estimatedHours":23,"actualHours":23};

    beforeEach(async () => {
      taskCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new task", () => {
      assert.strictEqual(taskCreated.taskNo, options.taskNo);
assert.strictEqual(taskCreated.projectName.toString(), options.projectName.toString());
assert.strictEqual(taskCreated.taskName, options.taskName);
assert.strictEqual(taskCreated.description, options.description);
assert.strictEqual(taskCreated.assignedTo.toString(), options.assignedTo.toString());
assert.strictEqual(taskCreated.priority, options.priority);
assert.strictEqual(taskCreated.status, options.status);
assert.strictEqual(taskCreated.startDate.toISOString(), options.startDate);
assert.strictEqual(taskCreated.dueDate.toISOString(), options.dueDate);
assert.strictEqual(taskCreated.estimatedHours, options.estimatedHours);
assert.strictEqual(taskCreated.actualHours, options.actualHours);
assert.strictEqual(taskCreated.progress, options.progress);
    });
  });

  describe("#get", () => {
    it("should retrieve a task by ID", async () => {
      const retrieved = await thisService.Model.findById(taskCreated._id);
      assert.strictEqual(retrieved._id.toString(), taskCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"taskNo":"updated value","projectName":`${projectsCreated._id}`,"taskName":"updated value","description":"updated value","assignedTo":`${profilesCreated._id}`,"priority":"updated value","status":"updated value","startDate":"2026-10-19T15:23:12.425Z","dueDate":"2026-10-19T15:23:12.425Z","estimatedHours":100,"actualHours":100,"progress":100};

    it("should update an existing task ", async () => {
      const taskUpdated = await thisService.Model.findByIdAndUpdate(
        taskCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(taskUpdated.taskNo, options.taskNo);
assert.strictEqual(taskUpdated.projectName.toString(), options.projectName.toString());
assert.strictEqual(taskUpdated.taskName, options.taskName);
assert.strictEqual(taskUpdated.description, options.description);
assert.strictEqual(taskUpdated.assignedTo.toString(), options.assignedTo.toString());
assert.strictEqual(taskUpdated.priority, options.priority);
assert.strictEqual(taskUpdated.status, options.status);
assert.strictEqual(taskUpdated.startDate.toISOString(), options.startDate);
assert.strictEqual(taskUpdated.dueDate.toISOString(), options.dueDate);
assert.strictEqual(taskUpdated.estimatedHours, options.estimatedHours);
assert.strictEqual(taskUpdated.actualHours, options.actualHours);
assert.strictEqual(taskUpdated.progress, options.progress);
    });
  });

  describe("#delete", async () => {
    it("should delete a task", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("proposals").Model.findByIdAndDelete(proposalsCreated._id);
await app.service("quotations").Model.findByIdAndDelete(quotationsCreated._id);
await app.service("projects").Model.findByIdAndDelete(projectsCreated._id);;

      const taskDeleted = await thisService.Model.findByIdAndDelete(taskCreated._id);
      assert.strictEqual(taskDeleted._id.toString(), taskCreated._id.toString());
    });
  });
});
const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("dailyWorkLogs service", async () => {
  let thisService;
  let dailyWorkLogCreated;
  let usersServiceResults;
  let users;

  const clientsCreated = await app.service("clients").Model.create({"workDate":"new value","employee":"parentObjectId","projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value"});
const leadsCreated = await app.service("leads").Model.create({"workDate":"new value","employee":"parentObjectId","projectName":"parentObjectId","projectNo":"new value","client":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"new value","leadNo":"parentObjectId","companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value"});
const proposalsCreated = await app.service("proposals").Model.create({"workDate":"new value","employee":"parentObjectId","projectName":"parentObjectId","projectNo":"new value","client":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"new value","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.442Z","validTillDate":"2026-10-19T15:23:12.442Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value"});
const quotationsCreated = await app.service("quotations").Model.create({"workDate":"new value","employee":"parentObjectId","projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.442Z","validTillDate":"2026-10-19T15:23:12.442Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":"new value","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.442Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23});
const projectsCreated = await app.service("projects").Model.create({"workDate":"new value","employee":"parentObjectId","projectName":"new value","projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.442Z","validTillDate":"2026-10-19T15:23:12.442Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.442Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.442Z","targetEndDate":"2026-10-19T15:23:12.442Z","projectValue":23,"phase":"new value","progress":23});
const tasksCreated = await app.service("tasks").Model.create({"workDate":"new value","employee":"parentObjectId","projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"parentObjectId","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.442Z","validTillDate":"2026-10-19T15:23:12.442Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.442Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.443Z","targetEndDate":"2026-10-19T15:23:12.442Z","projectValue":23,"phase":"new value","progress":23,"taskName":"new value","taskNo":"new value","description":"new value","priority":"new value","dueDate":"2026-10-19T15:23:12.443Z","estimatedHours":23,"actualHours":23});

  beforeEach(async () => {
    thisService = await app.service("dailyWorkLogs");

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
    assert.ok(thisService, "Registered the service (dailyWorkLogs)");
  });

  describe("#create", () => {
    const options = {"workDate":"new value","employee":"parentObjectId","projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"parentObjectId","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.442Z","validTillDate":"2026-10-19T15:23:12.442Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.442Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.443Z","targetEndDate":"2026-10-19T15:23:12.442Z","projectValue":23,"phase":"new value","progress":23,"taskName":`${tasksCreated._id}`,"taskNo":"new value","description":"new value","priority":"new value","dueDate":"2026-10-19T15:23:12.443Z","estimatedHours":23,"actualHours":23,"hours":23,"workDone":"new value","blockers":"new value","nextPlan":"new value"};

    beforeEach(async () => {
      dailyWorkLogCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new dailyWorkLog", () => {
      assert.strictEqual(dailyWorkLogCreated.workDate, options.workDate);
assert.strictEqual(dailyWorkLogCreated.employee.toString(), options.employee.toString());
assert.strictEqual(dailyWorkLogCreated.projectName.toString(), options.projectName.toString());
assert.strictEqual(dailyWorkLogCreated.taskName.toString(), options.taskName.toString());
assert.strictEqual(dailyWorkLogCreated.hours, options.hours);
assert.strictEqual(dailyWorkLogCreated.workDone, options.workDone);
assert.strictEqual(dailyWorkLogCreated.blockers, options.blockers);
assert.strictEqual(dailyWorkLogCreated.nextPlan, options.nextPlan);
    });
  });

  describe("#get", () => {
    it("should retrieve a dailyWorkLog by ID", async () => {
      const retrieved = await thisService.Model.findById(dailyWorkLogCreated._id);
      assert.strictEqual(retrieved._id.toString(), dailyWorkLogCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"workDate":"updated value","employee":`${profilesCreated._id}`,"projectName":`${projectsCreated._id}`,"taskName":`${tasksCreated._id}`,"hours":100,"workDone":"updated value","blockers":"updated value","nextPlan":"updated value"};

    it("should update an existing dailyWorkLog ", async () => {
      const dailyWorkLogUpdated = await thisService.Model.findByIdAndUpdate(
        dailyWorkLogCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(dailyWorkLogUpdated.workDate, options.workDate);
assert.strictEqual(dailyWorkLogUpdated.employee.toString(), options.employee.toString());
assert.strictEqual(dailyWorkLogUpdated.projectName.toString(), options.projectName.toString());
assert.strictEqual(dailyWorkLogUpdated.taskName.toString(), options.taskName.toString());
assert.strictEqual(dailyWorkLogUpdated.hours, options.hours);
assert.strictEqual(dailyWorkLogUpdated.workDone, options.workDone);
assert.strictEqual(dailyWorkLogUpdated.blockers, options.blockers);
assert.strictEqual(dailyWorkLogUpdated.nextPlan, options.nextPlan);
    });
  });

  describe("#delete", async () => {
    it("should delete a dailyWorkLog", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("proposals").Model.findByIdAndDelete(proposalsCreated._id);
await app.service("quotations").Model.findByIdAndDelete(quotationsCreated._id);
await app.service("projects").Model.findByIdAndDelete(projectsCreated._id);
await app.service("tasks").Model.findByIdAndDelete(tasksCreated._id);;

      const dailyWorkLogDeleted = await thisService.Model.findByIdAndDelete(dailyWorkLogCreated._id);
      assert.strictEqual(dailyWorkLogDeleted._id.toString(), dailyWorkLogCreated._id.toString());
    });
  });
});
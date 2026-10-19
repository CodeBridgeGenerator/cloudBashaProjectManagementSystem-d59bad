const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("smContracts service", async () => {
  let thisService;
  let smContractCreated;
  let usersServiceResults;
  let users;

  const clientsCreated = await app.service("clients").Model.create({"sMNo":"new value","clientName":"parentObjectId","clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value"});
const clientsCreated = await app.service("clients").Model.create({"sMNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId"});
const leadsCreated = await app.service("leads").Model.create({"sMNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":`${clientsCreated._id}`,"proposalRef":"new value","leadNo":"parentObjectId","companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value"});
const proposalsCreated = await app.service("proposals").Model.create({"sMNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":`${clientsCreated._id}`,"proposalRef":"new value","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.740Z","validTillDate":"2026-10-19T15:23:12.740Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value"});
const quotationsCreated = await app.service("quotations").Model.create({"sMNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"parentObjectId","projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.740Z","validTillDate":"2026-10-19T15:23:12.741Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":"new value","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.741Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23});
const projectsCreated = await app.service("projects").Model.create({"sMNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":"new value","projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.740Z","validTillDate":"2026-10-19T15:23:12.741Z","scopeSummary":"new value","estimatedAmount":23,"currency":23,"generatedDoc":"new value","quoteNo":`${quotationsCreated._id}`,"attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.741Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.741Z","targetEndDate":"2026-10-19T15:23:12.741Z","projectValue":23,"phase":"new value","progress":23});

  beforeEach(async () => {
    thisService = await app.service("smContracts");

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
    assert.ok(thisService, "Registered the service (smContracts)");
  });

  describe("#create", () => {
    const options = {"sMNo":"new value","clientName":`${clientsCreated._id}`,"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","projectName":`${projectsCreated._id}`,"projectNo":"new value","client":"parentObjectId","proposalRef":"parentObjectId","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","projectTitle":"new value","proposalDate":"2026-10-19T15:23:12.740Z","validTillDate":"2026-10-19T15:23:12.741Z","scopeSummary":"new value","estimatedAmount":23,"currency":"new value","generatedDoc":"new value","quoteNo":"parentObjectId","attentionTo":"parentObjectId","quoteDate":"2026-10-19T15:23:12.741Z","paymentTerms":"new value","paymentMethod":"new value","preparedBy":"parentObjectId","subTotal":23,"discount":23,"taxRate":23,"taxAmount":23,"finalAmount":23,"projectManager":"parentObjectId","startDate":"2026-10-19T15:23:12.742Z","targetEndDate":"2026-10-19T15:23:12.741Z","projectValue":23,"phase":"new value","progress":23,"agreementTitle":"new value","endDate":"2026-10-19T15:23:12.742Z","contractPeriod":"new value","nextRenewalDate":"new value"};

    beforeEach(async () => {
      smContractCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new smContract", () => {
      assert.strictEqual(smContractCreated.sMNo, options.sMNo);
assert.strictEqual(smContractCreated.clientName.toString(), options.clientName.toString());
assert.strictEqual(smContractCreated.projectName.toString(), options.projectName.toString());
assert.strictEqual(smContractCreated.quoteNo.toString(), options.quoteNo.toString());
assert.strictEqual(smContractCreated.agreementTitle, options.agreementTitle);
assert.strictEqual(smContractCreated.startDate.toISOString(), options.startDate);
assert.strictEqual(smContractCreated.endDate.toISOString(), options.endDate);
assert.strictEqual(smContractCreated.contractPeriod, options.contractPeriod);
assert.strictEqual(smContractCreated.paymentTerms, options.paymentTerms);
assert.strictEqual(smContractCreated.currency, options.currency);
assert.strictEqual(smContractCreated.subTotal, options.subTotal);
assert.strictEqual(smContractCreated.taxRate, options.taxRate);
assert.strictEqual(smContractCreated.finalAmount, options.finalAmount);
assert.strictEqual(smContractCreated.status, options.status);
assert.strictEqual(smContractCreated.nextRenewalDate, options.nextRenewalDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a smContract by ID", async () => {
      const retrieved = await thisService.Model.findById(smContractCreated._id);
      assert.strictEqual(retrieved._id.toString(), smContractCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"sMNo":"updated value","clientName":`${clientsCreated._id}`,"projectName":`${projectsCreated._id}`,"quoteNo":`${quotationsCreated._id}`,"agreementTitle":"updated value","startDate":"2026-10-19T15:23:12.742Z","endDate":"2026-10-19T15:23:12.742Z","contractPeriod":"updated value","paymentTerms":"updated value","currency":"updated value","subTotal":100,"taxRate":100,"finalAmount":100,"status":"updated value","nextRenewalDate":"updated value"};

    it("should update an existing smContract ", async () => {
      const smContractUpdated = await thisService.Model.findByIdAndUpdate(
        smContractCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(smContractUpdated.sMNo, options.sMNo);
assert.strictEqual(smContractUpdated.clientName.toString(), options.clientName.toString());
assert.strictEqual(smContractUpdated.projectName.toString(), options.projectName.toString());
assert.strictEqual(smContractUpdated.quoteNo.toString(), options.quoteNo.toString());
assert.strictEqual(smContractUpdated.agreementTitle, options.agreementTitle);
assert.strictEqual(smContractUpdated.startDate.toISOString(), options.startDate);
assert.strictEqual(smContractUpdated.endDate.toISOString(), options.endDate);
assert.strictEqual(smContractUpdated.contractPeriod, options.contractPeriod);
assert.strictEqual(smContractUpdated.paymentTerms, options.paymentTerms);
assert.strictEqual(smContractUpdated.currency, options.currency);
assert.strictEqual(smContractUpdated.subTotal, options.subTotal);
assert.strictEqual(smContractUpdated.taxRate, options.taxRate);
assert.strictEqual(smContractUpdated.finalAmount, options.finalAmount);
assert.strictEqual(smContractUpdated.status, options.status);
assert.strictEqual(smContractUpdated.nextRenewalDate, options.nextRenewalDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a smContract", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);
await app.service("proposals").Model.findByIdAndDelete(proposalsCreated._id);
await app.service("quotations").Model.findByIdAndDelete(quotationsCreated._id);
await app.service("projects").Model.findByIdAndDelete(projectsCreated._id);;

      const smContractDeleted = await thisService.Model.findByIdAndDelete(smContractCreated._id);
      assert.strictEqual(smContractDeleted._id.toString(), smContractCreated._id.toString());
    });
  });
});
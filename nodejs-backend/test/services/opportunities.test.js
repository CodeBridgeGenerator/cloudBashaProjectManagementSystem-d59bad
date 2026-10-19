const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("opportunities service", async () => {
  let thisService;
  let opportunityCreated;
  let usersServiceResults;
  let users;

  const clientsCreated = await app.service("clients").Model.create({"clientNo":"new value","company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value"});
const leadsCreated = await app.service("leads").Model.create({"clientNo":`${clientsCreated._id}`,"company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","leadNo":"parentObjectId","companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value"});

  beforeEach(async () => {
    thisService = await app.service("opportunities");

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
    assert.ok(thisService, "Registered the service (opportunities)");
  });

  describe("#create", () => {
    const options = {"clientNo":`${clientsCreated._id}`,"company":"parentObjectId","primaryContact":"new value","email":"new value","phone":"new value","status":"new value","leadNo":`${leadsCreated._id}`,"companyName":"parentObjectId","contactName":"new value","leadSource":"new value","assignedTo":"new value","projectInterest":"new value","nextFollowUpDate":"new value","notes":"new value","name":"new value","opportunityName":"new value","requestType":"new value","requestDate":"2026-10-19T15:23:12.253Z","responsibleTo":"parentObjectId","estimatedValue":23,"currency":"new value","stage":"new value","probability":23,"expectedCloseDate":23,"outcome":"new value","nextAction":"new value","accountableTo":"parentObjectId","consultedTo":"parentObjectId","informedTo":"parentObjectId"};

    beforeEach(async () => {
      opportunityCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new opportunity", () => {
      assert.strictEqual(opportunityCreated.clientNo.toString(), options.clientNo.toString());
assert.strictEqual(opportunityCreated.leadNo.toString(), options.leadNo.toString());
assert.strictEqual(opportunityCreated.opportunityName, options.opportunityName);
assert.strictEqual(opportunityCreated.requestType, options.requestType);
assert.strictEqual(opportunityCreated.requestDate.toISOString(), options.requestDate);
assert.strictEqual(opportunityCreated.contactName, options.contactName);
assert.strictEqual(opportunityCreated.responsibleTo.toString(), options.responsibleTo.toString());
assert.strictEqual(opportunityCreated.estimatedValue, options.estimatedValue);
assert.strictEqual(opportunityCreated.currency, options.currency);
assert.strictEqual(opportunityCreated.stage, options.stage);
assert.strictEqual(opportunityCreated.probability, options.probability);
assert.strictEqual(opportunityCreated.expectedCloseDate, options.expectedCloseDate);
assert.strictEqual(opportunityCreated.outcome, options.outcome);
assert.strictEqual(opportunityCreated.nextAction, options.nextAction);
assert.strictEqual(opportunityCreated.accountableTo.toString(), options.accountableTo.toString());
assert.strictEqual(opportunityCreated.consultedTo.toString(), options.consultedTo.toString());
assert.strictEqual(opportunityCreated.informedTo.toString(), options.informedTo.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a opportunity by ID", async () => {
      const retrieved = await thisService.Model.findById(opportunityCreated._id);
      assert.strictEqual(retrieved._id.toString(), opportunityCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"clientNo":`${clientsCreated._id}`,"leadNo":`${leadsCreated._id}`,"opportunityName":"updated value","requestType":"updated value","requestDate":"2026-10-19T15:23:12.253Z","contactName":"updated value","responsibleTo":`${profilesCreated._id}`,"estimatedValue":100,"currency":"updated value","stage":"updated value","probability":100,"expectedCloseDate":100,"outcome":"updated value","nextAction":"updated value","accountableTo":`${profilesCreated._id}`,"consultedTo":`${profilesCreated._id}`,"informedTo":`${profilesCreated._id}`};

    it("should update an existing opportunity ", async () => {
      const opportunityUpdated = await thisService.Model.findByIdAndUpdate(
        opportunityCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(opportunityUpdated.clientNo.toString(), options.clientNo.toString());
assert.strictEqual(opportunityUpdated.leadNo.toString(), options.leadNo.toString());
assert.strictEqual(opportunityUpdated.opportunityName, options.opportunityName);
assert.strictEqual(opportunityUpdated.requestType, options.requestType);
assert.strictEqual(opportunityUpdated.requestDate.toISOString(), options.requestDate);
assert.strictEqual(opportunityUpdated.contactName, options.contactName);
assert.strictEqual(opportunityUpdated.responsibleTo.toString(), options.responsibleTo.toString());
assert.strictEqual(opportunityUpdated.estimatedValue, options.estimatedValue);
assert.strictEqual(opportunityUpdated.currency, options.currency);
assert.strictEqual(opportunityUpdated.stage, options.stage);
assert.strictEqual(opportunityUpdated.probability, options.probability);
assert.strictEqual(opportunityUpdated.expectedCloseDate, options.expectedCloseDate);
assert.strictEqual(opportunityUpdated.outcome, options.outcome);
assert.strictEqual(opportunityUpdated.nextAction, options.nextAction);
assert.strictEqual(opportunityUpdated.accountableTo.toString(), options.accountableTo.toString());
assert.strictEqual(opportunityUpdated.consultedTo.toString(), options.consultedTo.toString());
assert.strictEqual(opportunityUpdated.informedTo.toString(), options.informedTo.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a opportunity", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("clients").Model.findByIdAndDelete(clientsCreated._id);
await app.service("leads").Model.findByIdAndDelete(leadsCreated._id);;

      const opportunityDeleted = await thisService.Model.findByIdAndDelete(opportunityCreated._id);
      assert.strictEqual(opportunityDeleted._id.toString(), opportunityCreated._id.toString());
    });
  });
});
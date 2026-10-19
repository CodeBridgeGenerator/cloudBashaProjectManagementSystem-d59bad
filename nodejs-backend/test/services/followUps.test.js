const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("followUps service", async () => {
  let thisService;
  let followUpCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("followUps");

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
    assert.ok(thisService, "Registered the service (followUps)");
  });

  describe("#create", () => {
    const options = {"referenceType":"new value","referenceNo":"new value","assignedTo":"parentObjectId","followUpType":"new value","subject":"new value","followUpDate":"2026-10-19T15:23:12.235Z","status":"new value","notes":"new value"};

    beforeEach(async () => {
      followUpCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new followUp", () => {
      assert.strictEqual(followUpCreated.referenceType, options.referenceType);
assert.strictEqual(followUpCreated.referenceNo, options.referenceNo);
assert.strictEqual(followUpCreated.assignedTo.toString(), options.assignedTo.toString());
assert.strictEqual(followUpCreated.followUpType, options.followUpType);
assert.strictEqual(followUpCreated.subject, options.subject);
assert.strictEqual(followUpCreated.followUpDate.toISOString(), options.followUpDate);
assert.strictEqual(followUpCreated.status, options.status);
assert.strictEqual(followUpCreated.notes, options.notes);
    });
  });

  describe("#get", () => {
    it("should retrieve a followUp by ID", async () => {
      const retrieved = await thisService.Model.findById(followUpCreated._id);
      assert.strictEqual(retrieved._id.toString(), followUpCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"referenceType":"updated value","referenceNo":"updated value","assignedTo":`${profilesCreated._id}`,"followUpType":"updated value","subject":"updated value","followUpDate":"2026-10-19T15:23:12.235Z","status":"updated value","notes":"updated value"};

    it("should update an existing followUp ", async () => {
      const followUpUpdated = await thisService.Model.findByIdAndUpdate(
        followUpCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(followUpUpdated.referenceType, options.referenceType);
assert.strictEqual(followUpUpdated.referenceNo, options.referenceNo);
assert.strictEqual(followUpUpdated.assignedTo.toString(), options.assignedTo.toString());
assert.strictEqual(followUpUpdated.followUpType, options.followUpType);
assert.strictEqual(followUpUpdated.subject, options.subject);
assert.strictEqual(followUpUpdated.followUpDate.toISOString(), options.followUpDate);
assert.strictEqual(followUpUpdated.status, options.status);
assert.strictEqual(followUpUpdated.notes, options.notes);
    });
  });

  describe("#delete", async () => {
    it("should delete a followUp", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const followUpDeleted = await thisService.Model.findByIdAndDelete(followUpCreated._id);
      assert.strictEqual(followUpDeleted._id.toString(), followUpCreated._id.toString());
    });
  });
});
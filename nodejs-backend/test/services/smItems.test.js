const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("smItems service", async () => {
  let thisService;
  let smItemCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("smItems");

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
    assert.ok(thisService, "Registered the service (smItems)");
  });

  describe("#create", () => {
    const options = {"smNo":"new value","serviceName":"new value","quantity":23,"specification":"new value","costingBasis":"new value","included":true,"billingCycle":"new value","unitPrice":23,"annualAmount":23};

    beforeEach(async () => {
      smItemCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new smItem", () => {
      assert.strictEqual(smItemCreated.smNo, options.smNo);
assert.strictEqual(smItemCreated.serviceName, options.serviceName);
assert.strictEqual(smItemCreated.quantity, options.quantity);
assert.strictEqual(smItemCreated.specification, options.specification);
assert.strictEqual(smItemCreated.costingBasis, options.costingBasis);
assert.strictEqual(smItemCreated.included, options.included);
assert.strictEqual(smItemCreated.included, options.included);
assert.strictEqual(smItemCreated.billingCycle, options.billingCycle);
assert.strictEqual(smItemCreated.unitPrice, options.unitPrice);
assert.strictEqual(smItemCreated.annualAmount, options.annualAmount);
    });
  });

  describe("#get", () => {
    it("should retrieve a smItem by ID", async () => {
      const retrieved = await thisService.Model.findById(smItemCreated._id);
      assert.strictEqual(retrieved._id.toString(), smItemCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"smNo":"updated value","serviceName":"updated value","quantity":100,"specification":"updated value","costingBasis":"updated value","included":false,"billingCycle":"updated value","unitPrice":100,"annualAmount":100};

    it("should update an existing smItem ", async () => {
      const smItemUpdated = await thisService.Model.findByIdAndUpdate(
        smItemCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(smItemUpdated.smNo, options.smNo);
assert.strictEqual(smItemUpdated.serviceName, options.serviceName);
assert.strictEqual(smItemUpdated.quantity, options.quantity);
assert.strictEqual(smItemUpdated.specification, options.specification);
assert.strictEqual(smItemUpdated.costingBasis, options.costingBasis);
assert.strictEqual(smItemUpdated.included, options.included);
assert.strictEqual(smItemUpdated.included, options.included);
assert.strictEqual(smItemUpdated.billingCycle, options.billingCycle);
assert.strictEqual(smItemUpdated.unitPrice, options.unitPrice);
assert.strictEqual(smItemUpdated.annualAmount, options.annualAmount);
    });
  });

  describe("#delete", async () => {
    it("should delete a smItem", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const smItemDeleted = await thisService.Model.findByIdAndDelete(smItemCreated._id);
      assert.strictEqual(smItemDeleted._id.toString(), smItemCreated._id.toString());
    });
  });
});
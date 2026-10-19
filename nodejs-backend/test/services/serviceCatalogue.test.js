const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("serviceCatalogue service", async () => {
  let thisService;
  let serviceCatalogueCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("serviceCatalogue");

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
    assert.ok(thisService, "Registered the service (serviceCatalogue)");
  });

  describe("#create", () => {
    const options = {"serviceCode":"new value","serviceName":"new value","serviceCategory":"new value","billingType":"new value","defaultUnit":"new value","defaultUnitPrice":23,"currency":"new value","active":true};

    beforeEach(async () => {
      serviceCatalogueCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new serviceCatalogue", () => {
      assert.strictEqual(serviceCatalogueCreated.serviceCode, options.serviceCode);
assert.strictEqual(serviceCatalogueCreated.serviceName, options.serviceName);
assert.strictEqual(serviceCatalogueCreated.serviceCategory, options.serviceCategory);
assert.strictEqual(serviceCatalogueCreated.billingType, options.billingType);
assert.strictEqual(serviceCatalogueCreated.defaultUnit, options.defaultUnit);
assert.strictEqual(serviceCatalogueCreated.defaultUnitPrice, options.defaultUnitPrice);
assert.strictEqual(serviceCatalogueCreated.currency, options.currency);
assert.strictEqual(serviceCatalogueCreated.active, options.active);
assert.strictEqual(serviceCatalogueCreated.active, options.active);
    });
  });

  describe("#get", () => {
    it("should retrieve a serviceCatalogue by ID", async () => {
      const retrieved = await thisService.Model.findById(serviceCatalogueCreated._id);
      assert.strictEqual(retrieved._id.toString(), serviceCatalogueCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"serviceCode":"updated value","serviceName":"updated value","serviceCategory":"updated value","billingType":"updated value","defaultUnit":"updated value","defaultUnitPrice":100,"currency":"updated value","active":false};

    it("should update an existing serviceCatalogue ", async () => {
      const serviceCatalogueUpdated = await thisService.Model.findByIdAndUpdate(
        serviceCatalogueCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(serviceCatalogueUpdated.serviceCode, options.serviceCode);
assert.strictEqual(serviceCatalogueUpdated.serviceName, options.serviceName);
assert.strictEqual(serviceCatalogueUpdated.serviceCategory, options.serviceCategory);
assert.strictEqual(serviceCatalogueUpdated.billingType, options.billingType);
assert.strictEqual(serviceCatalogueUpdated.defaultUnit, options.defaultUnit);
assert.strictEqual(serviceCatalogueUpdated.defaultUnitPrice, options.defaultUnitPrice);
assert.strictEqual(serviceCatalogueUpdated.currency, options.currency);
assert.strictEqual(serviceCatalogueUpdated.active, options.active);
assert.strictEqual(serviceCatalogueUpdated.active, options.active);
    });
  });

  describe("#delete", async () => {
    it("should delete a serviceCatalogue", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const serviceCatalogueDeleted = await thisService.Model.findByIdAndDelete(serviceCatalogueCreated._id);
      assert.strictEqual(serviceCatalogueDeleted._id.toString(), serviceCatalogueCreated._id.toString());
    });
  });
});
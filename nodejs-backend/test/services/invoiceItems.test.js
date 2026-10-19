const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("invoiceItems service", async () => {
  let thisService;
  let invoiceItemCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("invoiceItems");

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
    assert.ok(thisService, "Registered the service (invoiceItems)");
  });

  describe("#create", () => {
    const options = {"invoiceNo":"new value","description":"new value","quantity":23,"unit":"new value","unitPrice":23,"discount":23,"taxRate":23,"lineAmount":23};

    beforeEach(async () => {
      invoiceItemCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new invoiceItem", () => {
      assert.strictEqual(invoiceItemCreated.invoiceNo, options.invoiceNo);
assert.strictEqual(invoiceItemCreated.description, options.description);
assert.strictEqual(invoiceItemCreated.quantity, options.quantity);
assert.strictEqual(invoiceItemCreated.unit, options.unit);
assert.strictEqual(invoiceItemCreated.unitPrice, options.unitPrice);
assert.strictEqual(invoiceItemCreated.discount, options.discount);
assert.strictEqual(invoiceItemCreated.taxRate, options.taxRate);
assert.strictEqual(invoiceItemCreated.lineAmount, options.lineAmount);
    });
  });

  describe("#get", () => {
    it("should retrieve a invoiceItem by ID", async () => {
      const retrieved = await thisService.Model.findById(invoiceItemCreated._id);
      assert.strictEqual(retrieved._id.toString(), invoiceItemCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"invoiceNo":"updated value","description":"updated value","quantity":100,"unit":"updated value","unitPrice":100,"discount":100,"taxRate":100,"lineAmount":100};

    it("should update an existing invoiceItem ", async () => {
      const invoiceItemUpdated = await thisService.Model.findByIdAndUpdate(
        invoiceItemCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(invoiceItemUpdated.invoiceNo, options.invoiceNo);
assert.strictEqual(invoiceItemUpdated.description, options.description);
assert.strictEqual(invoiceItemUpdated.quantity, options.quantity);
assert.strictEqual(invoiceItemUpdated.unit, options.unit);
assert.strictEqual(invoiceItemUpdated.unitPrice, options.unitPrice);
assert.strictEqual(invoiceItemUpdated.discount, options.discount);
assert.strictEqual(invoiceItemUpdated.taxRate, options.taxRate);
assert.strictEqual(invoiceItemUpdated.lineAmount, options.lineAmount);
    });
  });

  describe("#delete", async () => {
    it("should delete a invoiceItem", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const invoiceItemDeleted = await thisService.Model.findByIdAndDelete(invoiceItemCreated._id);
      assert.strictEqual(invoiceItemDeleted._id.toString(), invoiceItemCreated._id.toString());
    });
  });
});
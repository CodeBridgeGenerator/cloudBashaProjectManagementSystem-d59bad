const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("productPricing service", async () => {
  let thisService;
  let productPricingCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("productPricing");

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
    assert.ok(thisService, "Registered the service (productPricing)");
  });

  describe("#create", () => {
    const options = {"pricingNo":"new value","productCode":"new value","productName":"new value","category":"new value","pricingType":"new value","unit":"new value","costPrice":23,"sellingPrice":23,"currency":"new value","billingCycle":"new value","effectiveFrom":"2026-10-19T15:23:12.304Z","status":"new value","notes":"new value"};

    beforeEach(async () => {
      productPricingCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new productPricing", () => {
      assert.strictEqual(productPricingCreated.pricingNo, options.pricingNo);
assert.strictEqual(productPricingCreated.productCode, options.productCode);
assert.strictEqual(productPricingCreated.productName, options.productName);
assert.strictEqual(productPricingCreated.category, options.category);
assert.strictEqual(productPricingCreated.pricingType, options.pricingType);
assert.strictEqual(productPricingCreated.unit, options.unit);
assert.strictEqual(productPricingCreated.costPrice, options.costPrice);
assert.strictEqual(productPricingCreated.sellingPrice, options.sellingPrice);
assert.strictEqual(productPricingCreated.currency, options.currency);
assert.strictEqual(productPricingCreated.billingCycle, options.billingCycle);
assert.strictEqual(productPricingCreated.effectiveFrom.toISOString(), options.effectiveFrom);
assert.strictEqual(productPricingCreated.status, options.status);
assert.strictEqual(productPricingCreated.notes, options.notes);
    });
  });

  describe("#get", () => {
    it("should retrieve a productPricing by ID", async () => {
      const retrieved = await thisService.Model.findById(productPricingCreated._id);
      assert.strictEqual(retrieved._id.toString(), productPricingCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"pricingNo":"updated value","productCode":"updated value","productName":"updated value","category":"updated value","pricingType":"updated value","unit":"updated value","costPrice":100,"sellingPrice":100,"currency":"updated value","billingCycle":"updated value","effectiveFrom":"2026-10-19T15:23:12.304Z","status":"updated value","notes":"updated value"};

    it("should update an existing productPricing ", async () => {
      const productPricingUpdated = await thisService.Model.findByIdAndUpdate(
        productPricingCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(productPricingUpdated.pricingNo, options.pricingNo);
assert.strictEqual(productPricingUpdated.productCode, options.productCode);
assert.strictEqual(productPricingUpdated.productName, options.productName);
assert.strictEqual(productPricingUpdated.category, options.category);
assert.strictEqual(productPricingUpdated.pricingType, options.pricingType);
assert.strictEqual(productPricingUpdated.unit, options.unit);
assert.strictEqual(productPricingUpdated.costPrice, options.costPrice);
assert.strictEqual(productPricingUpdated.sellingPrice, options.sellingPrice);
assert.strictEqual(productPricingUpdated.currency, options.currency);
assert.strictEqual(productPricingUpdated.billingCycle, options.billingCycle);
assert.strictEqual(productPricingUpdated.effectiveFrom.toISOString(), options.effectiveFrom);
assert.strictEqual(productPricingUpdated.status, options.status);
assert.strictEqual(productPricingUpdated.notes, options.notes);
    });
  });

  describe("#delete", async () => {
    it("should delete a productPricing", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const productPricingDeleted = await thisService.Model.findByIdAndDelete(productPricingCreated._id);
      assert.strictEqual(productPricingDeleted._id.toString(), productPricingCreated._id.toString());
    });
  });
});
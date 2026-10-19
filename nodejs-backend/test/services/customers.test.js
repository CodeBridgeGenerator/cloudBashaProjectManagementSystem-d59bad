const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("customers service", async () => {
  let thisService;
  let customerCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("customers");

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
    assert.ok(thisService, "Registered the service (customers)");
  });

  describe("#create", () => {
    const options = {"customerNo":"new value","customerName":"new value","email":"new value","phone":"new value","customerType":"new value","productOrService":"new value","subscriptionStatus":"new value","status":"new value"};

    beforeEach(async () => {
      customerCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new customer", () => {
      assert.strictEqual(customerCreated.customerNo, options.customerNo);
assert.strictEqual(customerCreated.customerName, options.customerName);
assert.strictEqual(customerCreated.email, options.email);
assert.strictEqual(customerCreated.phone, options.phone);
assert.strictEqual(customerCreated.customerType, options.customerType);
assert.strictEqual(customerCreated.productOrService, options.productOrService);
assert.strictEqual(customerCreated.subscriptionStatus, options.subscriptionStatus);
assert.strictEqual(customerCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a customer by ID", async () => {
      const retrieved = await thisService.Model.findById(customerCreated._id);
      assert.strictEqual(retrieved._id.toString(), customerCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"customerNo":"updated value","customerName":"updated value","email":"updated value","phone":"updated value","customerType":"updated value","productOrService":"updated value","subscriptionStatus":"updated value","status":"updated value"};

    it("should update an existing customer ", async () => {
      const customerUpdated = await thisService.Model.findByIdAndUpdate(
        customerCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(customerUpdated.customerNo, options.customerNo);
assert.strictEqual(customerUpdated.customerName, options.customerName);
assert.strictEqual(customerUpdated.email, options.email);
assert.strictEqual(customerUpdated.phone, options.phone);
assert.strictEqual(customerUpdated.customerType, options.customerType);
assert.strictEqual(customerUpdated.productOrService, options.productOrService);
assert.strictEqual(customerUpdated.subscriptionStatus, options.subscriptionStatus);
assert.strictEqual(customerUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a customer", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const customerDeleted = await thisService.Model.findByIdAndDelete(customerCreated._id);
      assert.strictEqual(customerDeleted._id.toString(), customerCreated._id.toString());
    });
  });
});
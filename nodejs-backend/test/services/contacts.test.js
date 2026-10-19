const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("contacts service", async () => {
  let thisService;
  let contactCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("contacts");

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
    assert.ok(thisService, "Registered the service (contacts)");
  });

  describe("#create", () => {
    const options = {"contactName":"new value","company":"new value","position":"new value","email":"new value","phone":"new value","department":"new value","primaryContact":true};

    beforeEach(async () => {
      contactCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new contact", () => {
      assert.strictEqual(contactCreated.contactName, options.contactName);
assert.strictEqual(contactCreated.company, options.company);
assert.strictEqual(contactCreated.position, options.position);
assert.strictEqual(contactCreated.email, options.email);
assert.strictEqual(contactCreated.phone, options.phone);
assert.strictEqual(contactCreated.department, options.department);
assert.strictEqual(contactCreated.primaryContact, options.primaryContact);
assert.strictEqual(contactCreated.primaryContact, options.primaryContact);
    });
  });

  describe("#get", () => {
    it("should retrieve a contact by ID", async () => {
      const retrieved = await thisService.Model.findById(contactCreated._id);
      assert.strictEqual(retrieved._id.toString(), contactCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"contactName":"updated value","company":"updated value","position":"updated value","email":"updated value","phone":"updated value","department":"updated value","primaryContact":false};

    it("should update an existing contact ", async () => {
      const contactUpdated = await thisService.Model.findByIdAndUpdate(
        contactCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(contactUpdated.contactName, options.contactName);
assert.strictEqual(contactUpdated.company, options.company);
assert.strictEqual(contactUpdated.position, options.position);
assert.strictEqual(contactUpdated.email, options.email);
assert.strictEqual(contactUpdated.phone, options.phone);
assert.strictEqual(contactUpdated.department, options.department);
assert.strictEqual(contactUpdated.primaryContact, options.primaryContact);
assert.strictEqual(contactUpdated.primaryContact, options.primaryContact);
    });
  });

  describe("#delete", async () => {
    it("should delete a contact", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const contactDeleted = await thisService.Model.findByIdAndDelete(contactCreated._id);
      assert.strictEqual(contactDeleted._id.toString(), contactCreated._id.toString());
    });
  });
});
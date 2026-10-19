const customers = require("./customers/customers.service.js");
const clients = require("./clients/clients.service.js");
const contacts = require("./contacts/contacts.service.js");
const followUps = require("./followUps/followUps.service.js");
const opportunities = require("./opportunities/opportunities.service.js");
const proposals = require("./proposals/proposals.service.js");
const serviceCatalogue = require("./serviceCatalogue/serviceCatalogue.service.js");
const productPricing = require("./productPricing/productPricing.service.js");
const quotations = require("./quotations/quotations.service.js");
const quotationItems = require("./quotationItems/quotationItems.service.js");
const quotationPaymentMilestones = require("./quotationPaymentMilestones/quotationPaymentMilestones.service.js");
const projects = require("./projects/projects.service.js");
const projectTeam = require("./projectTeam/projectTeam.service.js");
const tasks = require("./tasks/tasks.service.js");
const dailyWorkLogs = require("./dailyWorkLogs/dailyWorkLogs.service.js");
const invoices = require("./invoices/invoices.service.js");
const invoiceItems = require("./invoiceItems/invoiceItems.service.js");
const payments = require("./payments/payments.service.js");
const receipts = require("./receipts/receipts.service.js");
const smContracts = require("./smContracts/smContracts.service.js");
const smItems = require("./smItems/smItems.service.js");
const subscriptions = require("./subscriptions/subscriptions.service.js");
const renewals = require("./renewals/renewals.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(customers);
  app.configure(clients);
  app.configure(contacts);
  app.configure(followUps);
  app.configure(opportunities);
  app.configure(proposals);
  app.configure(serviceCatalogue);
  app.configure(productPricing);
  app.configure(quotations);
  app.configure(quotationItems);
  app.configure(quotationPaymentMilestones);
  app.configure(projects);
  app.configure(projectTeam);
  app.configure(tasks);
  app.configure(dailyWorkLogs);
  app.configure(invoices);
  app.configure(invoiceItems);
  app.configure(payments);
  app.configure(receipts);
  app.configure(smContracts);
  app.configure(smItems);
  app.configure(subscriptions);
  app.configure(renewals);
    // ~cb-add-configure-service-name~
};

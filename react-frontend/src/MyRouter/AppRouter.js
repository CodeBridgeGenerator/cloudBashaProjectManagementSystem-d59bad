import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleCustomersPage from "../components/app_components/CustomersPage/SingleCustomersPage";
import CustomerProjectLayoutPage from "../components/app_components/CustomersPage/CustomerProjectLayoutPage";
import SingleClientsPage from "../components/app_components/ClientsPage/SingleClientsPage";
import ClientProjectLayoutPage from "../components/app_components/ClientsPage/ClientProjectLayoutPage";
import SingleContactsPage from "../components/app_components/ContactsPage/SingleContactsPage";
import ContactProjectLayoutPage from "../components/app_components/ContactsPage/ContactProjectLayoutPage";
import SingleFollowUpsPage from "../components/app_components/FollowUpsPage/SingleFollowUpsPage";
import FollowUpProjectLayoutPage from "../components/app_components/FollowUpsPage/FollowUpProjectLayoutPage";
import SingleOpportunitiesPage from "../components/app_components/OpportunitiesPage/SingleOpportunitiesPage";
import OpportunityProjectLayoutPage from "../components/app_components/OpportunitiesPage/OpportunityProjectLayoutPage";
import SingleProposalsPage from "../components/app_components/ProposalsPage/SingleProposalsPage";
import ProposalProjectLayoutPage from "../components/app_components/ProposalsPage/ProposalProjectLayoutPage";
import SingleServiceCataloguePage from "../components/app_components/ServiceCataloguePage/SingleServiceCataloguePage";
import ServiceCatalogueProjectLayoutPage from "../components/app_components/ServiceCataloguePage/ServiceCatalogueProjectLayoutPage";
import SingleProductPricingPage from "../components/app_components/ProductPricingPage/SingleProductPricingPage";
import ProductPricingProjectLayoutPage from "../components/app_components/ProductPricingPage/ProductPricingProjectLayoutPage";
import SingleQuotationsPage from "../components/app_components/QuotationsPage/SingleQuotationsPage";
import QuotationProjectLayoutPage from "../components/app_components/QuotationsPage/QuotationProjectLayoutPage";
import SingleQuotationItemsPage from "../components/app_components/QuotationItemsPage/SingleQuotationItemsPage";
import QuotationItemProjectLayoutPage from "../components/app_components/QuotationItemsPage/QuotationItemProjectLayoutPage";
import SingleQuotationPaymentMilestonesPage from "../components/app_components/QuotationPaymentMilestonesPage/SingleQuotationPaymentMilestonesPage";
import QuotationPaymentMilestoneProjectLayoutPage from "../components/app_components/QuotationPaymentMilestonesPage/QuotationPaymentMilestoneProjectLayoutPage";
import SingleProjectsPage from "../components/app_components/ProjectsPage/SingleProjectsPage";
import ProjectProjectLayoutPage from "../components/app_components/ProjectsPage/ProjectProjectLayoutPage";
import SingleProjectTeamPage from "../components/app_components/ProjectTeamPage/SingleProjectTeamPage";
import ProjectTeamProjectLayoutPage from "../components/app_components/ProjectTeamPage/ProjectTeamProjectLayoutPage";
import SingleTasksPage from "../components/app_components/TasksPage/SingleTasksPage";
import TaskProjectLayoutPage from "../components/app_components/TasksPage/TaskProjectLayoutPage";
import SingleDailyWorkLogsPage from "../components/app_components/DailyWorkLogsPage/SingleDailyWorkLogsPage";
import DailyWorkLogProjectLayoutPage from "../components/app_components/DailyWorkLogsPage/DailyWorkLogProjectLayoutPage";
import SingleInvoicesPage from "../components/app_components/InvoicesPage/SingleInvoicesPage";
import InvoiceProjectLayoutPage from "../components/app_components/InvoicesPage/InvoiceProjectLayoutPage";
import SingleInvoiceItemsPage from "../components/app_components/InvoiceItemsPage/SingleInvoiceItemsPage";
import InvoiceItemProjectLayoutPage from "../components/app_components/InvoiceItemsPage/InvoiceItemProjectLayoutPage";
import SinglePaymentsPage from "../components/app_components/PaymentsPage/SinglePaymentsPage";
import PaymentProjectLayoutPage from "../components/app_components/PaymentsPage/PaymentProjectLayoutPage";
import SingleReceiptsPage from "../components/app_components/ReceiptsPage/SingleReceiptsPage";
import ReceiptProjectLayoutPage from "../components/app_components/ReceiptsPage/ReceiptProjectLayoutPage";
import SingleSmContractsPage from "../components/app_components/SmContractsPage/SingleSmContractsPage";
import SmContractProjectLayoutPage from "../components/app_components/SmContractsPage/SmContractProjectLayoutPage";
import SingleSmItemsPage from "../components/app_components/SmItemsPage/SingleSmItemsPage";
import SmItemProjectLayoutPage from "../components/app_components/SmItemsPage/SmItemProjectLayoutPage";
import SingleSubscriptionsPage from "../components/app_components/SubscriptionsPage/SingleSubscriptionsPage";
import SubscriptionProjectLayoutPage from "../components/app_components/SubscriptionsPage/SubscriptionProjectLayoutPage";
import SingleRenewalsPage from "../components/app_components/RenewalsPage/SingleRenewalsPage";
import RenewalProjectLayoutPage from "../components/app_components/RenewalsPage/RenewalProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/customers/:singleCustomersId" exact element={<SingleCustomersPage />} />
<Route path="/customers" exact element={<CustomerProjectLayoutPage />} />
<Route path="/clients/:singleClientsId" exact element={<SingleClientsPage />} />
<Route path="/clients" exact element={<ClientProjectLayoutPage />} />
<Route path="/contacts/:singleContactsId" exact element={<SingleContactsPage />} />
<Route path="/contacts" exact element={<ContactProjectLayoutPage />} />
<Route path="/followUps/:singleFollowUpsId" exact element={<SingleFollowUpsPage />} />
<Route path="/followUps" exact element={<FollowUpProjectLayoutPage />} />
<Route path="/opportunities/:singleOpportunitiesId" exact element={<SingleOpportunitiesPage />} />
<Route path="/opportunities" exact element={<OpportunityProjectLayoutPage />} />
<Route path="/proposals/:singleProposalsId" exact element={<SingleProposalsPage />} />
<Route path="/proposals" exact element={<ProposalProjectLayoutPage />} />
<Route path="/serviceCatalogue/:singleServiceCatalogueId" exact element={<SingleServiceCataloguePage />} />
<Route path="/serviceCatalogue" exact element={<ServiceCatalogueProjectLayoutPage />} />
<Route path="/productPricing/:singleProductPricingId" exact element={<SingleProductPricingPage />} />
<Route path="/productPricing" exact element={<ProductPricingProjectLayoutPage />} />
<Route path="/quotations/:singleQuotationsId" exact element={<SingleQuotationsPage />} />
<Route path="/quotations" exact element={<QuotationProjectLayoutPage />} />
<Route path="/quotationItems/:singleQuotationItemsId" exact element={<SingleQuotationItemsPage />} />
<Route path="/quotationItems" exact element={<QuotationItemProjectLayoutPage />} />
<Route path="/quotationPaymentMilestones/:singleQuotationPaymentMilestonesId" exact element={<SingleQuotationPaymentMilestonesPage />} />
<Route path="/quotationPaymentMilestones" exact element={<QuotationPaymentMilestoneProjectLayoutPage />} />
<Route path="/projects/:singleProjectsId" exact element={<SingleProjectsPage />} />
<Route path="/projects" exact element={<ProjectProjectLayoutPage />} />
<Route path="/projectTeam/:singleProjectTeamId" exact element={<SingleProjectTeamPage />} />
<Route path="/projectTeam" exact element={<ProjectTeamProjectLayoutPage />} />
<Route path="/tasks/:singleTasksId" exact element={<SingleTasksPage />} />
<Route path="/tasks" exact element={<TaskProjectLayoutPage />} />
<Route path="/dailyWorkLogs/:singleDailyWorkLogsId" exact element={<SingleDailyWorkLogsPage />} />
<Route path="/dailyWorkLogs" exact element={<DailyWorkLogProjectLayoutPage />} />
<Route path="/invoices/:singleInvoicesId" exact element={<SingleInvoicesPage />} />
<Route path="/invoices" exact element={<InvoiceProjectLayoutPage />} />
<Route path="/invoiceItems/:singleInvoiceItemsId" exact element={<SingleInvoiceItemsPage />} />
<Route path="/invoiceItems" exact element={<InvoiceItemProjectLayoutPage />} />
<Route path="/payments/:singlePaymentsId" exact element={<SinglePaymentsPage />} />
<Route path="/payments" exact element={<PaymentProjectLayoutPage />} />
<Route path="/receipts/:singleReceiptsId" exact element={<SingleReceiptsPage />} />
<Route path="/receipts" exact element={<ReceiptProjectLayoutPage />} />
<Route path="/smContracts/:singleSmContractsId" exact element={<SingleSmContractsPage />} />
<Route path="/smContracts" exact element={<SmContractProjectLayoutPage />} />
<Route path="/smItems/:singleSmItemsId" exact element={<SingleSmItemsPage />} />
<Route path="/smItems" exact element={<SmItemProjectLayoutPage />} />
<Route path="/subscriptions/:singleSubscriptionsId" exact element={<SingleSubscriptionsPage />} />
<Route path="/subscriptions" exact element={<SubscriptionProjectLayoutPage />} />
<Route path="/renewals/:singleRenewalsId" exact element={<SingleRenewalsPage />} />
<Route path="/renewals" exact element={<RenewalProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);

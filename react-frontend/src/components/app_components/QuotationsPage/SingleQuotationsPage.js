import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";

import QuotationItemsPage from "../QuotationItemsPage/QuotationItemsPage";
import QuotationPaymentMilestonesPage from "../QuotationPaymentMilestonesPage/QuotationPaymentMilestonesPage";
import ProjectsPage from "../ProjectsPage/ProjectsPage";
import InvoicesPage from "../InvoicesPage/InvoicesPage";
import SmContractsPage from "../SmContractsPage/SmContractsPage";

const SingleQuotationsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [proposalRef, setProposalRef] = useState([]);
const [client, setClient] = useState([]);
const [attentionTo, setAttentionTo] = useState([]);
const [preparedBy, setPreparedBy] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("quotations")
            .get(urlParams.singleQuotationsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"proposalRef","client","attentionTo","preparedBy"] }})
            .then((res) => {
                set_entity(res || {});
                const proposalRef = Array.isArray(res.proposalRef)
            ? res.proposalRef.map((elem) => ({ _id: elem._id, proposalRef: elem.proposalRef }))
            : res.proposalRef
                ? [{ _id: res.proposalRef._id, proposalRef: res.proposalRef.proposalRef }]
                : [];
        setProposalRef(proposalRef);
const client = Array.isArray(res.client)
            ? res.client.map((elem) => ({ _id: elem._id, company: elem.company }))
            : res.client
                ? [{ _id: res.client._id, company: res.client.company }]
                : [];
        setClient(client);
const attentionTo = Array.isArray(res.attentionTo)
            ? res.attentionTo.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.attentionTo
                ? [{ _id: res.attentionTo._id, name: res.attentionTo.name }]
                : [];
        setAttentionTo(attentionTo);
const preparedBy = Array.isArray(res.preparedBy)
            ? res.preparedBy.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.preparedBy
                ? [{ _id: res.preparedBy._id, name: res.preparedBy.name }]
                : [];
        setPreparedBy(preparedBy);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Quotations", type: "error", message: error.message || "Failed get quotations" });
            });
    }, [props,urlParams.singleQuotationsId]);


    const goBack = () => {
        navigate("/app/quotations");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Quotations</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>quotations/{urlParams.singleQuotationsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Quote No</label><p className="m-0 ml-3" >{_entity?.quoteNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Project Title</label><p className="m-0 ml-3" >{_entity?.projectTitle}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Payment Terms</label><p className="m-0 ml-3" >{_entity?.paymentTerms}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Payment Method</label><p className="m-0 ml-3" >{_entity?.paymentMethod}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Currency</label><p className="m-0 ml-3" >{Number(_entity?.currency)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Sub Total</label><p className="m-0 ml-3" >{Number(_entity?.subTotal)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Discount</label><p className="m-0 ml-3" >{Number(_entity?.discount)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Tax Rate</label><p className="m-0 ml-3" >{Number(_entity?.taxRate)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Tax Amount</label><p className="m-0 ml-3" >{Number(_entity?.taxAmount)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Final Amount</label><p className="m-0 ml-3" >{Number(_entity?.finalAmount)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0 ml-3" >{_entity?.status}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Generated Doc</label><p className="m-0 ml-3" >{_entity?.generatedDoc}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Proposal Ref</label>
                    {proposalRef.map((elem) => (
                        <Link key={elem._id} to={`/proposals/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.proposalRef}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Client</label>
                    {client.map((elem) => (
                        <Link key={elem._id} to={`/clients/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.company}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Attention To</label>
                    {attentionTo.map((elem) => (
                        <Link key={elem._id} to={`/profiles/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Prepared By</label>
                    {preparedBy.map((elem) => (
                        <Link key={elem._id} to={`/profiles/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      
    <div className="col-12 mt-2">
        <TabView>
        
                    <TabPanel header="Quotation Items" leftIcon="pi pi-building-columns mr-2">
                        <QuotationItemsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Quotation Payment Milestones" leftIcon="pi pi-building-columns mr-2">
                        <QuotationPaymentMilestonesPage/>
                    </TabPanel>
                    

                    <TabPanel header="Projects" leftIcon="pi pi-building-columns mr-2">
                        <ProjectsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Invoices" leftIcon="pi pi-building-columns mr-2">
                        <InvoicesPage/>
                    </TabPanel>
                    

                    <TabPanel header="Sm Contracts" leftIcon="pi pi-building-columns mr-2">
                        <SmContractsPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleQuotationsId}
        user={props.user}
        alert={props.alert}
        serviceName="quotations"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleQuotationsPage);

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

import OpportunitiesPage from "../OpportunitiesPage/OpportunitiesPage";
import QuotationsPage from "../QuotationsPage/QuotationsPage";
import ProjectsPage from "../ProjectsPage/ProjectsPage";
import InvoicesPage from "../InvoicesPage/InvoicesPage";
import PaymentsPage from "../PaymentsPage/PaymentsPage";
import ReceiptsPage from "../ReceiptsPage/ReceiptsPage";
import SmContractsPage from "../SmContractsPage/SmContractsPage";
import SubscriptionsPage from "../SubscriptionsPage/SubscriptionsPage";
import RenewalsPage from "../RenewalsPage/RenewalsPage";

const SingleClientsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [company, setCompany] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("clients")
            .get(urlParams.singleClientsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"company"] }})
            .then((res) => {
                set_entity(res || {});
                const company = Array.isArray(res.company)
            ? res.company.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.company
                ? [{ _id: res.company._id, name: res.company.name }]
                : [];
        setCompany(company);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Clients", type: "error", message: error.message || "Failed get clients" });
            });
    }, [props,urlParams.singleClientsId]);


    const goBack = () => {
        navigate("/app/clients");
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
                    <h3 className="m-0">Clients</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>clients/{urlParams.singleClientsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Client No</label><p className="m-0 ml-3" >{_entity?.clientNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Primary Contact</label><p className="m-0 ml-3" >{_entity?.primaryContact}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Email</label><p className="m-0 ml-3" >{_entity?.email}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Phone</label><p className="m-0 ml-3" >{_entity?.phone}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0 ml-3" >{_entity?.status}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Company</label>
                    {company.map((elem) => (
                        <Link key={elem._id} to={`/companies/${elem._id}`}>
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
        
                    <TabPanel header="Opportunities" leftIcon="pi pi-building-columns mr-2">
                        <OpportunitiesPage/>
                    </TabPanel>
                    

                    <TabPanel header="Quotations" leftIcon="pi pi-building-columns mr-2">
                        <QuotationsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Projects" leftIcon="pi pi-building-columns mr-2">
                        <ProjectsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Invoices" leftIcon="pi pi-building-columns mr-2">
                        <InvoicesPage/>
                    </TabPanel>
                    

                    <TabPanel header="Payments" leftIcon="pi pi-building-columns mr-2">
                        <PaymentsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Receipts" leftIcon="pi pi-building-columns mr-2">
                        <ReceiptsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Sm Contracts" leftIcon="pi pi-building-columns mr-2">
                        <SmContractsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Subscriptions" leftIcon="pi pi-building-columns mr-2">
                        <SubscriptionsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Renewals" leftIcon="pi pi-building-columns mr-2">
                        <RenewalsPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleClientsId}
        user={props.user}
        alert={props.alert}
        serviceName="clients"
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

export default connect(mapState, mapDispatch)(SingleClientsPage);

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

import ProjectTeamPage from "../ProjectTeamPage/ProjectTeamPage";
import TasksPage from "../TasksPage/TasksPage";
import DailyWorkLogsPage from "../DailyWorkLogsPage/DailyWorkLogsPage";
import InvoicesPage from "../InvoicesPage/InvoicesPage";
import PaymentsPage from "../PaymentsPage/PaymentsPage";
import SmContractsPage from "../SmContractsPage/SmContractsPage";
import SubscriptionsPage from "../SubscriptionsPage/SubscriptionsPage";
import RenewalsPage from "../RenewalsPage/RenewalsPage";

const SingleProjectsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [client, setClient] = useState([]);
const [proposalRef, setProposalRef] = useState([]);
const [quoteNo, setQuoteNo] = useState([]);
const [projectManager, setProjectManager] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("projects")
            .get(urlParams.singleProjectsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"client","proposalRef","quoteNo","projectManager"] }})
            .then((res) => {
                set_entity(res || {});
                const client = Array.isArray(res.client)
            ? res.client.map((elem) => ({ _id: elem._id, company: elem.company }))
            : res.client
                ? [{ _id: res.client._id, company: res.client.company }]
                : [];
        setClient(client);
const proposalRef = Array.isArray(res.proposalRef)
            ? res.proposalRef.map((elem) => ({ _id: elem._id, proposalRef: elem.proposalRef }))
            : res.proposalRef
                ? [{ _id: res.proposalRef._id, proposalRef: res.proposalRef.proposalRef }]
                : [];
        setProposalRef(proposalRef);
const quoteNo = Array.isArray(res.quoteNo)
            ? res.quoteNo.map((elem) => ({ _id: elem._id, quoteNo: elem.quoteNo }))
            : res.quoteNo
                ? [{ _id: res.quoteNo._id, quoteNo: res.quoteNo.quoteNo }]
                : [];
        setQuoteNo(quoteNo);
const projectManager = Array.isArray(res.projectManager)
            ? res.projectManager.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.projectManager
                ? [{ _id: res.projectManager._id, name: res.projectManager.name }]
                : [];
        setProjectManager(projectManager);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Projects", type: "error", message: error.message || "Failed get projects" });
            });
    }, [props,urlParams.singleProjectsId]);


    const goBack = () => {
        navigate("/app/projects");
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
                    <h3 className="m-0">Projects</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>projects/{urlParams.singleProjectsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Project No</label><p className="m-0 ml-3" >{_entity?.projectNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Project Name</label><p className="m-0 ml-3" >{_entity?.projectName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Project Value</label><p className="m-0 ml-3" >{Number(_entity?.projectValue)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Currency</label><p className="m-0 ml-3" >{Number(_entity?.currency)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Phase</label><p className="m-0 ml-3" >{_entity?.phase}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0 ml-3" >{_entity?.status}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Progress</label><p className="m-0 ml-3" >{Number(_entity?.progress)}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Client</label>
                    {client.map((elem) => (
                        <Link key={elem._id} to={`/clients/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.company}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Proposal Ref</label>
                    {proposalRef.map((elem) => (
                        <Link key={elem._id} to={`/proposals/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.proposalRef}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Quote No</label>
                    {quoteNo.map((elem) => (
                        <Link key={elem._id} to={`/quotations/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.quoteNo}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Project Manager</label>
                    {projectManager.map((elem) => (
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
        
                    <TabPanel header="Project Team" leftIcon="pi pi-building-columns mr-2">
                        <ProjectTeamPage/>
                    </TabPanel>
                    

                    <TabPanel header="Tasks" leftIcon="pi pi-building-columns mr-2">
                        <TasksPage/>
                    </TabPanel>
                    

                    <TabPanel header="Daily Work Logs" leftIcon="pi pi-building-columns mr-2">
                        <DailyWorkLogsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Invoices" leftIcon="pi pi-building-columns mr-2">
                        <InvoicesPage/>
                    </TabPanel>
                    

                    <TabPanel header="Payments" leftIcon="pi pi-building-columns mr-2">
                        <PaymentsPage/>
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
        recordId={urlParams.singleProjectsId}
        user={props.user}
        alert={props.alert}
        serviceName="projects"
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

export default connect(mapState, mapDispatch)(SingleProjectsPage);

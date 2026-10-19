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

import QuotationsPage from "../QuotationsPage/QuotationsPage";
import ProjectsPage from "../ProjectsPage/ProjectsPage";
import { InputNumber } from 'primereact/inputnumber';

const SingleProposalsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [leadNo, setLeadNo] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("proposals")
            .get(urlParams.singleProposalsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"leadNo"] }})
            .then((res) => {
                set_entity(res || {});
                const leadNo = Array.isArray(res.leadNo)
            ? res.leadNo.map((elem) => ({ _id: elem._id, companyName: elem.companyName }))
            : res.leadNo
                ? [{ _id: res.leadNo._id, companyName: res.leadNo.companyName }]
                : [];
        setLeadNo(leadNo);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Proposals", type: "error", message: error.message || "Failed get proposals" });
            });
    }, [props,urlParams.singleProposalsId]);


    const goBack = () => {
        navigate("/app/proposals");
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
                    <h3 className="m-0">Proposals</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>proposals/{urlParams.singleProposalsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Proposal Ref</label><p className="m-0 ml-3" >{_entity?.proposalRef}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Project Title</label><p className="m-0 ml-3" >{_entity?.projectTitle}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Scope Summary</label><p className="m-0 ml-3" >{_entity?.scopeSummary}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Estimated Amount</label><p className="m-0 ml-3" ><InputNumber tooltip="Use only numbers" id="estimatedAmount" value={Number(_entity?.estimatedAmount)} mode="currency" currency="MYR" locale="en-US"   disabled={true} /></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Currency</label><p className="m-0 ml-3" >{_entity?.currency}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0 ml-3" >{_entity?.status}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Generated Doc</label><p className="m-0 ml-3" >{_entity?.generatedDoc}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Lead No</label>
                    {leadNo.map((elem) => (
                        <Link key={elem._id} to={`/leads/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.companyName}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      
    <div className="col-12 mt-2">
        <TabView>
        
                    <TabPanel header="Quotations" leftIcon="pi pi-building-columns mr-2">
                        <QuotationsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Projects" leftIcon="pi pi-building-columns mr-2">
                        <ProjectsPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleProposalsId}
        user={props.user}
        alert={props.alert}
        serviceName="proposals"
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

export default connect(mapState, mapDispatch)(SingleProposalsPage);

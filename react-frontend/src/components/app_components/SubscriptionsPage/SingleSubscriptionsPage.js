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


const SingleSubscriptionsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [clientName, setClientName] = useState([]);
const [projectName, setProjectName] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("subscriptions")
            .get(urlParams.singleSubscriptionsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"clientName","projectName"] }})
            .then((res) => {
                set_entity(res || {});
                const clientName = Array.isArray(res.clientName)
            ? res.clientName.map((elem) => ({ _id: elem._id, company: elem.company }))
            : res.clientName
                ? [{ _id: res.clientName._id, company: res.clientName.company }]
                : [];
        setClientName(clientName);
const projectName = Array.isArray(res.projectName)
            ? res.projectName.map((elem) => ({ _id: elem._id, projectName: elem.projectName }))
            : res.projectName
                ? [{ _id: res.projectName._id, projectName: res.projectName.projectName }]
                : [];
        setProjectName(projectName);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Subscriptions", type: "error", message: error.message || "Failed get subscriptions" });
            });
    }, [props,urlParams.singleSubscriptionsId]);


    const goBack = () => {
        navigate("/app/subscriptions");
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
                    <h3 className="m-0">Subscriptions</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>subscriptions/{urlParams.singleSubscriptionsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Subscription No</label><p className="m-0 ml-3" >{_entity?.subscriptionNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Service Name</label><p className="m-0 ml-3" >{_entity?.serviceName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Provider</label><p className="m-0 ml-3" >{_entity?.provider}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Start Date</label><p className="m-0 ml-3" >{_entity?.startDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Renewal Date</label><p className="m-0 ml-3" >{_entity?.renewalDate}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Billing Cycle</label><p className="m-0 ml-3" >{_entity?.billingCycle}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Cost</label><p className="m-0 ml-3" >{Number(_entity?.cost)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Selling Price</label><p className="m-0 ml-3" >{Number(_entity?.sellingPrice)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Currency</label><p className="m-0 ml-3" >{_entity?.currency}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Auto Renew</label><p className="m-0" ><i id="autoRenew" className={`pi ${_entity?.autoRenew?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0 ml-3" >{_entity?.status}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Client Name</label>
                    {clientName.map((elem) => (
                        <Link key={elem._id} to={`/clients/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.company}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Project Name</label>
                    {projectName.map((elem) => (
                        <Link key={elem._id} to={`/projects/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.projectName}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      


      <CommentsSection
        recordId={urlParams.singleSubscriptionsId}
        user={props.user}
        alert={props.alert}
        serviceName="subscriptions"
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

export default connect(mapState, mapDispatch)(SingleSubscriptionsPage);

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


const SingleOpportunitiesPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [clientNo, setClientNo] = useState([]);
const [leadNo, setLeadNo] = useState([]);
const [responsibleTo, setResponsibleTo] = useState([]);
const [accountableTo, setAccountableTo] = useState([]);
const [consultedTo, setConsultedTo] = useState([]);
const [informedTo, setInformedTo] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("opportunities")
            .get(urlParams.singleOpportunitiesId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"clientNo","leadNo","responsibleTo","accountableTo","consultedTo","informedTo"] }})
            .then((res) => {
                set_entity(res || {});
                const clientNo = Array.isArray(res.clientNo)
            ? res.clientNo.map((elem) => ({ _id: elem._id, clientNo: elem.clientNo }))
            : res.clientNo
                ? [{ _id: res.clientNo._id, clientNo: res.clientNo.clientNo }]
                : [];
        setClientNo(clientNo);
const leadNo = Array.isArray(res.leadNo)
            ? res.leadNo.map((elem) => ({ _id: elem._id, companyName: elem.companyName }))
            : res.leadNo
                ? [{ _id: res.leadNo._id, companyName: res.leadNo.companyName }]
                : [];
        setLeadNo(leadNo);
const responsibleTo = Array.isArray(res.responsibleTo)
            ? res.responsibleTo.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.responsibleTo
                ? [{ _id: res.responsibleTo._id, name: res.responsibleTo.name }]
                : [];
        setResponsibleTo(responsibleTo);
const accountableTo = Array.isArray(res.accountableTo)
            ? res.accountableTo.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.accountableTo
                ? [{ _id: res.accountableTo._id, name: res.accountableTo.name }]
                : [];
        setAccountableTo(accountableTo);
const consultedTo = Array.isArray(res.consultedTo)
            ? res.consultedTo.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.consultedTo
                ? [{ _id: res.consultedTo._id, name: res.consultedTo.name }]
                : [];
        setConsultedTo(consultedTo);
const informedTo = Array.isArray(res.informedTo)
            ? res.informedTo.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.informedTo
                ? [{ _id: res.informedTo._id, name: res.informedTo.name }]
                : [];
        setInformedTo(informedTo);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Opportunities", type: "error", message: error.message || "Failed get opportunities" });
            });
    }, [props,urlParams.singleOpportunitiesId]);


    const goBack = () => {
        navigate("/app/opportunities");
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
                    <h3 className="m-0">Opportunities</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>opportunities/{urlParams.singleOpportunitiesId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Opportunity Name</label><p className="m-0 ml-3" >{_entity?.opportunityName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Request Type</label><p className="m-0 ml-3" >{_entity?.requestType}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Contact Name</label><p className="m-0 ml-3" >{_entity?.contactName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Estimated Value</label><p className="m-0 ml-3" >{Number(_entity?.estimatedValue)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Currency</label><p className="m-0 ml-3" >{_entity?.currency}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Stage</label><p className="m-0 ml-3" >{_entity?.stage}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Probability</label><p className="m-0 ml-3" >{Number(_entity?.probability)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Expected Close Date</label><p className="m-0 ml-3" >{Number(_entity?.expectedCloseDate)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Outcome</label><p className="m-0 ml-3" >{_entity?.outcome}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Next Action</label><p className="m-0 ml-3" >{_entity?.nextAction}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Client No</label>
                    {clientNo.map((elem) => (
                        <Link key={elem._id} to={`/clients/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.clientNo}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Lead No</label>
                    {leadNo.map((elem) => (
                        <Link key={elem._id} to={`/leads/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.companyName}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Responsible To</label>
                    {responsibleTo.map((elem) => (
                        <Link key={elem._id} to={`/profiles/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Accountable To</label>
                    {accountableTo.map((elem) => (
                        <Link key={elem._id} to={`/profiles/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Consulted To</label>
                    {consultedTo.map((elem) => (
                        <Link key={elem._id} to={`/profiles/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Informed To</label>
                    {informedTo.map((elem) => (
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

      


      <CommentsSection
        recordId={urlParams.singleOpportunitiesId}
        user={props.user}
        alert={props.alert}
        serviceName="opportunities"
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

export default connect(mapState, mapDispatch)(SingleOpportunitiesPage);

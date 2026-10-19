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


const SingleSmContractsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [clientName, setClientName] = useState([]);
const [projectName, setProjectName] = useState([]);
const [quoteNo, setQuoteNo] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("smContracts")
            .get(urlParams.singleSmContractsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"clientName","projectName","quoteNo"] }})
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
const quoteNo = Array.isArray(res.quoteNo)
            ? res.quoteNo.map((elem) => ({ _id: elem._id, quoteNo: elem.quoteNo }))
            : res.quoteNo
                ? [{ _id: res.quoteNo._id, quoteNo: res.quoteNo.quoteNo }]
                : [];
        setQuoteNo(quoteNo);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "SmContracts", type: "error", message: error.message || "Failed get smContracts" });
            });
    }, [props,urlParams.singleSmContractsId]);


    const goBack = () => {
        navigate("/app/smContracts");
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
                    <h3 className="m-0">SM Contracts</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>smContracts/{urlParams.singleSmContractsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">S M No</label><p className="m-0 ml-3" >{_entity?.sMNo}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Agreement Title</label><p className="m-0 ml-3" >{_entity?.agreementTitle}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Contract Period</label><p className="m-0 ml-3" >{_entity?.contractPeriod}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Payment Terms</label><p className="m-0 ml-3" >{_entity?.paymentTerms}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Currency</label><p className="m-0 ml-3" >{_entity?.currency}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Sub Total</label><p className="m-0 ml-3" >{Number(_entity?.subTotal)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Tax Rate</label><p className="m-0 ml-3" >{Number(_entity?.taxRate)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Final Amount</label><p className="m-0 ml-3" >{Number(_entity?.finalAmount)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Status</label><p className="m-0 ml-3" >{_entity?.status}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Next Renewal Date</label><p className="m-0 ml-3" >{_entity?.nextRenewalDate}</p></div>
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
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Quote No</label>
                    {quoteNo.map((elem) => (
                        <Link key={elem._id} to={`/quotations/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.quoteNo}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      


      <CommentsSection
        recordId={urlParams.singleSmContractsId}
        user={props.user}
        alert={props.alert}
        serviceName="smContracts"
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

export default connect(mapState, mapDispatch)(SingleSmContractsPage);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const ProjectsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [client, setClient] = useState([])
const [proposalRef, setProposalRef] = useState([])
const [quoteNo, setQuoteNo] = useState([])
const [projectManager, setProjectManager] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [client,proposalRef,quoteNo,projectManager], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
        
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            projectNo: _entity?.projectNo,client: _entity?.client?._id,proposalRef: _entity?.proposalRef?._id,quoteNo: _entity?.quoteNo?._id,projectName: _entity?.projectName,projectManager: _entity?.projectManager?._id,startDate: _entity?.startDate,targetEndDate: _entity?.targetEndDate,projectValue: _entity?.projectValue,currency: _entity?.currency,phase: _entity?.phase,status: _entity?.status,progress: _entity?.progress,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("projects").create(_data);
        const eagerResult = await client
            .service("projects")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "client",
                    service : "clients",
                    select:["company"]},{
                    path : "proposalRef",
                    service : "proposals",
                    select:["proposalRef"]},{
                    path : "quoteNo",
                    service : "quotations",
                    select:["quoteNo"]},{
                    path : "projectManager",
                    service : "profiles",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Projects updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Projects" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount clients
                    client
                        .service("clients")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleClientsId } })
                        .then((res) => {
                            setClient(res.data.map((e) => { return { name: e['company'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Clients", type: "error", message: error.message || "Failed get clients" });
                        });
                }, []);

useEffect(() => {
                    // on mount proposals
                    client
                        .service("proposals")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProposalsId } })
                        .then((res) => {
                            setProposalRef(res.data.map((e) => { return { name: e['proposalRef'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Proposals", type: "error", message: error.message || "Failed get proposals" });
                        });
                }, []);

useEffect(() => {
                    // on mount quotations
                    client
                        .service("quotations")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleQuotationsId } })
                        .then((res) => {
                            setQuoteNo(res.data.map((e) => { return { name: e['quoteNo'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Quotations", type: "error", message: error.message || "Failed get quotations" });
                        });
                }, []);

useEffect(() => {
                    // on mount profiles
                    client
                        .service("profiles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfilesId } })
                        .then((res) => {
                            setProjectManager(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Profiles", type: "error", message: error.message || "Failed get profiles" });
                        });
                }, []);

    
    
    

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const clientOptions = client.map((elem) => ({ name: elem.name, value: elem.value }));
const proposalRefOptions = proposalRef.map((elem) => ({ name: elem.name, value: elem.value }));
const quoteNoOptions = quoteNo.map((elem) => ({ name: elem.name, value: elem.value }));
const projectManagerOptions = projectManager.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Projects" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="projects-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectNo">Project No:</label>
                <InputText id="projectNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.projectNo} onChange={(e) => setValByKey("projectNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectNo"]) ? (
              <p className="m-0" key="error-projectNo">
                {error["projectNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="client">Client:</label>
                <Dropdown id="client" value={_entity?.client?._id} optionLabel="name" optionValue="value" options={clientOptions} onChange={(e) => setValByKey("client", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["client"]) ? (
              <p className="m-0" key="error-client">
                {error["client"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="proposalRef">Proposal Ref:</label>
                <Dropdown id="proposalRef" value={_entity?.proposalRef?._id} optionLabel="name" optionValue="value" options={proposalRefOptions} onChange={(e) => setValByKey("proposalRef", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["proposalRef"]) ? (
              <p className="m-0" key="error-proposalRef">
                {error["proposalRef"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quoteNo">Quote No:</label>
                <Dropdown id="quoteNo" value={_entity?.quoteNo?._id} optionLabel="name" optionValue="value" options={quoteNoOptions} onChange={(e) => setValByKey("quoteNo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quoteNo"]) ? (
              <p className="m-0" key="error-quoteNo">
                {error["quoteNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectName">Project Name:</label>
                <InputText id="projectName" className="w-full mb-3 p-inputtext-sm" value={_entity?.projectName} onChange={(e) => setValByKey("projectName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectName"]) ? (
              <p className="m-0" key="error-projectName">
                {error["projectName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectManager">Project Manager:</label>
                <Dropdown id="projectManager" value={_entity?.projectManager?._id} optionLabel="name" optionValue="value" options={projectManagerOptions} onChange={(e) => setValByKey("projectManager", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectManager"]) ? (
              <p className="m-0" key="error-projectManager">
                {error["projectManager"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="startDate">Start Date:</label>
                <Calendar id="startDate"  value={_entity?.startDate ? new Date(_entity?.startDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("startDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["startDate"]) ? (
              <p className="m-0" key="error-startDate">
                {error["startDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="targetEndDate">Target End Date:</label>
                <Calendar id="targetEndDate"  value={_entity?.targetEndDate ? new Date(_entity?.targetEndDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("targetEndDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["targetEndDate"]) ? (
              <p className="m-0" key="error-targetEndDate">
                {error["targetEndDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectValue">Project Value:</label>
                <InputNumber tooltip="Use only numbers" id="projectValue" className="w-full mb-3 p-inputtext-sm" value={_entity?.projectValue} onChange={(e) => setValByKey("projectValue", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectValue"]) ? (
              <p className="m-0" key="error-projectValue">
                {error["projectValue"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="currency">Currency:</label>
                <InputNumber tooltip="Use only numbers" id="currency" className="w-full mb-3 p-inputtext-sm" value={_entity?.currency} onChange={(e) => setValByKey("currency", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["currency"]) ? (
              <p className="m-0" key="error-currency">
                {error["currency"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="phase">Phase:</label>
                <InputText id="phase" className="w-full mb-3 p-inputtext-sm" value={_entity?.phase} onChange={(e) => setValByKey("phase", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["phase"]) ? (
              <p className="m-0" key="error-phase">
                {error["phase"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) ? (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="progress">Progress:</label>
                <InputNumber tooltip="Use only numbers" id="progress" className="w-full mb-3 p-inputtext-sm" value={_entity?.progress} onChange={(e) => setValByKey("progress", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["progress"]) ? (
              <p className="m-0" key="error-progress">
                {error["progress"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ProjectsCreateDialogComponent);

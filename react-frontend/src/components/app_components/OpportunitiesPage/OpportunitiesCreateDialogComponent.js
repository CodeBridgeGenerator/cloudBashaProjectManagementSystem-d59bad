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

const OpportunitiesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [clientNo, setClientNo] = useState([])
const [leadNo, setLeadNo] = useState([])
const [responsibleTo, setResponsibleTo] = useState([])
const [accountableTo, setAccountableTo] = useState([])
const [consultedTo, setConsultedTo] = useState([])
const [informedTo, setInformedTo] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [clientNo,leadNo,responsibleTo,accountableTo,consultedTo,informedTo], setError);
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
            clientNo: _entity?.clientNo?._id,leadNo: _entity?.leadNo?._id,opportunityName: _entity?.opportunityName,requestType: _entity?.requestType,requestDate: _entity?.requestDate,contactName: _entity?.contactName,responsibleTo: _entity?.responsibleTo?._id,estimatedValue: _entity?.estimatedValue,currency: _entity?.currency,stage: _entity?.stage,probability: _entity?.probability,expectedCloseDate: _entity?.expectedCloseDate,outcome: _entity?.outcome,nextAction: _entity?.nextAction,accountableTo: _entity?.accountableTo?._id,consultedTo: _entity?.consultedTo?._id,informedTo: _entity?.informedTo?._id,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("opportunities").create(_data);
        const eagerResult = await client
            .service("opportunities")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "clientNo",
                    service : "clients",
                    select:["clientNo"]},{
                    path : "leadNo",
                    service : "leads",
                    select:["companyName"]},{
                    path : "responsibleTo",
                    service : "profiles",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Opportunities updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Opportunities" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount clients
                    client
                        .service("clients")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleClientsId } })
                        .then((res) => {
                            setClientNo(res.data.map((e) => { return { name: e['clientNo'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Clients", type: "error", message: error.message || "Failed get clients" });
                        });
                }, []);

useEffect(() => {
                    // on mount leads
                    client
                        .service("leads")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleLeadsId } })
                        .then((res) => {
                            setLeadNo(res.data.map((e) => { return { name: e['companyName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Leads", type: "error", message: error.message || "Failed get leads" });
                        });
                }, []);

useEffect(() => {
                    // on mount profiles
                    client
                        .service("profiles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfilesId } })
                        .then((res) => {
                            setResponsibleTo(res.data.map((e) => { return { name: e['name'], value: e._id }}));
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

    const clientNoOptions = clientNo.map((elem) => ({ name: elem.name, value: elem.value }));
const leadNoOptions = leadNo.map((elem) => ({ name: elem.name, value: elem.value }));
const responsibleToOptions = responsibleTo.map((elem) => ({ name: elem.name, value: elem.value }));
const accountableToOptions = accountableTo.map((elem) => ({ name: elem.name, value: elem.value }));
const consultedToOptions = consultedTo.map((elem) => ({ name: elem.name, value: elem.value }));
const informedToOptions = informedTo.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Opportunities" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="opportunities-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="clientNo">Client No:</label>
                <Dropdown id="clientNo" value={_entity?.clientNo?._id} optionLabel="name" optionValue="value" options={clientNoOptions} onChange={(e) => setValByKey("clientNo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["clientNo"]) ? (
              <p className="m-0" key="error-clientNo">
                {error["clientNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="leadNo">Lead No:</label>
                <Dropdown id="leadNo" value={_entity?.leadNo?._id} optionLabel="name" optionValue="value" options={leadNoOptions} onChange={(e) => setValByKey("leadNo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["leadNo"]) ? (
              <p className="m-0" key="error-leadNo">
                {error["leadNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="opportunityName">Opportunity Name:</label>
                <InputText id="opportunityName" className="w-full mb-3 p-inputtext-sm" value={_entity?.opportunityName} onChange={(e) => setValByKey("opportunityName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["opportunityName"]) ? (
              <p className="m-0" key="error-opportunityName">
                {error["opportunityName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="requestType">Request Type:</label>
                <InputText id="requestType" className="w-full mb-3 p-inputtext-sm" value={_entity?.requestType} onChange={(e) => setValByKey("requestType", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["requestType"]) ? (
              <p className="m-0" key="error-requestType">
                {error["requestType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="requestDate">Request Date:</label>
                <Calendar id="requestDate"  value={_entity?.requestDate ? new Date(_entity?.requestDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("requestDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["requestDate"]) ? (
              <p className="m-0" key="error-requestDate">
                {error["requestDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="contactName">Contact Name:</label>
                <InputText id="contactName" className="w-full mb-3 p-inputtext-sm" value={_entity?.contactName} onChange={(e) => setValByKey("contactName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["contactName"]) ? (
              <p className="m-0" key="error-contactName">
                {error["contactName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="responsibleTo">Responsible To:</label>
                <Dropdown id="responsibleTo" value={_entity?.responsibleTo?._id} optionLabel="name" optionValue="value" options={responsibleToOptions} onChange={(e) => setValByKey("responsibleTo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["responsibleTo"]) ? (
              <p className="m-0" key="error-responsibleTo">
                {error["responsibleTo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="estimatedValue">Estimated Value:</label>
                <InputNumber tooltip="Use only numbers" id="estimatedValue" className="w-full mb-3 p-inputtext-sm" value={_entity?.estimatedValue} onChange={(e) => setValByKey("estimatedValue", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["estimatedValue"]) ? (
              <p className="m-0" key="error-estimatedValue">
                {error["estimatedValue"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="currency">Currency:</label>
                <InputText id="currency" className="w-full mb-3 p-inputtext-sm" value={_entity?.currency} onChange={(e) => setValByKey("currency", e.target.value)}  />
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
                <label htmlFor="stage">Stage:</label>
                <InputText id="stage" className="w-full mb-3 p-inputtext-sm" value={_entity?.stage} onChange={(e) => setValByKey("stage", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["stage"]) ? (
              <p className="m-0" key="error-stage">
                {error["stage"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="probability">Probability:</label>
                <InputNumber tooltip="Use only numbers" id="probability" className="w-full mb-3 p-inputtext-sm" value={_entity?.probability} onChange={(e) => setValByKey("probability", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["probability"]) ? (
              <p className="m-0" key="error-probability">
                {error["probability"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="expectedCloseDate">Expected Close Date:</label>
                <InputNumber tooltip="Use only numbers" id="expectedCloseDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.expectedCloseDate} onChange={(e) => setValByKey("expectedCloseDate", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["expectedCloseDate"]) ? (
              <p className="m-0" key="error-expectedCloseDate">
                {error["expectedCloseDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="outcome">Outcome:</label>
                <InputText id="outcome" className="w-full mb-3 p-inputtext-sm" value={_entity?.outcome} onChange={(e) => setValByKey("outcome", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["outcome"]) ? (
              <p className="m-0" key="error-outcome">
                {error["outcome"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="nextAction">Next Action:</label>
                <InputText id="nextAction" className="w-full mb-3 p-inputtext-sm" value={_entity?.nextAction} onChange={(e) => setValByKey("nextAction", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["nextAction"]) ? (
              <p className="m-0" key="error-nextAction">
                {error["nextAction"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="accountableTo">Accountable To:</label>
                <Dropdown id="accountableTo" value={_entity?.accountableTo?._id} optionLabel="name" optionValue="value" options={accountableToOptions} onChange={(e) => setValByKey("accountableTo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["accountableTo"]) ? (
              <p className="m-0" key="error-accountableTo">
                {error["accountableTo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="consultedTo">Consulted To:</label>
                <Dropdown id="consultedTo" value={_entity?.consultedTo?._id} optionLabel="name" optionValue="value" options={consultedToOptions} onChange={(e) => setValByKey("consultedTo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["consultedTo"]) ? (
              <p className="m-0" key="error-consultedTo">
                {error["consultedTo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="informedTo">Informed To:</label>
                <Dropdown id="informedTo" value={_entity?.informedTo?._id} optionLabel="name" optionValue="value" options={informedToOptions} onChange={(e) => setValByKey("informedTo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["informedTo"]) ? (
              <p className="m-0" key="error-informedTo">
                {error["informedTo"]}
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

export default connect(mapState, mapDispatch)(OpportunitiesCreateDialogComponent);

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

const SmContractsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [clientName, setClientName] = useState([])
const [projectName, setProjectName] = useState([])
const [quoteNo, setQuoteNo] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [clientName,projectName,quoteNo], setError);
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
            sMNo: _entity?.sMNo,clientName: _entity?.clientName?._id,projectName: _entity?.projectName?._id,quoteNo: _entity?.quoteNo?._id,agreementTitle: _entity?.agreementTitle,startDate: _entity?.startDate,endDate: _entity?.endDate,contractPeriod: _entity?.contractPeriod,paymentTerms: _entity?.paymentTerms,currency: _entity?.currency,subTotal: _entity?.subTotal,taxRate: _entity?.taxRate,finalAmount: _entity?.finalAmount,status: _entity?.status,nextRenewalDate: _entity?.nextRenewalDate,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("smContracts").create(_data);
        const eagerResult = await client
            .service("smContracts")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "clientName",
                    service : "clients",
                    select:["company"]},{
                    path : "projectName",
                    service : "projects",
                    select:["projectName"]},{
                    path : "quoteNo",
                    service : "quotations",
                    select:["quoteNo"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info SM Contracts updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in SM Contracts" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount clients
                    client
                        .service("clients")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleClientsId } })
                        .then((res) => {
                            setClientName(res.data.map((e) => { return { name: e['company'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Clients", type: "error", message: error.message || "Failed get clients" });
                        });
                }, []);

useEffect(() => {
                    // on mount projects
                    client
                        .service("projects")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProjectsId } })
                        .then((res) => {
                            setProjectName(res.data.map((e) => { return { name: e['projectName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Projects", type: "error", message: error.message || "Failed get projects" });
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

    const clientNameOptions = clientName.map((elem) => ({ name: elem.name, value: elem.value }));
const projectNameOptions = projectName.map((elem) => ({ name: elem.name, value: elem.value }));
const quoteNoOptions = quoteNo.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create SM Contracts" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="smContracts-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sMNo">S M No:</label>
                <InputText id="sMNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.sMNo} onChange={(e) => setValByKey("sMNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sMNo"]) ? (
              <p className="m-0" key="error-sMNo">
                {error["sMNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="clientName">Client Name:</label>
                <Dropdown id="clientName" value={_entity?.clientName?._id} optionLabel="name" optionValue="value" options={clientNameOptions} onChange={(e) => setValByKey("clientName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["clientName"]) ? (
              <p className="m-0" key="error-clientName">
                {error["clientName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectName">Project Name:</label>
                <Dropdown id="projectName" value={_entity?.projectName?._id} optionLabel="name" optionValue="value" options={projectNameOptions} onChange={(e) => setValByKey("projectName", {_id : e.value})}  />
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
                <label htmlFor="agreementTitle">Agreement Title:</label>
                <InputText id="agreementTitle" className="w-full mb-3 p-inputtext-sm" value={_entity?.agreementTitle} onChange={(e) => setValByKey("agreementTitle", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["agreementTitle"]) ? (
              <p className="m-0" key="error-agreementTitle">
                {error["agreementTitle"]}
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
                <label htmlFor="endDate">End Date:</label>
                <Calendar id="endDate"  value={_entity?.endDate ? new Date(_entity?.endDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("endDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["endDate"]) ? (
              <p className="m-0" key="error-endDate">
                {error["endDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="contractPeriod">Contract Period:</label>
                <InputText id="contractPeriod" className="w-full mb-3 p-inputtext-sm" value={_entity?.contractPeriod} onChange={(e) => setValByKey("contractPeriod", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["contractPeriod"]) ? (
              <p className="m-0" key="error-contractPeriod">
                {error["contractPeriod"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentTerms">Payment Terms:</label>
                <InputText id="paymentTerms" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentTerms} onChange={(e) => setValByKey("paymentTerms", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentTerms"]) ? (
              <p className="m-0" key="error-paymentTerms">
                {error["paymentTerms"]}
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
                <label htmlFor="subTotal">Sub Total:</label>
                <InputNumber tooltip="Use only numbers" id="subTotal" className="w-full mb-3 p-inputtext-sm" value={_entity?.subTotal} onChange={(e) => setValByKey("subTotal", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["subTotal"]) ? (
              <p className="m-0" key="error-subTotal">
                {error["subTotal"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="taxRate">Tax Rate:</label>
                <InputNumber tooltip="Use only numbers" id="taxRate" className="w-full mb-3 p-inputtext-sm" value={_entity?.taxRate} onChange={(e) => setValByKey("taxRate", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["taxRate"]) ? (
              <p className="m-0" key="error-taxRate">
                {error["taxRate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="finalAmount">Final Amount:</label>
                <InputNumber tooltip="Use only numbers" id="finalAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.finalAmount} onChange={(e) => setValByKey("finalAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["finalAmount"]) ? (
              <p className="m-0" key="error-finalAmount">
                {error["finalAmount"]}
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
                <label htmlFor="nextRenewalDate">Next Renewal Date:</label>
                <InputText id="nextRenewalDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.nextRenewalDate} onChange={(e) => setValByKey("nextRenewalDate", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["nextRenewalDate"]) ? (
              <p className="m-0" key="error-nextRenewalDate">
                {error["nextRenewalDate"]}
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

export default connect(mapState, mapDispatch)(SmContractsCreateDialogComponent);

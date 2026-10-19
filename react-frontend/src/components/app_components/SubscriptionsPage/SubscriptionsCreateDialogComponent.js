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
import { InputNumber } from "primereact/inputnumber";
import { Checkbox } from "primereact/checkbox";


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

const SubscriptionsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [clientName, setClientName] = useState([])
const [projectName, setProjectName] = useState([])

    useEffect(() => {
        let init  = {autoRenew: false};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [clientName,projectName], setError);
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
            subscriptionNo: _entity?.subscriptionNo,clientName: _entity?.clientName?._id,projectName: _entity?.projectName?._id,serviceName: _entity?.serviceName,provider: _entity?.provider,startDate: _entity?.startDate,renewalDate: _entity?.renewalDate,billingCycle: _entity?.billingCycle,cost: _entity?.cost,sellingPrice: _entity?.sellingPrice,currency: _entity?.currency,autoRenew: _entity?.autoRenew || false,status: _entity?.status,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("subscriptions").create(_data);
        const eagerResult = await client
            .service("subscriptions")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "clientName",
                    service : "clients",
                    select:["company"]},{
                    path : "projectName",
                    service : "projects",
                    select:["projectName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Subscriptions updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Subscriptions" });
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

    return (
        <Dialog header="Create Subscriptions" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="subscriptions-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="subscriptionNo">Subscription No:</label>
                <InputText id="subscriptionNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.subscriptionNo} onChange={(e) => setValByKey("subscriptionNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["subscriptionNo"]) ? (
              <p className="m-0" key="error-subscriptionNo">
                {error["subscriptionNo"]}
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
                <label htmlFor="serviceName">Service Name:</label>
                <InputText id="serviceName" className="w-full mb-3 p-inputtext-sm" value={_entity?.serviceName} onChange={(e) => setValByKey("serviceName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["serviceName"]) ? (
              <p className="m-0" key="error-serviceName">
                {error["serviceName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="provider">Provider:</label>
                <InputText id="provider" className="w-full mb-3 p-inputtext-sm" value={_entity?.provider} onChange={(e) => setValByKey("provider", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["provider"]) ? (
              <p className="m-0" key="error-provider">
                {error["provider"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="startDate">Start Date:</label>
                <InputText id="startDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.startDate} onChange={(e) => setValByKey("startDate", e.target.value)}  />
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
                <label htmlFor="renewalDate">Renewal Date:</label>
                <InputText id="renewalDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.renewalDate} onChange={(e) => setValByKey("renewalDate", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["renewalDate"]) ? (
              <p className="m-0" key="error-renewalDate">
                {error["renewalDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="billingCycle">Billing Cycle:</label>
                <InputText id="billingCycle" className="w-full mb-3 p-inputtext-sm" value={_entity?.billingCycle} onChange={(e) => setValByKey("billingCycle", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["billingCycle"]) ? (
              <p className="m-0" key="error-billingCycle">
                {error["billingCycle"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="cost">Cost:</label>
                <InputNumber tooltip="Use only numbers" id="cost" className="w-full mb-3 p-inputtext-sm" value={_entity?.cost} onChange={(e) => setValByKey("cost", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["cost"]) ? (
              <p className="m-0" key="error-cost">
                {error["cost"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sellingPrice">Selling Price:</label>
                <InputNumber tooltip="Use only numbers" id="sellingPrice" className="w-full mb-3 p-inputtext-sm" value={_entity?.sellingPrice} onChange={(e) => setValByKey("sellingPrice", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sellingPrice"]) ? (
              <p className="m-0" key="error-sellingPrice">
                {error["sellingPrice"]}
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
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="autoRenew">Auto Renew:</label>
                <Checkbox id="autoRenew" className="ml-3" checked={_entity?.autoRenew} onChange={(e) => setValByKey("autoRenew", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["autoRenew"]) ? (
              <p className="m-0" key="error-autoRenew">
                {error["autoRenew"]}
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

export default connect(mapState, mapDispatch)(SubscriptionsCreateDialogComponent);

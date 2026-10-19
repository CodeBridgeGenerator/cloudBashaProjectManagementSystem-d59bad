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

const ProposalsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [leadNo, setLeadNo] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [leadNo], setError);
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
            proposalRef: _entity?.proposalRef,leadNo: _entity?.leadNo?._id,projectTitle: _entity?.projectTitle,proposalDate: _entity?.proposalDate,validTillDate: _entity?.validTillDate,scopeSummary: _entity?.scopeSummary,estimatedAmount: _entity?.estimatedAmount,currency: _entity?.currency,status: _entity?.status,generatedDoc: _entity?.generatedDoc,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("proposals").create(_data);
        const eagerResult = await client
            .service("proposals")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "leadNo",
                    service : "leads",
                    select:["companyName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Proposals updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Proposals" });
        }
        setLoading(false);
    };

    

    

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

    const leadNoOptions = leadNo.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Proposals" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="proposals-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="proposalRef">Proposal Ref:</label>
                <InputText id="proposalRef" className="w-full mb-3 p-inputtext-sm" value={_entity?.proposalRef} onChange={(e) => setValByKey("proposalRef", e.target.value)}  />
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
                <label htmlFor="projectTitle">Project Title:</label>
                <InputText id="projectTitle" className="w-full mb-3 p-inputtext-sm" value={_entity?.projectTitle} onChange={(e) => setValByKey("projectTitle", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectTitle"]) ? (
              <p className="m-0" key="error-projectTitle">
                {error["projectTitle"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="proposalDate">Proposal Date:</label>
                <Calendar id="proposalDate"  value={_entity?.proposalDate ? new Date(_entity?.proposalDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("proposalDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["proposalDate"]) ? (
              <p className="m-0" key="error-proposalDate">
                {error["proposalDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="validTillDate">Valid Till Date:</label>
                <Calendar id="validTillDate"  value={_entity?.validTillDate ? new Date(_entity?.validTillDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("validTillDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["validTillDate"]) ? (
              <p className="m-0" key="error-validTillDate">
                {error["validTillDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="scopeSummary">Scope Summary:</label>
                <InputText id="scopeSummary" className="w-full mb-3 p-inputtext-sm" value={_entity?.scopeSummary} onChange={(e) => setValByKey("scopeSummary", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["scopeSummary"]) ? (
              <p className="m-0" key="error-scopeSummary">
                {error["scopeSummary"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="estimatedAmount">Estimated Amount:</label>
                <InputNumber tooltip="Use only numbers" id="estimatedAmount" className="w-full mb-3" mode="currency" currency="MYR" locale="en-US" value={_entity?.estimatedAmount} onValueChange={(e) => setValByKey("estimatedAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["estimatedAmount"]) ? (
              <p className="m-0" key="error-estimatedAmount">
                {error["estimatedAmount"]}
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
                <label htmlFor="generatedDoc">Generated Doc:</label>
                <InputText id="generatedDoc" className="w-full mb-3 p-inputtext-sm" value={_entity?.generatedDoc} onChange={(e) => setValByKey("generatedDoc", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["generatedDoc"]) ? (
              <p className="m-0" key="error-generatedDoc">
                {error["generatedDoc"]}
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

export default connect(mapState, mapDispatch)(ProposalsCreateDialogComponent);

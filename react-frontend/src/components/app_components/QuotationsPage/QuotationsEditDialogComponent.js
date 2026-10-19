/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from "primereact/calendar";
import { InputNumber } from 'primereact/inputnumber';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const QuotationsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [proposalRef, setProposalRef] = useState([])
const [client, setClient] = useState([])
const [attentionTo, setAttentionTo] = useState([])
const [preparedBy, setPreparedBy] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount proposals
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
                    //on mount clients
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
                    //on mount profiles
                    client
                        .service("profiles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfilesId } })
                        .then((res) => {
                            setAttentionTo(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Profiles", type: "error", message: error.message || "Failed get profiles" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            quoteNo: _entity?.quoteNo,
proposalRef: _entity?.proposalRef?._id,
client: _entity?.client?._id,
attentionTo: _entity?.attentionTo?._id,
projectTitle: _entity?.projectTitle,
quoteDate: _entity?.quoteDate,
validTillDate: _entity?.validTillDate,
paymentTerms: _entity?.paymentTerms,
paymentMethod: _entity?.paymentMethod,
preparedBy: _entity?.preparedBy?._id,
currency: _entity?.currency,
subTotal: _entity?.subTotal,
discount: _entity?.discount,
taxRate: _entity?.taxRate,
taxAmount: _entity?.taxAmount,
finalAmount: _entity?.finalAmount,
status: _entity?.status,
generatedDoc: _entity?.generatedDoc,
        };

        setLoading(true);
        try {
            
        await client.service("quotations").patch(_entity._id, _data);
        const eagerResult = await client
            .service("quotations")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "proposalRef",
                    service : "proposals",
                    select:["proposalRef"]},{
                    path : "client",
                    service : "clients",
                    select:["company"]},{
                    path : "attentionTo",
                    service : "profiles",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info quotations updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

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

    const proposalRefOptions = proposalRef.map((elem) => ({ name: elem.name, value: elem.value }));
const clientOptions = client.map((elem) => ({ name: elem.name, value: elem.value }));
const attentionToOptions = attentionTo.map((elem) => ({ name: elem.name, value: elem.value }));
const preparedByOptions = preparedBy.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Quotations" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="quotations-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quoteNo">Quote No:</label>
                <InputText id="quoteNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.quoteNo} onChange={(e) => setValByKey("quoteNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quoteNo"]) && (
              <p className="m-0" key="error-quoteNo">
                {error["quoteNo"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="proposalRef">Proposal Ref:</label>
                <Dropdown id="proposalRef" value={_entity?.proposalRef?._id} optionLabel="name" optionValue="value" options={proposalRefOptions} onChange={(e) => setValByKey("proposalRef", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["proposalRef"]) && (
              <p className="m-0" key="error-proposalRef">
                {error["proposalRef"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="client">Client:</label>
                <Dropdown id="client" value={_entity?.client?._id} optionLabel="name" optionValue="value" options={clientOptions} onChange={(e) => setValByKey("client", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["client"]) && (
              <p className="m-0" key="error-client">
                {error["client"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="attentionTo">Attention To:</label>
                <Dropdown id="attentionTo" value={_entity?.attentionTo?._id} optionLabel="name" optionValue="value" options={attentionToOptions} onChange={(e) => setValByKey("attentionTo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["attentionTo"]) && (
              <p className="m-0" key="error-attentionTo">
                {error["attentionTo"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectTitle">Project Title:</label>
                <InputText id="projectTitle" className="w-full mb-3 p-inputtext-sm" value={_entity?.projectTitle} onChange={(e) => setValByKey("projectTitle", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectTitle"]) && (
              <p className="m-0" key="error-projectTitle">
                {error["projectTitle"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quoteDate">Quote Date:</label>
                <Calendar id="quoteDate"  value={_entity?.quoteDate ? new Date(_entity?.quoteDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("quoteDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quoteDate"]) && (
              <p className="m-0" key="error-quoteDate">
                {error["quoteDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="validTillDate">Valid Till Date:</label>
                <Calendar id="validTillDate"  value={_entity?.validTillDate ? new Date(_entity?.validTillDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("validTillDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["validTillDate"]) && (
              <p className="m-0" key="error-validTillDate">
                {error["validTillDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentTerms">Payment Terms:</label>
                <InputText id="paymentTerms" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentTerms} onChange={(e) => setValByKey("paymentTerms", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentTerms"]) && (
              <p className="m-0" key="error-paymentTerms">
                {error["paymentTerms"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentMethod">Payment Method:</label>
                <InputText id="paymentMethod" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentMethod} onChange={(e) => setValByKey("paymentMethod", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentMethod"]) && (
              <p className="m-0" key="error-paymentMethod">
                {error["paymentMethod"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="preparedBy">Prepared By:</label>
                <Dropdown id="preparedBy" value={_entity?.preparedBy?._id} optionLabel="name" optionValue="value" options={preparedByOptions} onChange={(e) => setValByKey("preparedBy", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["preparedBy"]) && (
              <p className="m-0" key="error-preparedBy">
                {error["preparedBy"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="currency">Currency:</label>
                <InputNumber tooltip="Use only numbers" id="currency" className="w-full mb-3 p-inputtext-sm" value={_entity?.currency} onChange={(e) => setValByKey("currency", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["currency"]) && (
              <p className="m-0" key="error-currency">
                {error["currency"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="subTotal">Sub Total:</label>
                <InputNumber tooltip="Use only numbers" id="subTotal" className="w-full mb-3 p-inputtext-sm" value={_entity?.subTotal} onChange={(e) => setValByKey("subTotal", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["subTotal"]) && (
              <p className="m-0" key="error-subTotal">
                {error["subTotal"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="discount">Discount:</label>
                <InputNumber tooltip="Use only numbers" id="discount" className="w-full mb-3 p-inputtext-sm" value={_entity?.discount} onChange={(e) => setValByKey("discount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["discount"]) && (
              <p className="m-0" key="error-discount">
                {error["discount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="taxRate">Tax Rate:</label>
                <InputNumber tooltip="Use only numbers" id="taxRate" className="w-full mb-3 p-inputtext-sm" value={_entity?.taxRate} onChange={(e) => setValByKey("taxRate", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["taxRate"]) && (
              <p className="m-0" key="error-taxRate">
                {error["taxRate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="taxAmount">Tax Amount:</label>
                <InputNumber tooltip="Use only numbers" id="taxAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.taxAmount} onChange={(e) => setValByKey("taxAmount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["taxAmount"]) && (
              <p className="m-0" key="error-taxAmount">
                {error["taxAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="finalAmount">Final Amount:</label>
                <InputNumber tooltip="Use only numbers" id="finalAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.finalAmount} onChange={(e) => setValByKey("finalAmount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["finalAmount"]) && (
              <p className="m-0" key="error-finalAmount">
                {error["finalAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="status">Status:</label>
                <InputText id="status" className="w-full mb-3 p-inputtext-sm" value={_entity?.status} onChange={(e) => setValByKey("status", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["status"]) && (
              <p className="m-0" key="error-status">
                {error["status"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="generatedDoc">Generated Doc:</label>
                <InputText id="generatedDoc" className="w-full mb-3 p-inputtext-sm" value={_entity?.generatedDoc} onChange={(e) => setValByKey("generatedDoc", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["generatedDoc"]) && (
              <p className="m-0" key="error-generatedDoc">
                {error["generatedDoc"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
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

export default connect(mapState, mapDispatch)(QuotationsEditDialogComponent);

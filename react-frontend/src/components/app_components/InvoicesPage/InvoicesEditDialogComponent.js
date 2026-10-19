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

const InvoicesEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [clientName, setClientName] = useState([])
const [projectName, setProjectName] = useState([])
const [quoteNo, setQuoteNo] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount clients
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
                    //on mount projects
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
                    //on mount quotations
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

    const onSave = async () => {
        let _data = {
            invoiceNo: _entity?.invoiceNo,
clientName: _entity?.clientName?._id,
projectName: _entity?.projectName?._id,
quoteNo: _entity?.quoteNo?._id,
milestone: _entity?.milestone,
invoiceDate: _entity?.invoiceDate,
dueDate: _entity?.dueDate,
currency: _entity?.currency,
subTotal: _entity?.subTotal,
discount: _entity?.discount,
taxRate: _entity?.taxRate,
taxAmount: _entity?.taxAmount,
totalAmount: _entity?.totalAmount,
paidAmount: _entity?.paidAmount,
balance: _entity?.balance,
status: _entity?.status,
        };

        setLoading(true);
        try {
            
        await client.service("invoices").patch(_entity._id, _data);
        const eagerResult = await client
            .service("invoices")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
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
        props.alert({ type: "success", title: "Edit info", message: "Info invoices updated successfully" });
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

    const clientNameOptions = clientName.map((elem) => ({ name: elem.name, value: elem.value }));
const projectNameOptions = projectName.map((elem) => ({ name: elem.name, value: elem.value }));
const quoteNoOptions = quoteNo.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Invoices" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="invoices-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="invoiceNo">Invoice No:</label>
                <InputText id="invoiceNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.invoiceNo} onChange={(e) => setValByKey("invoiceNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["invoiceNo"]) && (
              <p className="m-0" key="error-invoiceNo">
                {error["invoiceNo"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="clientName">Client Name:</label>
                <Dropdown id="clientName" value={_entity?.clientName?._id} optionLabel="name" optionValue="value" options={clientNameOptions} onChange={(e) => setValByKey("clientName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["clientName"]) && (
              <p className="m-0" key="error-clientName">
                {error["clientName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectName">Project Name:</label>
                <Dropdown id="projectName" value={_entity?.projectName?._id} optionLabel="name" optionValue="value" options={projectNameOptions} onChange={(e) => setValByKey("projectName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectName"]) && (
              <p className="m-0" key="error-projectName">
                {error["projectName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quoteNo">Quote No:</label>
                <Dropdown id="quoteNo" value={_entity?.quoteNo?._id} optionLabel="name" optionValue="value" options={quoteNoOptions} onChange={(e) => setValByKey("quoteNo", {_id : e.value})}  />
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
                <label htmlFor="milestone">Milestone:</label>
                <InputText id="milestone" className="w-full mb-3 p-inputtext-sm" value={_entity?.milestone} onChange={(e) => setValByKey("milestone", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["milestone"]) && (
              <p className="m-0" key="error-milestone">
                {error["milestone"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="invoiceDate">Invoice Date:</label>
                <Calendar id="invoiceDate"  value={_entity?.invoiceDate ? new Date(_entity?.invoiceDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("invoiceDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["invoiceDate"]) && (
              <p className="m-0" key="error-invoiceDate">
                {error["invoiceDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dueDate">Due Date:</label>
                <Calendar id="dueDate"  value={_entity?.dueDate ? new Date(_entity?.dueDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("dueDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dueDate"]) && (
              <p className="m-0" key="error-dueDate">
                {error["dueDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="currency">Currency:</label>
                <InputText id="currency" className="w-full mb-3 p-inputtext-sm" value={_entity?.currency} onChange={(e) => setValByKey("currency", e.target.value)}  />
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
                <label htmlFor="totalAmount">Total Amount:</label>
                <InputNumber tooltip="Use only numbers" id="totalAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.totalAmount} onChange={(e) => setValByKey("totalAmount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["totalAmount"]) && (
              <p className="m-0" key="error-totalAmount">
                {error["totalAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paidAmount">Paid Amount:</label>
                <InputNumber tooltip="Use only numbers" id="paidAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.paidAmount} onChange={(e) => setValByKey("paidAmount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paidAmount"]) && (
              <p className="m-0" key="error-paidAmount">
                {error["paidAmount"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="balance">Balance:</label>
                <InputNumber tooltip="Use only numbers" id="balance" className="w-full mb-3 p-inputtext-sm" value={_entity?.balance} onChange={(e) => setValByKey("balance", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["balance"]) && (
              <p className="m-0" key="error-balance">
                {error["balance"]}
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

export default connect(mapState, mapDispatch)(InvoicesEditDialogComponent);

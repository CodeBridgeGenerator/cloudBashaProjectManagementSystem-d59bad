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

const PaymentsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [clientName, setClientName] = useState([])
const [invoiceNo, setInvoiceNo] = useState([])
const [projectName, setProjectName] = useState([])

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
                    //on mount invoices
                    client
                        .service("invoices")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleInvoicesId } })
                        .then((res) => {
                            setInvoiceNo(res.data.map((e) => { return { name: e['invoiceNo'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Invoices", type: "error", message: error.message || "Failed get invoices" });
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

    const onSave = async () => {
        let _data = {
            paymentNo: _entity?.paymentNo,
projectName: _entity?.projectName,
clientName: _entity?.clientName?._id,
invoiceNo: _entity?.invoiceNo?._id,
projectName: _entity?.projectName?._id,
paymentDate: _entity?.paymentDate,
amount: _entity?.amount,
currency: _entity?.currency,
paymentMethod: _entity?.paymentMethod,
referenceNo: _entity?.referenceNo,
notes: _entity?.notes,
        };

        setLoading(true);
        try {
            
        await client.service("payments").patch(_entity._id, _data);
        const eagerResult = await client
            .service("payments")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "clientName",
                    service : "clients",
                    select:["company"]},{
                    path : "invoiceNo",
                    service : "invoices",
                    select:["invoiceNo"]},{
                    path : "projectName",
                    service : "projects",
                    select:["projectName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info payments updated successfully" });
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
const invoiceNoOptions = invoiceNo.map((elem) => ({ name: elem.name, value: elem.value }));
const projectNameOptions = projectName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Payments" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="payments-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentNo">Payment No:</label>
                <InputText id="paymentNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentNo} onChange={(e) => setValByKey("paymentNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentNo"]) && (
              <p className="m-0" key="error-paymentNo">
                {error["paymentNo"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectName">Project Name:</label>
                <InputText id="projectName" className="w-full mb-3 p-inputtext-sm" value={_entity?.projectName} onChange={(e) => setValByKey("projectName", e.target.value)}  />
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
                <label htmlFor="invoiceNo">Invoice No:</label>
                <Dropdown id="invoiceNo" value={_entity?.invoiceNo?._id} optionLabel="name" optionValue="value" options={invoiceNoOptions} onChange={(e) => setValByKey("invoiceNo", {_id : e.value})}  />
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
                <label htmlFor="paymentDate">Payment Date:</label>
                <Calendar id="paymentDate"  value={_entity?.paymentDate ? new Date(_entity?.paymentDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("paymentDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentDate"]) && (
              <p className="m-0" key="error-paymentDate">
                {error["paymentDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="amount">Amount:</label>
                <InputNumber tooltip="Use only numbers" id="amount" className="w-full mb-3 p-inputtext-sm" value={_entity?.amount} onChange={(e) => setValByKey("amount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["amount"]) && (
              <p className="m-0" key="error-amount">
                {error["amount"]}
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
                <label htmlFor="referenceNo">Reference No:</label>
                <InputText id="referenceNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.referenceNo} onChange={(e) => setValByKey("referenceNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["referenceNo"]) && (
              <p className="m-0" key="error-referenceNo">
                {error["referenceNo"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="notes">Notes:</label>
                <InputText id="notes" className="w-full mb-3 p-inputtext-sm" value={_entity?.notes} onChange={(e) => setValByKey("notes", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["notes"]) && (
              <p className="m-0" key="error-notes">
                {error["notes"]}
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

export default connect(mapState, mapDispatch)(PaymentsEditDialogComponent);

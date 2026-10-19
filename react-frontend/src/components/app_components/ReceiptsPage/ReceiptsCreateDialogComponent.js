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

const ReceiptsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [paymentNo, setPaymentNo] = useState([])
const [clientName, setClientName] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [paymentNo,clientName], setError);
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
            receiptNo: _entity?.receiptNo,paymentNo: _entity?.paymentNo?._id,clientName: _entity?.clientName?._id,invoiceNo: _entity?.invoiceNo,receiptDate: _entity?.receiptDate,amount: _entity?.amount,currency: _entity?.currency,receiptFile: _entity?.receiptFile,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("receipts").create(_data);
        const eagerResult = await client
            .service("receipts")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "paymentNo",
                    service : "payments",
                    select:["paymentNo"]},{
                    path : "clientName",
                    service : "clients",
                    select:["company"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Receipts updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Receipts" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount payments
                    client
                        .service("payments")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singlePaymentsId } })
                        .then((res) => {
                            setPaymentNo(res.data.map((e) => { return { name: e['paymentNo'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Payments", type: "error", message: error.message || "Failed get payments" });
                        });
                }, []);

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

    const paymentNoOptions = paymentNo.map((elem) => ({ name: elem.name, value: elem.value }));
const clientNameOptions = clientName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Receipts" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="receipts-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="receiptNo">Receipt No:</label>
                <InputText id="receiptNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.receiptNo} onChange={(e) => setValByKey("receiptNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["receiptNo"]) ? (
              <p className="m-0" key="error-receiptNo">
                {error["receiptNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentNo">Payment No:</label>
                <Dropdown id="paymentNo" value={_entity?.paymentNo?._id} optionLabel="name" optionValue="value" options={paymentNoOptions} onChange={(e) => setValByKey("paymentNo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentNo"]) ? (
              <p className="m-0" key="error-paymentNo">
                {error["paymentNo"]}
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
                <label htmlFor="invoiceNo">Invoice No:</label>
                <InputText id="invoiceNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.invoiceNo} onChange={(e) => setValByKey("invoiceNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["invoiceNo"]) ? (
              <p className="m-0" key="error-invoiceNo">
                {error["invoiceNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="receiptDate">Receipt Date:</label>
                <Calendar id="receiptDate"  value={_entity?.receiptDate ? new Date(_entity?.receiptDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("receiptDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["receiptDate"]) ? (
              <p className="m-0" key="error-receiptDate">
                {error["receiptDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="amount">Amount:</label>
                <InputNumber tooltip="Use only numbers" id="amount" className="w-full mb-3 p-inputtext-sm" value={_entity?.amount} onChange={(e) => setValByKey("amount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["amount"]) ? (
              <p className="m-0" key="error-amount">
                {error["amount"]}
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
                <label htmlFor="receiptFile">Receipt File:</label>
                <InputText id="receiptFile" className="w-full mb-3 p-inputtext-sm" value={_entity?.receiptFile} onChange={(e) => setValByKey("receiptFile", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["receiptFile"]) ? (
              <p className="m-0" key="error-receiptFile">
                {error["receiptFile"]}
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

export default connect(mapState, mapDispatch)(ReceiptsCreateDialogComponent);

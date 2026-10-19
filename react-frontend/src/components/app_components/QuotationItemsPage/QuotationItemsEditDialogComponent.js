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
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';


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

const QuotationItemsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [quoteNo, setQuoteNo] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

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
            quoteNo: _entity?.quoteNo?._id,
category: _entity?.category,
serviceName: _entity?.serviceName,
quantity: _entity?.quantity,
unit: _entity?.unit,
detailDescription: _entity?.detailDescription,
specification: _entity?.specification,
included: _entity?.included,
unitPrice: _entity?.unitPrice,
amount: _entity?.amount,
        };

        setLoading(true);
        try {
            
        await client.service("quotationItems").patch(_entity._id, _data);
        const eagerResult = await client
            .service("quotationItems")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "quoteNo",
                    service : "quotations",
                    select:["quoteNo"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info quotationItems updated successfully" });
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

    const quoteNoOptions = quoteNo.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Quotation Items" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="quotationItems-edit-dialog-component">
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
                <label htmlFor="category">Category:</label>
                <InputText id="category" className="w-full mb-3 p-inputtext-sm" value={_entity?.category} onChange={(e) => setValByKey("category", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["category"]) && (
              <p className="m-0" key="error-category">
                {error["category"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="serviceName">Service Name:</label>
                <InputText id="serviceName" className="w-full mb-3 p-inputtext-sm" value={_entity?.serviceName} onChange={(e) => setValByKey("serviceName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["serviceName"]) && (
              <p className="m-0" key="error-serviceName">
                {error["serviceName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quantity">Quantity:</label>
                <InputNumber tooltip="Use only numbers" id="quantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.quantity} onChange={(e) => setValByKey("quantity", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quantity"]) && (
              <p className="m-0" key="error-quantity">
                {error["quantity"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="unit">Unit:</label>
                <InputText id="unit" className="w-full mb-3 p-inputtext-sm" value={_entity?.unit} onChange={(e) => setValByKey("unit", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["unit"]) && (
              <p className="m-0" key="error-unit">
                {error["unit"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="detailDescription">Detail Description:</label>
                <InputText id="detailDescription" className="w-full mb-3 p-inputtext-sm" value={_entity?.detailDescription} onChange={(e) => setValByKey("detailDescription", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["detailDescription"]) && (
              <p className="m-0" key="error-detailDescription">
                {error["detailDescription"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="specification">Specification:</label>
                <InputText id="specification" className="w-full mb-3 p-inputtext-sm" value={_entity?.specification} onChange={(e) => setValByKey("specification", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["specification"]) && (
              <p className="m-0" key="error-specification">
                {error["specification"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="included">Included:</label>
                <Checkbox id="included" className="ml-3" checked={_entity?.included} onChange={(e) => setValByKey("included", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["included"]) && (
              <p className="m-0" key="error-included">
                {error["included"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="unitPrice">Unit Price:</label>
                <InputNumber tooltip="Use only numbers" id="unitPrice" className="w-full mb-3 p-inputtext-sm" value={_entity?.unitPrice} onChange={(e) => setValByKey("unitPrice", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["unitPrice"]) && (
              <p className="m-0" key="error-unitPrice">
                {error["unitPrice"]}
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

export default connect(mapState, mapDispatch)(QuotationItemsEditDialogComponent);

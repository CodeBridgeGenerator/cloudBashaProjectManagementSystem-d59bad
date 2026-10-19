import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";


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

const ProductPricingCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [], setError);
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
            pricingNo: _entity?.pricingNo,productCode: _entity?.productCode,productName: _entity?.productName,category: _entity?.category,pricingType: _entity?.pricingType,unit: _entity?.unit,costPrice: _entity?.costPrice,sellingPrice: _entity?.sellingPrice,currency: _entity?.currency,billingCycle: _entity?.billingCycle,effectiveFrom: _entity?.effectiveFrom,status: _entity?.status,notes: _entity?.notes,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("productPricing").create(_data);
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Product Pricing created successfully" });
        props.onCreateResult(result);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Product Pricing" });
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

    

    return (
        <Dialog header="Create Product Pricing" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="productPricing-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="pricingNo">Pricing No:</label>
                <InputText id="pricingNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.pricingNo} onChange={(e) => setValByKey("pricingNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["pricingNo"]) ? (
              <p className="m-0" key="error-pricingNo">
                {error["pricingNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="productCode">Product Code:</label>
                <InputText id="productCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.productCode} onChange={(e) => setValByKey("productCode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["productCode"]) ? (
              <p className="m-0" key="error-productCode">
                {error["productCode"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="productName">Product  Name:</label>
                <InputText id="productName" className="w-full mb-3 p-inputtext-sm" value={_entity?.productName} onChange={(e) => setValByKey("productName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["productName"]) ? (
              <p className="m-0" key="error-productName">
                {error["productName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="category">Category:</label>
                <InputText id="category" className="w-full mb-3 p-inputtext-sm" value={_entity?.category} onChange={(e) => setValByKey("category", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["category"]) ? (
              <p className="m-0" key="error-category">
                {error["category"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="pricingType">Pricing Type:</label>
                <InputText id="pricingType" className="w-full mb-3 p-inputtext-sm" value={_entity?.pricingType} onChange={(e) => setValByKey("pricingType", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["pricingType"]) ? (
              <p className="m-0" key="error-pricingType">
                {error["pricingType"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="unit">Unit:</label>
                <InputText id="unit" className="w-full mb-3 p-inputtext-sm" value={_entity?.unit} onChange={(e) => setValByKey("unit", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["unit"]) ? (
              <p className="m-0" key="error-unit">
                {error["unit"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="costPrice">Cost Price:</label>
                <InputNumber tooltip="Use only numbers" id="costPrice" className="w-full mb-3 p-inputtext-sm" value={_entity?.costPrice} onChange={(e) => setValByKey("costPrice", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["costPrice"]) ? (
              <p className="m-0" key="error-costPrice">
                {error["costPrice"]}
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
                <label htmlFor="effectiveFrom">Effective From:</label>
                <Calendar id="effectiveFrom"  value={_entity?.effectiveFrom ? new Date(_entity?.effectiveFrom) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("effectiveFrom", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["effectiveFrom"]) ? (
              <p className="m-0" key="error-effectiveFrom">
                {error["effectiveFrom"]}
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
                <label htmlFor="notes">Notes:</label>
                <InputText id="notes" className="w-full mb-3 p-inputtext-sm" value={_entity?.notes} onChange={(e) => setValByKey("notes", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["notes"]) ? (
              <p className="m-0" key="error-notes">
                {error["notes"]}
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

export default connect(mapState, mapDispatch)(ProductPricingCreateDialogComponent);

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
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

const ServiceCatalogueEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            serviceCode: _entity?.serviceCode,
serviceName: _entity?.serviceName,
serviceCategory: _entity?.serviceCategory,
billingType: _entity?.billingType,
defaultUnit: _entity?.defaultUnit,
defaultUnitPrice: _entity?.defaultUnitPrice,
currency: _entity?.currency,
active: _entity?.active,
        };

        setLoading(true);
        try {
            
        const result = await client.service("serviceCatalogue").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info serviceCatalogue updated successfully" });
        props.onEditResult(result);
        
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

    

    return (
        <Dialog header="Edit Service Catalogue" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="serviceCatalogue-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="serviceCode">Service Code:</label>
                <InputText id="serviceCode" className="w-full mb-3 p-inputtext-sm" value={_entity?.serviceCode} onChange={(e) => setValByKey("serviceCode", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["serviceCode"]) && (
              <p className="m-0" key="error-serviceCode">
                {error["serviceCode"]}
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
                <label htmlFor="serviceCategory">Service Category:</label>
                <InputText id="serviceCategory" className="w-full mb-3 p-inputtext-sm" value={_entity?.serviceCategory} onChange={(e) => setValByKey("serviceCategory", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["serviceCategory"]) && (
              <p className="m-0" key="error-serviceCategory">
                {error["serviceCategory"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="billingType">Billing Type:</label>
                <InputText id="billingType" className="w-full mb-3 p-inputtext-sm" value={_entity?.billingType} onChange={(e) => setValByKey("billingType", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["billingType"]) && (
              <p className="m-0" key="error-billingType">
                {error["billingType"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="defaultUnit">Default Unit:</label>
                <InputText id="defaultUnit" className="w-full mb-3 p-inputtext-sm" value={_entity?.defaultUnit} onChange={(e) => setValByKey("defaultUnit", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["defaultUnit"]) && (
              <p className="m-0" key="error-defaultUnit">
                {error["defaultUnit"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="defaultUnitPrice">Default Unit Price:</label>
                <InputNumber tooltip="Use only numbers" id="defaultUnitPrice" className="w-full mb-3 p-inputtext-sm" value={_entity?.defaultUnitPrice} onChange={(e) => setValByKey("defaultUnitPrice", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["defaultUnitPrice"]) && (
              <p className="m-0" key="error-defaultUnitPrice">
                {error["defaultUnitPrice"]}
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
<div className="col-12 md:col-6 field flex">
            <span className="align-items-center">
                <label htmlFor="active">Active:</label>
                <Checkbox id="active" className="ml-3" checked={_entity?.active} onChange={(e) => setValByKey("active", e.checked)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["active"]) && (
              <p className="m-0" key="error-active">
                {error["active"]}
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

export default connect(mapState, mapDispatch)(ServiceCatalogueEditDialogComponent);

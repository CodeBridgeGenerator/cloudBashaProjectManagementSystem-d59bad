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

const SmItemsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

    

    const onSave = async () => {
        let _data = {
            smNo: _entity?.smNo,
serviceName: _entity?.serviceName,
quantity: _entity?.quantity,
specification: _entity?.specification,
costingBasis: _entity?.costingBasis,
included: _entity?.included,
billingCycle: _entity?.billingCycle,
unitPrice: _entity?.unitPrice,
annualAmount: _entity?.annualAmount,
        };

        setLoading(true);
        try {
            
        const result = await client.service("smItems").patch(_entity._id, _data);
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info smItems updated successfully" });
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
        <Dialog header="Edit SM Items" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="smItems-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="smNo">SM No:</label>
                <InputText id="smNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.smNo} onChange={(e) => setValByKey("smNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["smNo"]) && (
              <p className="m-0" key="error-smNo">
                {error["smNo"]}
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
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="costingBasis">Costing Basis:</label>
                <InputText id="costingBasis" className="w-full mb-3 p-inputtext-sm" value={_entity?.costingBasis} onChange={(e) => setValByKey("costingBasis", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["costingBasis"]) && (
              <p className="m-0" key="error-costingBasis">
                {error["costingBasis"]}
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
                <label htmlFor="billingCycle">Billing Cycle:</label>
                <InputText id="billingCycle" className="w-full mb-3 p-inputtext-sm" value={_entity?.billingCycle} onChange={(e) => setValByKey("billingCycle", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["billingCycle"]) && (
              <p className="m-0" key="error-billingCycle">
                {error["billingCycle"]}
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
                <label htmlFor="annualAmount">Annual Amount:</label>
                <InputNumber tooltip="Use only numbers" id="annualAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.annualAmount} onChange={(e) => setValByKey("annualAmount", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["annualAmount"]) && (
              <p className="m-0" key="error-annualAmount">
                {error["annualAmount"]}
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

export default connect(mapState, mapDispatch)(SmItemsEditDialogComponent);

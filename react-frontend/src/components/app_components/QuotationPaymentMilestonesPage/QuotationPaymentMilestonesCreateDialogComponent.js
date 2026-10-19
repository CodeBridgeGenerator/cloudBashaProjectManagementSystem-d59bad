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

const QuotationPaymentMilestonesCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [quoteNo, setQuoteNo] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [quoteNo], setError);
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
            quoteNo: _entity?.quoteNo?._id,milestone: _entity?.milestone,percentage: _entity?.percentage,beforeTaxAmount: _entity?.beforeTaxAmount,afterTaxAmount: _entity?.afterTaxAmount,paymentTerms: _entity?.paymentTerms,sequence: _entity?.sequence,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("quotationPaymentMilestones").create(_data);
        const eagerResult = await client
            .service("quotationPaymentMilestones")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "quoteNo",
                    service : "quotations",
                    select:["quoteNo"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Quotation Payment Milestones updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Quotation Payment Milestones" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount quotations
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
        <Dialog header="Create Quotation Payment Milestones" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="quotationPaymentMilestones-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="quoteNo">Quote No:</label>
                <Dropdown id="quoteNo" value={_entity?.quoteNo?._id} optionLabel="name" optionValue="value" options={quoteNoOptions} onChange={(e) => setValByKey("quoteNo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["quoteNo"]) ? (
              <p className="m-0" key="error-quoteNo">
                {error["quoteNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="milestone">Milestone:</label>
                <InputText id="milestone" className="w-full mb-3 p-inputtext-sm" value={_entity?.milestone} onChange={(e) => setValByKey("milestone", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["milestone"]) ? (
              <p className="m-0" key="error-milestone">
                {error["milestone"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="percentage">Percentage:</label>
                <InputNumber tooltip="Use only numbers" id="percentage" className="w-full mb-3 p-inputtext-sm" value={_entity?.percentage} onChange={(e) => setValByKey("percentage", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["percentage"]) ? (
              <p className="m-0" key="error-percentage">
                {error["percentage"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="beforeTaxAmount">Before Tax Amount:</label>
                <InputNumber tooltip="Use only numbers" id="beforeTaxAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.beforeTaxAmount} onChange={(e) => setValByKey("beforeTaxAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["beforeTaxAmount"]) ? (
              <p className="m-0" key="error-beforeTaxAmount">
                {error["beforeTaxAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="afterTaxAmount">After Tax Amount:</label>
                <InputNumber tooltip="Use only numbers" id="afterTaxAmount" className="w-full mb-3 p-inputtext-sm" value={_entity?.afterTaxAmount} onChange={(e) => setValByKey("afterTaxAmount", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["afterTaxAmount"]) ? (
              <p className="m-0" key="error-afterTaxAmount">
                {error["afterTaxAmount"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="paymentTerms">Payment Terms:</label>
                <InputText id="paymentTerms" className="w-full mb-3 p-inputtext-sm" value={_entity?.paymentTerms} onChange={(e) => setValByKey("paymentTerms", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["paymentTerms"]) ? (
              <p className="m-0" key="error-paymentTerms">
                {error["paymentTerms"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="sequence">Sequence:</label>
                <InputNumber tooltip="Use only numbers" id="sequence" className="w-full mb-3 p-inputtext-sm" value={_entity?.sequence} onChange={(e) => setValByKey("sequence", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["sequence"]) ? (
              <p className="m-0" key="error-sequence">
                {error["sequence"]}
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

export default connect(mapState, mapDispatch)(QuotationPaymentMilestonesCreateDialogComponent);

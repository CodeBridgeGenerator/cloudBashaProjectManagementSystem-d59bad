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
import { Calendar } from 'primereact/calendar';


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

const FollowUpsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [assignedTo, setAssignedTo] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount profiles
                    client
                        .service("profiles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfilesId } })
                        .then((res) => {
                            setAssignedTo(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Profiles", type: "error", message: error.message || "Failed get profiles" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            referenceType: _entity?.referenceType,
referenceNo: _entity?.referenceNo,
assignedTo: _entity?.assignedTo?._id,
followUpType: _entity?.followUpType,
subject: _entity?.subject,
followUpDate: _entity?.followUpDate,
status: _entity?.status,
notes: _entity?.notes,
        };

        setLoading(true);
        try {
            
        await client.service("followUps").patch(_entity._id, _data);
        const eagerResult = await client
            .service("followUps")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "assignedTo",
                    service : "profiles",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info followUps updated successfully" });
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

    const assignedToOptions = assignedTo.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Follow Ups" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="followUps-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="referenceType">Reference Type:</label>
                <InputText id="referenceType" className="w-full mb-3 p-inputtext-sm" value={_entity?.referenceType} onChange={(e) => setValByKey("referenceType", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["referenceType"]) && (
              <p className="m-0" key="error-referenceType">
                {error["referenceType"]}
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
                <label htmlFor="assignedTo">Assigned To:</label>
                <Dropdown id="assignedTo" value={_entity?.assignedTo?._id} optionLabel="name" optionValue="value" options={assignedToOptions} onChange={(e) => setValByKey("assignedTo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["assignedTo"]) && (
              <p className="m-0" key="error-assignedTo">
                {error["assignedTo"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="followUpType">Follow Up Type:</label>
                <InputText id="followUpType" className="w-full mb-3 p-inputtext-sm" value={_entity?.followUpType} onChange={(e) => setValByKey("followUpType", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["followUpType"]) && (
              <p className="m-0" key="error-followUpType">
                {error["followUpType"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="subject">Subject:</label>
                <InputText id="subject" className="w-full mb-3 p-inputtext-sm" value={_entity?.subject} onChange={(e) => setValByKey("subject", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["subject"]) && (
              <p className="m-0" key="error-subject">
                {error["subject"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="followUpDate">Follow Up Date:</label>
                <Calendar id="followUpDate" value={_entity?.followUpDate ? new Date(_entity?.followUpDate) : null} onChange={ (e) => setValByKey("followUpDate", e.value)} showTime hourFormat="24"  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["followUpDate"]) && (
              <p className="m-0" key="error-followUpDate">
                {error["followUpDate"]}
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

export default connect(mapState, mapDispatch)(FollowUpsEditDialogComponent);

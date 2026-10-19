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

const TasksCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [projectName, setProjectName] = useState([])
const [assignedTo, setAssignedTo] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [projectName,assignedTo], setError);
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
            taskNo: _entity?.taskNo,projectName: _entity?.projectName?._id,taskName: _entity?.taskName,description: _entity?.description,assignedTo: _entity?.assignedTo?._id,priority: _entity?.priority,status: _entity?.status,startDate: _entity?.startDate,dueDate: _entity?.dueDate,estimatedHours: _entity?.estimatedHours,actualHours: _entity?.actualHours,progress: _entity?.progress,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("tasks").create(_data);
        const eagerResult = await client
            .service("tasks")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "projectName",
                    service : "projects",
                    select:["projectName"]},{
                    path : "assignedTo",
                    service : "profiles",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Tasks updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.debug("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Tasks" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount projects
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
                    // on mount profiles
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

    const projectNameOptions = projectName.map((elem) => ({ name: elem, value: elem }));
const assignedToOptions = assignedTo.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Tasks" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="tasks-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="taskNo">Task No:</label>
                <InputText id="taskNo" className="w-full mb-3 p-inputtext-sm" value={_entity?.taskNo} onChange={(e) => setValByKey("taskNo", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["taskNo"]) ? (
              <p className="m-0" key="error-taskNo">
                {error["taskNo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="projectName">Project Name:</label>
                <Dropdown id="projectName" value={_entity?.projectName?._id} optionLabel="name" optionValue="value" options={projectNameOptions} onChange={(e) => setValByKey("projectName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["projectName"]) ? (
              <p className="m-0" key="error-projectName">
                {error["projectName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="taskName">Task Name:</label>
                <InputText id="taskName" className="w-full mb-3 p-inputtext-sm" value={_entity?.taskName} onChange={(e) => setValByKey("taskName", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["taskName"]) ? (
              <p className="m-0" key="error-taskName">
                {error["taskName"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="description">Description:</label>
                <InputText id="description" className="w-full mb-3 p-inputtext-sm" value={_entity?.description} onChange={(e) => setValByKey("description", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["description"]) ? (
              <p className="m-0" key="error-description">
                {error["description"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="assignedTo">Assigned To:</label>
                <Dropdown id="assignedTo" value={_entity?.assignedTo?._id} optionLabel="name" optionValue="value" options={assignedToOptions} onChange={(e) => setValByKey("assignedTo", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["assignedTo"]) ? (
              <p className="m-0" key="error-assignedTo">
                {error["assignedTo"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="priority">Priority:</label>
                <InputText id="priority" className="w-full mb-3 p-inputtext-sm" value={_entity?.priority} onChange={(e) => setValByKey("priority", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["priority"]) ? (
              <p className="m-0" key="error-priority">
                {error["priority"]}
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
                <label htmlFor="startDate">Start Date:</label>
                <Calendar id="startDate"  value={_entity?.startDate ? new Date(_entity?.startDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("startDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["startDate"]) ? (
              <p className="m-0" key="error-startDate">
                {error["startDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="dueDate">Due Date:</label>
                <Calendar id="dueDate"  value={_entity?.dueDate ? new Date(_entity?.dueDate) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("dueDate", new Date(e.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["dueDate"]) ? (
              <p className="m-0" key="error-dueDate">
                {error["dueDate"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="estimatedHours">Estimated Hours:</label>
                <InputNumber tooltip="Use only numbers" id="estimatedHours" className="w-full mb-3 p-inputtext-sm" value={_entity?.estimatedHours} onChange={(e) => setValByKey("estimatedHours", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["estimatedHours"]) ? (
              <p className="m-0" key="error-estimatedHours">
                {error["estimatedHours"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="actualHours">Actual Hours:</label>
                <InputNumber tooltip="Use only numbers" id="actualHours" className="w-full mb-3 p-inputtext-sm" value={_entity?.actualHours} onChange={(e) => setValByKey("actualHours", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["actualHours"]) ? (
              <p className="m-0" key="error-actualHours">
                {error["actualHours"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="progress">Progress:</label>
                <InputNumber tooltip="Use only numbers" id="progress" className="w-full mb-3 p-inputtext-sm" value={_entity?.progress} onChange={(e) => setValByKey("progress", e.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["progress"]) ? (
              <p className="m-0" key="error-progress">
                {error["progress"]}
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

export default connect(mapState, mapDispatch)(TasksCreateDialogComponent);

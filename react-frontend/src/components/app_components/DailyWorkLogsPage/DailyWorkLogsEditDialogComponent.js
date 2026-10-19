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

const DailyWorkLogsEditDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [employee, setEmployee] = useState([])
const [projectName, setProjectName] = useState([])
const [taskName, setTaskName] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount profiles
                    client
                        .service("profiles")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleProfilesId } })
                        .then((res) => {
                            setEmployee(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Profiles", type: "error", message: error.message || "Failed get profiles" });
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
                    //on mount tasks
                    client
                        .service("tasks")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleTasksId } })
                        .then((res) => {
                            setTaskName(res.data.map((e) => { return { name: e['taskName'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.debug({ error });
                            props.alert({ title: "Tasks", type: "error", message: error.message || "Failed get tasks" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            workDate: _entity?.workDate,
employee: _entity?.employee?._id,
projectName: _entity?.projectName?._id,
taskName: _entity?.taskName?._id,
hours: _entity?.hours,
workDone: _entity?.workDone,
blockers: _entity?.blockers,
nextPlan: _entity?.nextPlan,
        };

        setLoading(true);
        try {
            
        await client.service("dailyWorkLogs").patch(_entity._id, _data);
        const eagerResult = await client
            .service("dailyWorkLogs")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "employee",
                    service : "profiles",
                    select:["name"]},{
                    path : "projectName",
                    service : "projects",
                    select:["projectName"]},{
                    path : "taskName",
                    service : "tasks",
                    select:["taskName"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info dailyWorkLogs updated successfully" });
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

    const employeeOptions = employee.map((elem) => ({ name: elem.name, value: elem.value }));
const projectNameOptions = projectName.map((elem) => ({ name: elem.name, value: elem.value }));
const taskNameOptions = taskName.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Daily Work Logs" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "50vw", fontFamily: "Inter, sans-serif", fontSize: "14px", "--cb-font": "Inter, sans-serif", "--cb-size": "14px" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000 cb-appearance" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="dailyWorkLogs-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="workDate">Work Date:</label>
                <InputText id="workDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.workDate} onChange={(e) => setValByKey("workDate", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["workDate"]) && (
              <p className="m-0" key="error-workDate">
                {error["workDate"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="employee">Employee:</label>
                <Dropdown id="employee" value={_entity?.employee?._id} optionLabel="name" optionValue="value" options={employeeOptions} onChange={(e) => setValByKey("employee", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["employee"]) && (
              <p className="m-0" key="error-employee">
                {error["employee"]}
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
                <label htmlFor="taskName">Task Name:</label>
                <Dropdown id="taskName" value={_entity?.taskName?._id} optionLabel="name" optionValue="value" options={taskNameOptions} onChange={(e) => setValByKey("taskName", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["taskName"]) && (
              <p className="m-0" key="error-taskName">
                {error["taskName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="hours">Hours:</label>
                <InputNumber tooltip="Use only numbers" id="hours" className="w-full mb-3 p-inputtext-sm" value={_entity?.hours} onChange={(e) => setValByKey("hours", e.value)}  useGrouping={false}/>
            </span>
            <small className="p-error">
            {!_.isEmpty(error["hours"]) && (
              <p className="m-0" key="error-hours">
                {error["hours"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="workDone">Work Done:</label>
                <InputText id="workDone" className="w-full mb-3 p-inputtext-sm" value={_entity?.workDone} onChange={(e) => setValByKey("workDone", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["workDone"]) && (
              <p className="m-0" key="error-workDone">
                {error["workDone"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="blockers">Blockers:</label>
                <InputText id="blockers" className="w-full mb-3 p-inputtext-sm" value={_entity?.blockers} onChange={(e) => setValByKey("blockers", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["blockers"]) && (
              <p className="m-0" key="error-blockers">
                {error["blockers"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="nextPlan">Next Plan:</label>
                <InputText id="nextPlan" className="w-full mb-3 p-inputtext-sm" value={_entity?.nextPlan} onChange={(e) => setValByKey("nextPlan", e.target.value)}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["nextPlan"]) && (
              <p className="m-0" key="error-nextPlan">
                {error["nextPlan"]}
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

export default connect(mapState, mapDispatch)(DailyWorkLogsEditDialogComponent);

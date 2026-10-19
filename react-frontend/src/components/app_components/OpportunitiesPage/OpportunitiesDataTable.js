import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useRef, useEffect} from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { useParams } from "react-router-dom";
import config from "../../../resources/config.json";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from 'primereact/inputtext';
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";
import { Checkbox } from "primereact/checkbox";

const columnMinWidth = `${Number((((config.appearance || {}).services || {})["opportunities"] || {}).tableColWidth) || 8}rem`;
const OpportunitiesDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
    showFilter, setShowFilter,
    showColumns, setShowColumns, onClickSaveFilteredfields ,
    selectedFilterFields, setSelectedFilterFields,
    selectedHideFields, setSelectedHideFields, onClickSaveHiddenfields, loading, user,   selectedDelete,
  setSelectedDelete, onCreateResult}) => {
    const dt = useRef(null);
    const urlParams = useParams();
    const [globalFilter, setGlobalFilter] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);
  const header = (
    <div
      className="table-header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h5 className="m-0"></h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Keyword Search"
        />
      </span>
    </div>
  );

const pClientNoClientNoTemplate0_0 = (rowData, { rowIndex }) => <p >{rowData.clientNo?.clientNo}</p>
const pLeadNoCompanyNameTemplate1_0 = (rowData, { rowIndex }) => <p >{rowData.leadNo?.companyName}</p>
const pOpportunityNameTemplate2 = (rowData, { rowIndex }) => <p >{rowData.opportunityName}</p>
const pRequestTypeTemplate3 = (rowData, { rowIndex }) => <p >{rowData.requestType}</p>
const p_dateRequestDateTemplate4 = (rowData, { rowIndex }) => <p >{moment(rowData.requestDate).fromNow()}</p>
const pContactNameTemplate5 = (rowData, { rowIndex }) => <p >{rowData.contactName}</p>
const pResponsibleToNameTemplate6_0 = (rowData, { rowIndex }) => <p >{rowData.responsibleTo?.name}</p>
const pEstimatedValueTemplate7 = (rowData, { rowIndex }) => <p >{rowData.estimatedValue}</p>
const pCurrencyTemplate8 = (rowData, { rowIndex }) => <p >{rowData.currency}</p>
const pStageTemplate9 = (rowData, { rowIndex }) => <p >{rowData.stage}</p>
const pProbabilityTemplate10 = (rowData, { rowIndex }) => <p >{rowData.probability}</p>
const pExpectedCloseDateTemplate11 = (rowData, { rowIndex }) => <p >{rowData.expectedCloseDate}</p>
const pOutcomeTemplate12 = (rowData, { rowIndex }) => <p >{rowData.outcome}</p>
const pNextActionTemplate13 = (rowData, { rowIndex }) => <p >{rowData.nextAction}</p>
const pAccountableToNameTemplate14_0 = (rowData, { rowIndex }) => <p >{rowData.accountableTo?.name}</p>
const pConsultedToNameTemplate15_0 = (rowData, { rowIndex }) => <p >{rowData.consultedTo?.name}</p>
const pInformedToNameTemplate16_0 = (rowData, { rowIndex }) => <p >{rowData.informedTo?.name}</p>
    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowData._id)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
      const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id,
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map((item) =>
        client.service("companies").remove(item._id),
      );
      await Promise.all(promises);
      const updatedData = data.filter(
        (item) => !selectedItems.find((selected) => selected._id === item._id),
      );
      setData(updatedData);
      setSelectedDelete(selectedItems.map((item) => item._id));

      deselectAllRows();
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };
    
  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

    return (
        <>
        <DataTable 
           value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
        globalFilter={globalFilter}
        header={header}
        >
                <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
<Column field="clientNo.clientNo" header="Client No" body={pClientNoClientNoTemplate0_0} style={{ minWidth: columnMinWidth }} />
<Column field="leadNo.companyName" header="Company Name" body={pLeadNoCompanyNameTemplate1_0} style={{ minWidth: columnMinWidth }} />
<Column field="opportunityName" header="Opportunity Name" body={pOpportunityNameTemplate2} filter={selectedFilterFields.includes("opportunityName")} hidden={selectedHideFields?.includes("opportunityName")}    style={{ minWidth: columnMinWidth }} />
<Column field="requestType" header="Request Type" body={pRequestTypeTemplate3} filter={selectedFilterFields.includes("requestType")} hidden={selectedHideFields?.includes("requestType")}    style={{ minWidth: columnMinWidth }} />
<Column field="requestDate" header="Request Date" body={p_dateRequestDateTemplate4} filter={selectedFilterFields.includes("requestDate")} hidden={selectedHideFields?.includes("requestDate")}  sortable  style={{ minWidth: columnMinWidth }} />
<Column field="contactName" header="Contact Name" body={pContactNameTemplate5} filter={selectedFilterFields.includes("contactName")} hidden={selectedHideFields?.includes("contactName")}    style={{ minWidth: columnMinWidth }} />
<Column field="responsibleTo.name" header="Name" body={pResponsibleToNameTemplate6_0} style={{ minWidth: columnMinWidth }} />
<Column field="estimatedValue" header="Estimated Value" body={pEstimatedValueTemplate7} filter={selectedFilterFields.includes("estimatedValue")} hidden={selectedHideFields?.includes("estimatedValue")}    style={{ minWidth: columnMinWidth }} />
<Column field="currency" header="Currency" body={pCurrencyTemplate8} filter={selectedFilterFields.includes("currency")} hidden={selectedHideFields?.includes("currency")}    style={{ minWidth: columnMinWidth }} />
<Column field="stage" header="Stage" body={pStageTemplate9} filter={selectedFilterFields.includes("stage")} hidden={selectedHideFields?.includes("stage")}    style={{ minWidth: columnMinWidth }} />
<Column field="probability" header="Probability" body={pProbabilityTemplate10} filter={selectedFilterFields.includes("probability")} hidden={selectedHideFields?.includes("probability")}    style={{ minWidth: columnMinWidth }} />
<Column field="expectedCloseDate" header="Expected Close Date" body={pExpectedCloseDateTemplate11} filter={selectedFilterFields.includes("expectedCloseDate")} hidden={selectedHideFields?.includes("expectedCloseDate")}    style={{ minWidth: columnMinWidth }} />
<Column field="outcome" header="Outcome" body={pOutcomeTemplate12} filter={selectedFilterFields.includes("outcome")} hidden={selectedHideFields?.includes("outcome")}    style={{ minWidth: columnMinWidth }} />
<Column field="nextAction" header="Next Action" body={pNextActionTemplate13} filter={selectedFilterFields.includes("nextAction")} hidden={selectedHideFields?.includes("nextAction")}    style={{ minWidth: columnMinWidth }} />
<Column field="accountableTo.name" header="Name" body={pAccountableToNameTemplate14_0} style={{ minWidth: columnMinWidth }} />
<Column field="consultedTo.name" header="Name" body={pConsultedToNameTemplate15_0} style={{ minWidth: columnMinWidth }} />
<Column field="informedTo.name" header="Name" body={pInformedToNameTemplate16_0} style={{ minWidth: columnMinWidth }} />
            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
            
        </DataTable>


      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Copy button */}
            <Button
              label="Copy"
              labelposition="right"
              icon={
                <img
                  src={CopyIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Copy"
              // onClick={handleCopy}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Duplicate button */}
            <Button
              label="Duplicate"
              labelposition="right"
              icon={
                <img
                  src={DuplicateIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Duplicate"
              // onClick={handleDuplicate}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Export button */}
            <Button
              label="Export"
              labelposition="right"
              icon={
                <img
                  src={ExportIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Export"
              // onClick={handleExport}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Message button */}
            <Button
              label="Message"
              labelposition="right"
              icon={
                <img
                  src={InviteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleMessage}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* InboxCreateDialogComponent */}
            <InboxCreateDialogComponent
              show={showDialog}
              onHide={handleHideDialog}
              serviceInbox="companies"
              onCreateResult={onCreateResult}
              // selectedItemsId={selectedItems.map(item => item._id)}
              selectedItemsId={selectedItems}
            />

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Button
              label="Delete"
              labelposition="right"
              icon={
                <img
                  src={DeleteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}


        <Dialog header="Upload Opportunities Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="opportunities"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search Opportunities" visible={searchDialog} onHide={() => setSearchDialog(false)}>
      Search
    </Dialog>
      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false)
          }}
        ></Button>
      </Dialog>
        </>
    );
};

export default OpportunitiesDataTable;
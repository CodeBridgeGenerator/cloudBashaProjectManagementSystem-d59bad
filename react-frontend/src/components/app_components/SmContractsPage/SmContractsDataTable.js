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

const columnMinWidth = `${Number((((config.appearance || {}).services || {})["smContracts"] || {}).tableColWidth) || 8}rem`;
const SmContractsDataTable = ({ items, fields, onEditRow, onRowDelete, onRowClick, searchDialog, setSearchDialog,   showUpload, setShowUpload,
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

const pSMNoTemplate0 = (rowData, { rowIndex }) => <p >{rowData.sMNo}</p>
const pClientNameCompanyTemplate1_0 = (rowData, { rowIndex }) => <p >{rowData.clientName?.company}</p>
const pProjectNameProjectNameTemplate2_0 = (rowData, { rowIndex }) => <p >{rowData.projectName?.projectName}</p>
const pQuoteNoQuoteNoTemplate3_0 = (rowData, { rowIndex }) => <p >{rowData.quoteNo?.quoteNo}</p>
const pAgreementTitleTemplate4 = (rowData, { rowIndex }) => <p >{rowData.agreementTitle}</p>
const p_dateStartDateTemplate5 = (rowData, { rowIndex }) => <p >{moment(rowData.startDate).fromNow()}</p>
const p_dateEndDateTemplate6 = (rowData, { rowIndex }) => <p >{moment(rowData.endDate).fromNow()}</p>
const pContractPeriodTemplate7 = (rowData, { rowIndex }) => <p >{rowData.contractPeriod}</p>
const pPaymentTermsTemplate8 = (rowData, { rowIndex }) => <p >{rowData.paymentTerms}</p>
const pCurrencyTemplate9 = (rowData, { rowIndex }) => <p >{rowData.currency}</p>
const pSubTotalTemplate10 = (rowData, { rowIndex }) => <p >{rowData.subTotal}</p>
const pTaxRateTemplate11 = (rowData, { rowIndex }) => <p >{rowData.taxRate}</p>
const pFinalAmountTemplate12 = (rowData, { rowIndex }) => <p >{rowData.finalAmount}</p>
const pStatusTemplate13 = (rowData, { rowIndex }) => <p >{rowData.status}</p>
const pNextRenewalDateTemplate14 = (rowData, { rowIndex }) => <p >{rowData.nextRenewalDate}</p>
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
<Column field="sMNo" header="S M No" body={pSMNoTemplate0} filter={selectedFilterFields.includes("sMNo")} hidden={selectedHideFields?.includes("sMNo")}    style={{ minWidth: columnMinWidth }} />
<Column field="clientName.company" header="Company" body={pClientNameCompanyTemplate1_0} style={{ minWidth: columnMinWidth }} />
<Column field="projectName.projectName" header="Project Name" body={pProjectNameProjectNameTemplate2_0} style={{ minWidth: columnMinWidth }} />
<Column field="quoteNo.quoteNo" header="Quote No" body={pQuoteNoQuoteNoTemplate3_0} style={{ minWidth: columnMinWidth }} />
<Column field="agreementTitle" header="Agreement Title" body={pAgreementTitleTemplate4} filter={selectedFilterFields.includes("agreementTitle")} hidden={selectedHideFields?.includes("agreementTitle")}    style={{ minWidth: columnMinWidth }} />
<Column field="startDate" header="Start Date" body={p_dateStartDateTemplate5} filter={selectedFilterFields.includes("startDate")} hidden={selectedHideFields?.includes("startDate")}  sortable  style={{ minWidth: columnMinWidth }} />
<Column field="endDate" header="End Date" body={p_dateEndDateTemplate6} filter={selectedFilterFields.includes("endDate")} hidden={selectedHideFields?.includes("endDate")}  sortable  style={{ minWidth: columnMinWidth }} />
<Column field="contractPeriod" header="Contract Period" body={pContractPeriodTemplate7} filter={selectedFilterFields.includes("contractPeriod")} hidden={selectedHideFields?.includes("contractPeriod")}    style={{ minWidth: columnMinWidth }} />
<Column field="paymentTerms" header="Payment Terms" body={pPaymentTermsTemplate8} filter={selectedFilterFields.includes("paymentTerms")} hidden={selectedHideFields?.includes("paymentTerms")}    style={{ minWidth: columnMinWidth }} />
<Column field="currency" header="Currency" body={pCurrencyTemplate9} filter={selectedFilterFields.includes("currency")} hidden={selectedHideFields?.includes("currency")}    style={{ minWidth: columnMinWidth }} />
<Column field="subTotal" header="Sub Total" body={pSubTotalTemplate10} filter={selectedFilterFields.includes("subTotal")} hidden={selectedHideFields?.includes("subTotal")}    style={{ minWidth: columnMinWidth }} />
<Column field="taxRate" header="Tax Rate" body={pTaxRateTemplate11} filter={selectedFilterFields.includes("taxRate")} hidden={selectedHideFields?.includes("taxRate")}    style={{ minWidth: columnMinWidth }} />
<Column field="finalAmount" header="Final Amount" body={pFinalAmountTemplate12} filter={selectedFilterFields.includes("finalAmount")} hidden={selectedHideFields?.includes("finalAmount")}    style={{ minWidth: columnMinWidth }} />
<Column field="status" header="Status" body={pStatusTemplate13} filter={selectedFilterFields.includes("status")} hidden={selectedHideFields?.includes("status")}    style={{ minWidth: columnMinWidth }} />
<Column field="nextRenewalDate" header="Next Renewal Date" body={pNextRenewalDateTemplate14} filter={selectedFilterFields.includes("nextRenewalDate")} hidden={selectedHideFields?.includes("nextRenewalDate")}    style={{ minWidth: columnMinWidth }} />
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


        <Dialog header="Upload SmContracts Data" visible={showUpload} onHide={() => setShowUpload(false)}>
        <UploadService 
          user={user} 
          serviceName="smContracts"            
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}/>
      </Dialog>

      <Dialog header="Search SmContracts" visible={searchDialog} onHide={() => setSearchDialog(false)}>
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

export default SmContractsDataTable;
import * as React from "react";
import toast from "react-hot-toast";
import { useContext, useState, useEffect } from "react";
import MUIDataGrid from "../components/DataGridTables/MUIDataGrid";

import { FetchData } from "../functions/FetchData.function";
import { GlobalContext } from "../global-context/GlobalContextComponent";

import CustomButton1 from "../components/CustomButton1.component";
import Title from "../components/SectionComponents/Title.component";
import Controls2 from "../components/SectionComponents/Controls2.component";
import DialogBox from "../components/DialogBoxComponents/DialogBox.compoent";
import DateTopLabeled from "../components/DialogBoxComponents/DateTopLabeled";
import TextFieldTopLabeled from "../components/DialogBoxComponents/TextFieldTopLabeled";
import { formattedDate } from "../utils/formateddate";
import { MdDelete } from "react-icons/md";

function Vouchers() {
    // Global Context
    let GC = useContext(GlobalContext);

    let date = new Date();
    let dateFiledFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date
        .getUTCDate()
        .toLocaleString("US", {
            minimumIntegerDigits: 2,
        })}`;

    // Dialog box states
    let [action, setAction] = useState("Add");
    let [dialogBoxTitle, setDialogBoxTitle] = useState("");
    let [dialogBox, setDialogBox] = useState(false);

    // Form States: PR-Master
    let [jvmId, setJvmId] = useState(
        GC?.journalVoucherMasterData[GC?.journalVoucherMasterData?.length - 1]?.JVM_ID + 1 || 1
    );
    let [jvmType, setJvmType] = useState("");
    let [jvmTypeNo, setJvmTypeNo] = useState("");
    let [jvmBackupTypeNo, setBackupJvmTypeNo] = useState("");
    let [jvmDate, setJvmDate] = useState("");
    let [jvmNarration, setJvmNarration] = useState("");

    // Form States: PR-Details
    let [dbCr, setDbCr] = useState("DB");
    let [acName, setAcName] = useState("");
    let [acId, setAcId] = useState("");
    let [cr, setCr] = useState("");
    let [db, setDb] = useState("");
    let [narration, setNarration] = useState("");

    // Payment & Receipt PR-Details array:
    let [jvdArray, setJvdArray] = useState([]);
    let [jvdCrTotal, setJvdCrTotal] = useState(0);
    let [jvdDbTotal, setJvdDbTotal] = useState(0);


    let [deletedItem, setDeletedItem] = useState([]);

    let [maxId, setMaxId] = useState(1);

    // Datagrid state
    let [apiRef, setApiRef] = useState();

    useEffect(function () {
        FetchData("POST", "/api/vouchers/get-details/" + localStorage.getItem("lmId")).then(
            (res) => {
                console.log(res);
                setMaxId(res?.data?.max_id);
                setJvmId(res?.data?.max_id + 1);
                if (res?.isSuccess) {
                    if (res?.data) {
                        var counts = [];
                        GC?.setJournalVoucherDetailsData(res?.data?.journalVoucherDetailsData);
                        GC?.setJournalVoucherMasterData(res?.data?.journalVoucherMasterData);

                        console.log(res?.data?.journalVoucherDetailsData);
                        console.log(res?.data?.journalVoucherMasterData);
                        res?.data?.journalVoucherMasterData.map((item) => {
                            if (parseInt(localStorage.getItem("lmId")) === item.COMP_ID) {
                                if (item.JVM_TYPE_WISE_ID) {
                                    counts.push(item.JVM_TYPE_WISE_ID);
                                } else {
                                    counts.push(0);
                                }
                            }
                        });
                        console.log(counts);

                        var maxTyepWiseId = 0;
                        if (counts.length !== 0) {
                            maxTyepWiseId = Math.max(...counts);
                        }
                        setJvmTypeNo(maxTyepWiseId + 1);
                        setBackupJvmTypeNo(maxTyepWiseId + 1);
                    }
                } else {
                    setJvmTypeNo(1);
                    GC?.setJournalVoucherDetailsData([]);
                    GC?.setJournalVoucherMasterData([]);

                    toast.error(res?.message || "Failed to purchase data");
                }
            }
        );
    }, []);

    // PR-Details
    function clearPrd() {
        setDbCr("DB");
        setAcName("");
        setAcId(null);
        setCr("");
        setDb("");
        setNarration("");
    }

    function clearPrm() {
        setJvmType("");
        setJvmTypeNo(jvmBackupTypeNo);
        setJvmDate(formattedDate);
        setJvmNarration("");
        setJvdCrTotal(0);
        setJvdDbTotal(0);
        setJvdArray([]);
    }

    // PR-Details : Validate

    function validate() {
        if (dbCr === "") {
            toast.error("Please Select valid DB/CR Option");

            let field = document.querySelector("[data-label='DB/CR']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        if (acName === "") {
            toast.error("Please Select valid A/C Name");

            let field = document.querySelector("[data-label='A/C Name']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        if (cr === "" && dbCr === "CR") {
            toast.error("Please Enter valid CR Amount");

            let field = document.querySelector("[data-label='CR']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        if (db === "" && dbCr === "DB") {
            toast.error("Please Enter valid DB Amount");

            let field = document.querySelector("[data-label='DB']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        return true;
    }

    // PR-Details : Add details to array
    function prdAddToTable() {
        if (action == "Edit") {
            toast.error("Adding new record not allowed while editing");
            return;
        }
        if (!validate()) return;

        setJvdCrTotal((old) => old + Number(cr));
        setJvdDbTotal((old) => old + Number(db));

        let detailObject = {
            dbCr,
            acName: acId,
            cr,
            db,
            narration,
        };

        setJvdArray((old) => {
            return [...old, detailObject];
        });
        clearPrd();
    }

    function prdRemoveFromTable(jvdID) {
        // Make a copy of the jvdArray state
        const newArray = [...jvdArray];
    
        // Find the index of the item to delete
        const indexToDelete = newArray.findIndex((item) => item.jvdId === jvdID);
    
        if (indexToDelete === -1) {
            console.log("Record not found for deletion");
            return;
        }
    
        // Get the deleted record
        const deletedRecord = newArray[indexToDelete];
    
        // Update totals based on the deleted record's dbCr value
        if (deletedRecord.dbCr === "CR") {
            setJvdCrTotal((oldTotal) => oldTotal - Number(deletedRecord.cr));
        } else if (deletedRecord.dbCr === "DB") {
            setJvdDbTotal((oldTotal) => oldTotal - Number(deletedRecord.db));
        }
    
        // Remove the deleted record from newArray
        newArray.splice(indexToDelete, 1);
    
        // Update the state with the updated array
        setJvdArray(newArray);
    
        // Update the deletedItem state with the deleted record
        setDeletedItem((prevDeletedItems) => [...prevDeletedItems, deletedRecord]);
    
        console.log("Deleted Record:", deletedRecord);
    
        // Now deletedItem state should contain the deleted record
        console.log("Deleted Items:", deletedItem);
    }
    
    

    // Add Button -> Opens Dialog Box
    function handlerAdd() {
        setAction("Add");
        setJvmDate(formattedDate);
        setDialogBox(true);
        setDialogBoxTitle("Add Voucher");
        clearPrm();
        clearPrd();
        setJvdArray([]);
        setJvmId(maxId + 1);
    }



    // Edit -> Opens Dialog Box
    function handlerEdit(param) {
        setAction("Edit");
        setDialogBox(true);
        setDialogBoxTitle("Edit Voucher");

        clearPrd();
        clearPrm();

        console.log(param.row);

        setJvmId(() => param.row.JVM_ID || "0");
        setJvmType(() => param.row.JVM_TYPE || "");
        setJvmDate(() => param.row.JVM_DATE || "");
        setJvmNarration(() => param.row.JVM_NARRATION || "");
        setJvdCrTotal(() => param.row.JVM_CR_TOTAL || "");
        setJvdDbTotal(() => param.row.JVM_DB_TOTAL || "");



        setJvdArray(() => {
            let filteredValue = GC?.journalVoucherDetailsData?.map((element) => {
                if (element.JVM_ID === param.row.JVM_ID) {
                    var tacname;
                    GC?.ledgerMasterData?.map((e, index) => {
                        if (e.LM_ID === element.JVD_AC_NAME) {
                            tacname = e.LM_NAME;
                        }
                    })
                    var tarray = {
                        jvdId: element.JVD_ID,
                        dbCr: element.JVD_CR_DB,
                        acId: element.JVD_AC_NAME,
                        acName: tacname,
                        cr: element.JVD_CR_AMT,
                        db: element.JVD_DB_AMT,
                        narration: element.JVD_NARRATION,
                    };
                    return tarray;
                }
            });

            filteredValue = filteredValue?.filter((element) => element);

            console.log("+===========>")
            console.log(filteredValue)

            return filteredValue;
        });
    }

    function handleDelete(param) {
    
        // Confirm deletion with the user
        const isConfirmed = window.confirm("Are you sure you want to delete this record?");
    
        if (isConfirmed) {
            FetchData("POST", "/api/vouchers/delete-row", {
                JVM_ID: param.row.JVM_ID,
            }).then((res) => {
                console.log(res);
                if (!res) return;
                if (res.isSuccess) {
                    toast.success(res.message || "Row deleted");
                    if (res.data?.journalVoucherMasterData) {
                        GC?.setJournalVoucherMasterData(res.data?.journalVoucherMasterData); // Corrected typo here
                    }
                } else {
                    toast.error(res?.message || "Failed to delete row");
                }
            });
            // Perform the delete operation here
            // You might want to make an API call to delete the record on the server
            // After successful deletion, update your local state or refetch data
    
            // Example:
            // Your API call or logic to delete the record
            // deleteRecord(PAYM_IDToDelete)
            //   .then(() => {
            //     // Update local state or refetch data after successful deletion
            //     fetchPaymentMasterData();
            //   })
            //   .catch((error) => {
            //     console.error("Error deleting record:", error);
            //   });
    
            // from local
            let filteredValue = GC?.journalVoucherMasterData?.filter(
                (element) => element.JVM_ID !== param.row.JVM_ID
            );
            GC?.setJournalVoucherMasterData(filteredValue);
            // Optionally, you can show a success message
            // toast.success("Record deleted successfully");
        }
    }

    function handleSubmit() {
        if (jvdArray.length === 0) {
            toast.error("Please add atleast one record");
            return;
        }

        if (jvdCrTotal !== jvdDbTotal) {
            toast.error("CR and DB total must be equal");
            return;
        }

        let url = "";
        if (action == "Add") {
            url = "/api/vouchers/add-details";
        } else if (action == "Edit") {
            url = "/api/vouchers/edit-details";
        }

        FetchData("POST", url, {
            user_email: localStorage.getItem("email") || null,
            comp_id: parseInt(localStorage.getItem("lmId")) || null,
            jvmId: jvmId || 0,
            // jvmType: jvmType || null,
            jvmType: "Voucher",
            jvmTypeNo: jvmTypeNo || null,
            jvmDate: jvmDate || null,
            jvmNarration: jvmNarration || null,
            jvdCrTotal: jvdCrTotal || null,
            jvdDbTotal: jvdDbTotal || null,
            jvdArray: jvdArray || null,
            year: new Date().getFullYear(),
            deletedItem: deletedItem
            // createdBy:
        }).then((res) => {
            console.log(res);
            if (!res) return;
            if (res.isSuccess) {
                toast.success(res.message || "Data added successfully");
                GC?.setJournalVoucherDetailsData(res?.data?.journalVoucherDetailsData);
                GC?.setJournalVoucherMasterData(res?.data?.journalVoucherMasterData);

                clearPrd();
                clearPrm();

                setMaxId(res?.data?.max_id);

                setJvmId(res?.data?.max_id + 1);

                setAction("Add");
            } else {
                setMaxId(res?.data?.max_id);

                setJvmId(res?.data?.max_id + 1);
                toast.error(res?.message || "Failed to add data");
            }
        });
    }

    const handlekeyAdd = (e) => {
        if (e.key === "Enter") {
            prdAddToTable();
        }
    };

    const handlekeySubmit = (e) => {
        if (e.key === "Enter") {
            const focusedElement = document.activeElement;
            // console.log("Focused element ", focusedElement);
            if (focusedElement.classList.contains('submit')) {
                // Execute the submit handler
                handleSubmit();
            } else if (focusedElement.classList.contains('cancel')) {
                // Click the "Cancel" button
                setDialogBox(false);
            } else if (focusedElement.classList.contains('clearForm')) {
                // Click the "Clear Form" button
                clearPrm();
            } else {
                handleSubmit();
            }
        }
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            <Title title1={"Vouchers"} title2={"Transaction"} />
            <div className="p-3 mt-2 bg-white rounded grow">
                <div className="p-2 mt-3 rounded bg-second">
                    <div className="p-1">
                        <Controls2 onClick1={handlerAdd} apiRef={apiRef} />
                    </div>
                </div>

                <div className="w-[100%] mt-5">
                    <MUIDataGrid
                        columns={[
                            {
                                field: "id",
                                headerName: "Id",
                                width: 100,
                                renderHeader: (param) => {
                                    return <div className="pl-2 font-[500]">Id</div>;
                                },
                                renderCell: (param) => {
                                    return (
                                        <div
                                            className="pl-2 cursor-pointer"
                                            onClick={() => handlerEdit(param)}
                                        >
                                            {param.formattedValue}
                                        </div>
                                    );
                                },
                            },
                            // {
                            //     field: "JVM_TYPE",
                            //     headerName: "Type",
                            //     width: 100,
                            // },
                            {
                                field: "JVM_TYPE_WISE_ID",
                                headerName: "No",
                                width: 100,
                            },
                            {
                                field: "JVM_DATE",
                                headerName: "Date Time",
                                width: 150,
                            },
                            {
                                field: "JVM_CR_TOTAL",
                                headerName: "Total Amount",
                                width: 150,
                            },
                            {
                                field: "CREATED_BY",
                                headerName: "Created By",
                                width: 180,
                            },
                            {
                                field: "CREATED_AT",
                                headerName: "Created At",
                                width: 150,
                            },
                            {
                                field: "UPDATED_BY",
                                headerName: "Updated By",
                                width: 150,
                            },
                            {
                                field: "UPDATED_AT",
                                headerName: "Updated At",
                                width: 150,
                            },
                            {
                                field: "delete", // New column for delete
                                headerName: "Delete",
                                width: 150,
                                renderCell: (param) => (
                                    <MdDelete onClick={() => handleDelete(param)} className="w-5 h-5 cursor-pointer text-red-500"></MdDelete>
                                ),
                            },
                        ]}
                        hiddenColumnModel={["id"]}
                        rows={GC?.journalVoucherMasterData?.map((element, index) => {
                            return {
                                id: element.JVM_ID,
                                ...element,
                            };
                        })}
                    />
                </div>

                <DialogBox
                    state={dialogBox}
                    setState={setDialogBox}
                    title1={dialogBoxTitle}
                    title2={"Voucher"}
                >
                    {/* Input Fields */}
                    <div className="max-h-[70vh] mt-3 overflow-auto hide-scrollbar">
                        {/* Fields */}
                        <div className="grid grid-cols-1 p-5 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-h-[70vh] overflow-y-auto hide-scrollbar">
                            <div className="hidden">
                                <TextFieldTopLabeled
                                    label="Id"
                                    placeholder="Auto"
                                    value={jvmId}
                                    disabled={true}
                                ></TextFieldTopLabeled>
                            </div>
                            <TextFieldTopLabeled
                                label="Type"
                                placeholder="Voucher"
                                disabled={true}
                                value={"Voucher"}
                                list={"receipt-payment-type"}
                                onChange={(e) => setJvmType(e.target.value)}
                            >
                                <datalist
                                    contentEditable={false}
                                    defaultValue={"Voucher"}
                                    id="receipt-payment-type"
                                    className="bg-white"
                                >
                                    {/* {GC?.typeMasterData?.map((element) => {
                                        if (element.TNM_NAME === "Payment-Receipt-Type") {
                                            return <option value={element.TM_NAME}></option>;
                                        }
                                    })} */}
                                    return <option selected value="Voucher"></option>;
                                </datalist>
                            </TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                label="Type Wise No"
                                type="number"
                                disabled={true}
                                placeholder="Auto"
                                value={jvmTypeNo}
                            ></TextFieldTopLabeled>
                            <DateTopLabeled
                                label="Date"
                                value={jvmDate}
                                onChange={(e) => setJvmDate(e.target.value)}
                            ></DateTopLabeled>
                        </div>

                        {/* Fields */}
                        <div
                            className="pb-1 px-5 mt-1 mb-5 overflow-x-auto max-w-[100%]"
                            onKeyDown={handlekeyAdd}
                        >
                            <div className="flex flex-wrap gap-2 p-2 border rounded">
                                <div className="w-[100px]">
                                    <label className="text-xs">
                                        <div className="">
                                            DB/CR <span className="text-red-600">*</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded"
                                            value={dbCr}
                                            label="DB/CR"
                                            onChange={(e) => setDbCr(e.target.value)}
                                            list="dbCrList"
                                        />
                                        <datalist id="dbCrList">
                                            <option value="DB"></option>
                                            <option value="CR"></option>
                                        </datalist>
                                    </label>
                                </div>
                                <div className="grow w-[120px]">
                                    <label className="text-xs">
                                        <div className="">
                                            A/C Name<span className="ml-1 text-red-600">*</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded"
                                            value={acName}
                                            label="A/C Name"
                                            onChange={(e) => {
                                                let element = document.querySelector(
                                                    `#l-comapany-name [value="${e.target.value}"]`
                                                );
                                                let lmid = element?.getAttribute("data-lmid");
                                                setAcName(e.target.value);
                                                setAcId(lmid);
                                            }}
                                            list="l-comapany-name"
                                        />
                                        <datalist id="l-comapany-name" className="bg-white">
                                            {GC?.ledgerMasterData?.map((element, index) => {
                                                if (element.LM_NAME) {
                                                    return (
                                                        <option
                                                            key={index}
                                                            className="text-black"
                                                            value={element.LM_ID + "- " + element.LM_NAME}
                                                            data-lmid={element.LM_ID}
                                                        ></option>
                                                    );
                                                }
                                            })}
                                        </datalist>
                                    </label>
                                </div>
                                {dbCr === "CR" && (
                                    <div className="w-[100px]">
                                        <label className="text-xs">
                                            <div className="">
                                                CR<span className="ml-1 text-red-600">*</span>
                                            </div>
                                            <input
                                                type="text"
                                                className="w-full p-2 mt-1 border rounded shrink"
                                                value={cr}
                                                label="CR"
                                                onChange={(e) => setCr(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                )}
                                {dbCr === "DB" && (
                                    <div className="w-[100px]">
                                        <label className="text-xs">
                                            <div className="">
                                                DB<span className="ml-1 text-red-600">*</span>
                                            </div>
                                            <input
                                                type="text"
                                                className="w-full p-2 mt-1 border rounded shrink"
                                                value={db}
                                                label="DB"
                                                onChange={(e) => setDb(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                )}
                                <div className="w-[280px]">
                                    <label className="text-xs">
                                        <div className="">Narration</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded shrink"
                                            value={narration}
                                            onChange={(e) => setNarration(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label className="text-xs">
                                        <div className="h-[16px]"></div>
                                        <CustomButton1
                                            label={"Add"}
                                            className="px-10 text-white bg-first"
                                            onClick={prdAddToTable}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="my-8 mx-5 rounded-md max-w-[100%] overflow-auto text-sm">
                            <table className="border-collapse [&_td]:border-l [&_td]:border-b [&_td]:px-10 [&_td]:py-1 [&_td]:break-keep w-full">
                                <thead>
                                    <tr className="text-white rounded-t bg-first [&_td]:py-2">
                                        <td>No</td>
                                        <td>DB/CR</td>
                                        <td>A/C Name</td>
                                        <td>CR</td>
                                        <td>DB</td>
                                        <td>Delete</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jvdArray.map((element, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{element.dbCr}</td>
                                                <td>{element.acName}</td>
                                                <td>{element.cr}</td>
                                                <td>{element.db}</td>
                                                <td>
                                                    <MdDelete
                                                        className="text-red-500 w-5 h-5 cursor-pointer"
                                                        onClick={() => {
                                                            prdRemoveFromTable(element.jvdId);
                                                        }
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* 5. Fields */}
                        <div
                            className="grid grid-cols-1 px-5 pb-5 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 max-h-[70vh] overflow-y-auto hide-scrollbar"
                            onKeyDown={handlekeySubmit}
                        >
                            <div className="col-span-2[80%]">
                                <TextFieldTopLabeled
                                    label="Narration"
                                    placeholder="Enter"
                                    value={jvmNarration}
                                    onChange={(e) => setJvmNarration(e.target.value)}
                                ></TextFieldTopLabeled>
                            </div>
                            <TextFieldTopLabeled
                                label="Cr"
                                type="number"
                                disabled={true}
                                placeholder="Auto"
                                value={jvdCrTotal}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                label="Db"
                                type="number"
                                disabled={true}
                                placeholder="Auto"
                                value={jvdDbTotal}
                            ></TextFieldTopLabeled>
                        </div>
                    </div>

                    <div className="flex justify-center gap-5 mt-5" onKeyDown={handlekeySubmit}>
                        <div>
                            <CustomButton1
                                label={"Submit"}
                                className="submit text-white bg-first"
                                onClick={handleSubmit}
                            />
                        </div>
                        <div>
                            <CustomButton1
                                label={"cancel"}
                                variant="outlined"
                                className="cancel text-first"
                                onClick={() => setDialogBox(false)}
                            />
                        </div>
                        <div>
                            <CustomButton1
                                label={"Clear Form"}
                                variant="outlined"
                                className="clearForm text-gray-400 border-gray-400"
                                onClick={clearPrm}
                            />
                        </div>
                    </div>
                </DialogBox>
            </div>
        </div>
    );
}

export default Vouchers;

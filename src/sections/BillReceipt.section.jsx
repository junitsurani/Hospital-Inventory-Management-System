import * as React from "react";
import toast from "react-hot-toast";
import { useContext, useState, useEffect } from "react";
import MUIDataGrid from "../components/DataGridTables/MUIDataGrid";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FetchData } from "../functions/FetchData.function";
import { GlobalContext } from "../global-context/GlobalContextComponent";
import CheckBox from "../components/DialogBoxComponents/CheckBox";

import CustomButton1 from "../components/CustomButton1.component";
import Title from "../components/SectionComponents/Title.component";
import Controls2 from "../components/SectionComponents/Controls2.component";
import DialogBox from "../components/DialogBoxComponents/DialogBox.compoent";
import DateTopLabeled from "../components/DialogBoxComponents/DateTopLabeled";
import TextFieldTopLabeled from "../components/DialogBoxComponents/TextFieldTopLabeled";
import { formattedDate } from "../utils/formateddate";

function BillReceipt() {
    //
    // Global Context
    //
    let GC = useContext(GlobalContext);

    let date = new Date();
    let dateFiledFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date
        .getUTCDate()
        .toLocaleString("US", {
            minimumIntegerDigits: 2,
        })}`;

    //
    // DilogBox states
    //
    let [action, setAction] = useState("Add");
    let [DialogBoxTitle, setDialogBoxTitle] = useState("");
    let [purchaseDialogBox, setPurchaseDialogBox] = useState(false);

    //
    // Form Data states
    // Purchase Master
    //
    let [pmId, setPmId] = useState(
        GC?.purchaseMasterData[GC?.purchaseMasterData?.length - 1]?.PM_ID + 1 || 1
    );
    
    let [jvmId, setJvmId] = useState(
        GC?.journalVoucherMasterData[GC?.journalVoucherMasterData?.length - 1]?.JVM_ID + 1 || 1
    );
    let [pmType, setPmType] = useState("");
    let [pmNo, setPmNo] = useState("");
    let [prmTypeId, setPrmTypeId] = useState("");
    
    let [pmInwardNo, setPmInwardNo] = useState("");
    let [pmInwardDate, setPmInwardDate] = useState("");
    let [pmReference, setPmReference] = useState("");
    let [pmPurchaseDate, setPmPurchaseDate] = useState(formattedDate);
    let [pmGstType, setPmGstType] = useState("");
    let [pmCrLimit, setPmCrLimit] = useState("");
    let [pmAcName, setPmAcName] = useState("");
    let [pmLedger, setPmLedger] = useState("");
    let [pmLedgerId, setPmLedgerId] = useState(null);
    let [pmAccId, setPmAccId] = useState(null);
    let [pmPo, setPmPo] = useState("");
    let [pmGrossAmt, setPmGrossAmt] = useState("");
    let [pmAmt, setPmAmt] = useState("");
    let [pmTotalQty, setPmTotalQty] = useState("");
    let [pmPayedAmt, setPmPayedAmt] = useState("");
    let [pmnarration, setPmnarration] = useState("");
    let [lmNarration, setLmNarration] = useState("");

    let [pmYear, setPmYear] = useState("");
    let [pmCompId, setPmCompId] = useState("");

    const [cursorPosition, setCursorPosition] = useState(0);

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
      };

    let [maxId, setMaxId] = useState(1);

    //
    // FormData states
    // Purchase Details
    //
    let [pdDbCr, setPdDbCr] = useState("CR");
    let [pdId, setPdId] = useState("");
    let [pdParticular, setPdParticular] = useState("");
    let [pdRate, setpdRate] = useState("");
    let [pdBatchNo, setPdBatchNo] = useState("");
    let [pdDoe, setPdDoe] = useState("");
    let [pdMRP, setPdMRP] = useState("");
    let [jvmTypeNo, setJvmTypeNo] = useState("");
    let [jvmBackupTypeNo, setBackupJvmTypeNo] = useState("");
    let [pdPurRate, setPdPurRate] = useState("");
    let [pdRateQty, setpdRateQty] = useState("");
    let [pdQty, setPdQty] = useState("");
    let [pdFree, setPdFree] = useState("");
    let [pdTotal, setPdTotal] = useState("");
    let [pdDiscPer, setPdDiscPer] = useState("");
    let [pdDiscAmt, setPdDiscAmt] = useState("");
    let [pdTotalAfterDisc, setPdTotalAfterDisc] = useState("");
    let [pdGrandTotal, setPdGrandTotal] = useState("");
    let [sgst, setSgst] = useState("");
    let [cgst, setCgst] = useState("");
    let [igst, setIgst] = useState("");
    const [dateTime, setDateTime] = useState("");

    let [pdExcludedTotal, setPdExcludedTotal] = useState(0);

    let [backupPNo, setbackupPNo] = useState(0);

    let [allLedgerName, setAllLedgerName] = useState([]);
    //
    // States for Purchase Details Table
    // Store purchase details, into array of objects
    // Toal, Grand Total, Qty
    //
    let [purchaseDetailsArray, setPurchaseDetailsArray] = useState([]);
    const [cumulativeTotal, setCumulativeTotal] = useState(0);
    let [purchaseDetailsArrayTotal, setPurchaseDetailsArrayTotal] = useState(0);
    let [purchaseDetailsArrayGrandTotal, setPurchaseDetailsArrayGrandTotal] = useState(0);
    let [purchaseDetailsArrayQty, setPurchaseDetailsArrayQty] = useState(0);

    let [deletedItem, setDeletedItem] = useState([]);

    //
    // Datagrid state
    // For PDF And CSV
    //
    let [apiRef, setApiRef] = useState();
    const result = pdRateQty *pdQty ;

    //
    // Fetch Purchase Master and Purchase Detail Data
    // Only Called Once
    //
    useEffect(() => {
        let total = 0;
        purchaseDetailsArray.forEach((element) => {
            total += parseFloat(element.pdGrandTotal) || 0;
        });
        setCumulativeTotal(total);
    }, [purchaseDetailsArray]);


      // Function to update the date and time every second
      const intervalId = setInterval(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
        const day = currentDate.getDate().toString().padStart(2, "0");
        const hours = currentDate.getHours().toString().padStart(2, "0");
        const minutes = currentDate.getMinutes().toString().padStart(2, "0");
        const seconds = currentDate.getSeconds().toString().padStart(2, "0");

  
        // Update the state with the current date and time
        setDateTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
      }, 1000); // Update every second
  
    //
    // Clear Form
    //
    function clearPurchaseMasterForm() {
        setPmType("");
        setPmNo(backupPNo);
        setJvmTypeNo(jvmBackupTypeNo);
        setPmInwardNo("");
        setPmInwardDate("");
        setPmReference("");
        setPmPurchaseDate(formattedDate);
        setPmGstType("");
        setPmCrLimit("");
        setPmAcName("");
        setPmAccId(null);
        setPmLedger("");
        setPmLedgerId(null);
        setPmPo("");
        setPmGrossAmt("");
        setPmAmt("");
        setPmTotalQty("");
        setPmPayedAmt("");
        setPmnarration("");
        setPmYear("");
        setPdExcludedTotal(0);
        setPmCompId("");
        setDeletedItem([]);
    }
    function clearPurchaseDetailsForm() {
        setPdDbCr("CR");
        setPdId("");
        setPdParticular("");
        setpdRate("");
        setPdBatchNo("");
        setPdDoe("");
        setPdMRP("");
        setPdPurRate("");
        setpdRateQty("");
        setPdQty("");
        setPdFree("");
        setPdTotal("");
        setPdDiscPer(0);
        setPdDiscAmt("");
        setPdTotalAfterDisc("");
        setPdGrandTotal("");
        setSgst("");
        setCgst("");
        setIgst("");
    }
    function clearPurchaseDetailsArry() {
        setPurchaseDetailsArray([]);
        setJvmTypeNo(jvmBackupTypeNo);
        setPurchaseDetailsArrayTotal(0);
        setPurchaseDetailsArrayGrandTotal(0);
        setPurchaseDetailsArrayQty(0);
        setDeletedItem([]);
    }

    //
    // Validation
    //
    function validate() {
        if (!pmType) {
            toast.error("Please enter Type");

            let field = document.querySelector("[data-label='Type']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        if (!pmNo) {
            toast.error("Please enter No");

            let field = document.querySelector("[data-label='No']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        // if (!pmInwardNo) {
        //     toast.error("Please enter Inward No");

        //     let field = document.querySelector("[data-label='Inward No']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!pmInwardDate) {
        //     toast.error("Please enter Inward Date");

        //     let field = document.querySelector("[data-label='Inward Date']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!pmReference) {
        //     toast.error("Please enter Reference");

        //     let field = document.querySelector("[data-label='Reference']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!pmPurchaseDate) {
        //     toast.error("Please enter Purchase Date");

        //     let field = document.querySelector("[data-label='Purchase Date']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!pmGstType) {
        //     toast.error("Please enter Gst Type");

        //     let field = document.querySelector("[data-label='GST Type']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!pmAcName) {
        //     toast.error("Please enter Ac Name");

        //     let field = document.querySelector("[data-label='Ac Name']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!pmLedger) {
        //     toast.error("Please enter Ledger");

        //     let field = document.querySelector("[data-label='Ledger']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!pmPo) {
        //     toast.error("Please enter P.O.");

        //     let field = document.querySelector("[data-label='P.O.']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!pmGrossAmt) {
        //     toast.error("Please enter Gross Amt");

        //     let field = document.querySelector("[data-label='Gross AMT']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!pmAmt) {
        //     toast.error("Please enter Amt");

        //     let field = document.querySelector("[data-label='AMT']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!pmTotalQty) {
        //     toast.error("Please enter Total Qty");

        //     let field = document.querySelector("[data-label='Total Qty']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!pmPayedAmt) {
        //     toast.error("Please enter Payed Amt");

        //     let field = document.querySelector("[data-label='Payed Amt']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!pmnarration) {
        //     toast.error("Please enter narration");

        //     let field = document.querySelector("[data-label='narration']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!pmYear) {
        //     toast.error("Please enter Year");

        //     let field = document.querySelector("[data-label='Year']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!pmCompId) {
        //     toast.error("Please enter Company Id");

        //     let field = document.querySelector("[data-label='Company Id']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        if (!purchaseDetailsArray.length) {
            toast.error("Please enter Purchase Details");
            return;
        }
        return true;
    }

    //
    // Add button, in dialog box
    // This is not for sending data to bakend
    // Only addes details to array
    //
    function handlerPurchaseDetailsAddToTable() {

        if (action == "Edit") {
            toast.error("Adding new record not allowed while editing");
            return;
        }


        // if (!pdParticular) {
        //     toast.error("Please enter Particular");
        //     return;
        // }

        // if (!pdRate) {
        //     toast.error("Please enter Pack");
        //     return;
        // }

        // if (!pdMRP) {
        //     toast.error("Please enter MRP");
        //     return;
        // }

        // if (!pdPurRate) {
        //     toast.error("Please enter Pur Rate");
        //     return;
        // }

        if (!pdRateQty) {
            toast.error("Please enter Sales Rate");
            return;
        }

        if (pdQty < 1) {
            toast.error("Please enter valid Qty");
            return;
        }

        // if (!pdTotal) {
        //     toast.error("Please enter Total");
        //     return;
        // }

        setPurchaseDetailsArrayGrandTotal((old) => {
            return old + pdGrandTotal;
        });

        setPurchaseDetailsArrayQty((old) => {
            return old + Number(pdQty);
        });

        let detailObject = {
            pdDbCr,
            pdId,
            pdParticular,
            pdRate,
            pdBatchNo,
            pdDoe,
            pdMRP,
            pdPurRate,
            pdRateQty,
            pdQty,
            pdFree,
            pdTotal,
            pdDiscPer,
            pdDiscAmt,
            pdTotalAfterDisc,
            pdGrandTotal,
            sgst,
            cgst,
            igst,
        };

        setPurchaseDetailsArray((old) => {
            return [...old, detailObject];
        });

        setPdExcludedTotal(pdExcludedTotal + pdTotal);

        clearPurchaseDetailsForm();
    }

    //
    // For Future,
    // Delete Data from array of purchase details
    //

    function handlerPurchaseDetailsRemoveFromTable(removeId) {
        // Find the index of the item to be removed
        const indexToRemove = purchaseDetailsArray.findIndex((item) => item.pdId === removeId);
        console.log("Clicked! pdId:", pdId);

        // Check if the item exists in the array
        if (indexToRemove !== -1) {
            // Update state variables based on the removed item's values
            var excluded = pdExcludedTotal - purchaseDetailsArray[indexToRemove].pdTotal;
            setPdExcludedTotal(pdExcludedTotal - purchaseDetailsArray[indexToRemove].pdTotal);

            setPurchaseDetailsArrayGrandTotal(
                (old) => old - purchaseDetailsArray[indexToRemove].pdGrandTotal
            );

            setPurchaseDetailsArrayQty(
                (old) => old - parseInt(purchaseDetailsArray[indexToRemove].pdQty)
            );

            var t = deletedItem;
            t.push({
                item_id: purchaseDetailsArray[indexToRemove].pdItemId,
                pd_id: purchaseDetailsArray[indexToRemove].pdId,
                item_qty: purchaseDetailsArray[indexToRemove].pdQty,
            });

            setDeletedItem(t);

            // Remove the item from the array
            setPurchaseDetailsArray((old) => {
                toast.success("Item removed from the array");
                const newArray = [...old];
                newArray.splice(indexToRemove, 1);
                return newArray;
            });

           

            
        } else {
            // Handle case where the item to be removed is not found
            toast.error("Item not found in the array");
        }
    }

    //
    // Opens Dialog Box
    // For add data
    //
    function handlerAdd() {
        setPurchaseDialogBox(true);
        setDeletedItem([]);
        setAction("Add");
        setDialogBoxTitle("Add Bill");
        clearPurchaseDetailsArry();
        clearPurchaseMasterForm();
        clearPurchaseDetailsForm();
        GC?.accountGroupData.map((element, index) => {
            if (element.AG_ID == 63) {
                setPmLedger(element.AG_ID + ' - ' + element.AG_NAME);
                setPmLedgerId(element.AG_ID);
            }
        });

        setPmType("Retail");
        let typeArray = GC?.purchaseMasterData?.filter((element) => element.PM_TYPE === "Retail");
        // let pmNo = typeArray?.pop()?.PM_NO + 1 || 1;
        // setPmNo(pmNo);
        setPmId(maxId + 1);
        setPmNo(backupPNo);

        // setPmId(GC?.purchaseMasterData[GC?.purchaseMasterData?.length - 1]?.PM_ID + 1 || 1);
    }

    //
    // Opens Dialog Box
    // For editing data
    //
    function handlerEdit(param) {
        setAction("Edit");
        setPurchaseDialogBox(true);
        setDialogBoxTitle("Edit Purchase");
        setDeletedItem([]);
        clearPurchaseMasterForm();
        clearPurchaseDetailsForm();
        setDeletedItem([]);

        console.log(param.row);

        setPmType(() => param.row.PM_TYPE || "0");
        setPmId(() => param.row.PM_ID || "");
        setPmNo(() => param.row.PM_NO || "");
        setPmInwardNo(() => param.row.PM_INWARD_NO || "");
        setPmInwardDate(() => param.row.PM_INWARD_DATE || "");
        setPmReference(() => param.row.PM_REF || "");
        setPmPurchaseDate(() => param.row.PM_PUR_DATE || "");
        setPmGstType(() => param.row.PM_GST_TYPE || "");
        setPmCrLimit(() => param.row.PM_CR_LIMIT || "");
        setPmAccId(() => param.row.PM_AC_NAME || "");
        setPmLedgerId(() => param.row.PM_LEDGER || "");
        setPmPo(() => param.row.PM_PO || "");
        setPurchaseDetailsArrayQty(param.row.PM_TOTAL_QTY || "");
        setPurchaseDetailsArrayGrandTotal(param.row.PM_AMT || "");

        GC?.accountGroupData.map((element, index) => {
            if (element.AG_ID == param.row.PM_LEDGER) {
                setPmLedger(element.AG_ID + ' - ' + element.AG_NAME);
            }
        });

        {
            GC?.ledgerMasterData?.map((element, index) => {
                if (element.LM_ID === param.row.PM_AC_NAME) {
                    setPmAcName(element.LM_ID+ ' - '+element.LM_NAME);
                }
            })
        }


        var exludedAmt = 0;

        setPurchaseDetailsArray(()=>{
            let filteredValue = GC?.purchaseDetailsData?.map((element) => {
                if (element.PM_ID === param.row.PM_ID) {
                    var item_name = '';
                    var item_cgst = null;
                    var item_sgst = null;
                    var item_igst = null;
                    GC?.itemMasterData?.map((item) => {
                        if (item.IM_ID === element.PD_ITEM_ID) {
                            item_name = item.IM_NAME;
                            item_sgst = item.IM_SGST;
                            item_cgst = item.IM_CGST;
                            item_igst = item.IM_IGST;
                        }
                    });
                    return {
                        pdDbCr: element.DB_CR,
                        pdId: element.PD_ID,
                        pdItemId: element.PD_ITEM_ID,
                        pdParticular: item_name,
                        pdRate: element.PD_PACK,
                        pdBatchNo: element.PD_BATCH,
                        pdDoe: element.PD_DOE,
                        pdMRP: element.PD_MRP,
                        pdPurRate: element.PD_PUR_RATE,
                        pdRateQty: element.PD_SALES_RATE,
                        pdQty: element.PD_QTY,
                        pdFree: element.PD_FREE,
                        pdTotal: element.PD_PUR_RATE * element.PD_QTY,
                        pdDiscPer: element.PD_DISC_PER,
                        pdDiscAmt: element.PD_DISC_AMT,
                        pdTotalAfterDisc: element.PD_TOTAL_AFTER_DISC,
                        pdGrandTotal: element.PD_GRAND_TOTAL,
                        sgst: item_sgst,
                        cgst: item_cgst,
                        igst: item_igst,
                    };
                }
            });

            filteredValue = filteredValue?.filter((element) => element);

            return filteredValue;
        });

        GC?.purchaseDetailsData?.map((item) => {
            if (item.PM_ID === param.row.PM_ID) {
                exludedAmt += (item.PD_PUR_RATE) * (item.PD_QTY);
            }
        });
        setPdExcludedTotal(exludedAmt);
    }

    function handlerDelete(param) {
        // Assuming you have a unique identifier in your data, for example, PM_ID
        const pmIdToDelete = param.row.PM_ID;

        // Confirm deletion with the user
        const isConfirmed = window.confirm("Are you sure you want to delete this record?");

        if (isConfirmed) {
            // Perform the delete operation here
            // You might want to make an API call to delete the record on the server
            // After successful deletion, update your local state or refetch data

            // Example:
            // Your API call or logic to delete the record
            // deleteRecord(pmIdToDelete)
            //   .then(() => {
            //     // Update local state or refetch data after successful deletion
            //     fetchPurchaseMasterData();
            //   })
            //   .catch((error) => {
            //     console.error("Error deleting record:", error);
            //   });

            // For now, let's simulate the update locally
            const updatedPurchaseMasterData = GC?.purchaseMasterData?.filter(
                (element) => element.PM_ID !== pmIdToDelete
            );

            // Update the local state
            GC?.setPurchaseMasterData(updatedPurchaseMasterData);

            // Optionally, you can show a success message
            toast.success("Record deleted successfully");
        }
    }

    //
    // Add/Submit Data to Backend
    //
    async function handlerSubmit() {
        let url = "";
        if (action == "Add") {
            url = "/api/purchase/add-purchase";
        } else if (action == "Edit") {
            url = "/api/purchase/edit-purchase";
        }

        if (!validate()) return;

        FetchData("POST", url, {
            user_email: localStorage.getItem("email") || null,
            pmId: pmId || null,
            pmType: pmType || null,
            pmNo: pmNo || null,
            jvmTypeNo: jvmTypeNo || null,

            pmInwardNo: pmInwardNo || null,
            pmInwardDate: pmInwardDate || null,
            pmReference: pmReference || null,
            pmPurchaseDate: pmPurchaseDate || null,
            pmGstType: pmGstType || null,
            pmCrLimit: pmCrLimit || null,
            pmAcName: pmAccId || null,
            pmLedger: pmLedgerId || null,
            pmPo: pmPo || null,
            pmGrossAmt: pmGrossAmt || null,
            pmAmt: purchaseDetailsArrayGrandTotal || null,
            pmTotalQty: purchaseDetailsArrayQty || null,
            pmPayedAmt: pmPayedAmt || null,
            pmnarration: pmnarration || null,
            pmYear: new Date().getFullYear(),
            pmCompId: localStorage.getItem("lmId"),
            purchaseDetailsArray: purchaseDetailsArray || null,
            deletedItem: deletedItem
        }).then((res) => {
            console.log(res);
            if (!res) return;
            if (res.isSuccess) {
                toast.success(res.message || "Data added successfully");
                GC?.setPurchaseDetailsData(res?.data?.purchaseDetailsData);
                GC?.setPurchaseMasterData(res?.data?.purchaseMasterData);

                setMaxId(res?.data?.max_id);
                setPmId(res?.data?.max_id + 1);
                setPmNo(res?.data?.max_pm_no + 1);
                setbackupPNo(res?.data?.max_pm_no + 1);

                GC?.accountGroupData.map((element, index) => {
                    if (element.AG_ID == 63) {
                        setPmLedger(element.AG_ID + ' - ' + element.AG_NAME);
                        setPmLedgerId(element.AG_ID);
                    }
                });
        
                setPmType("Retail");

                clearPurchaseDetailsForm();
                clearPurchaseMasterForm();
                clearPurchaseDetailsArry();
            } else {
                setMaxId(res?.data?.max_id);
                setPmId(res?.data?.max_id + 1);
                setPmNo(res?.data?.max_pm_no + 1);
                setbackupPNo(res?.data?.max_pm_no + 1);
                toast.error(res?.message || "Failed to add data");
            }
        });
    }

    const handlekeySubmit = (e) => {
        if (e.key === "Enter") {
            const focusedElement = document.activeElement;
            // console.log("Focused element ", focusedElement);
            if (focusedElement.classList.contains('submit')) {
                // Execute the submit handler
                handlerSubmit();
            } else if (focusedElement.classList.contains('cancel')) {
                // Click the "Cancel" button
                setPurchaseDialogBox(false);
            } else if (focusedElement.classList.contains('clearForm')) {
                // Click the "Clear Form" button
                clearPurchaseDetailsForm();
                clearPurchaseMasterForm();
                clearPurchaseDetailsArry();
            } else {
                handlerSubmit();
            }
        }
    };

    const handlekeyAdd = (e) => {
        if (e.key === "Enter") {
            handlerPurchaseDetailsAddToTable();
        }
    };

    //
    // Actual Component
    //
    return (
        <div className="flex flex-col h-full overflow-y-auto">
            <Title title1={"Bill Receipt"} title2={"Transaction"} />
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
                                width: 50,
                                renderHeader: (param) => {
                                    return <div className="pl-2 font-[500]">Id</div>;
                                },
                                renderCell: (param) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                handlerEdit(param);
                                            }}
                                            className="pl-2 cursor-pointer"
                                        >
                                            {param.formattedValue}
                                        </div>
                                    );
                                },
                            },
                            {
                                field: "PM_TYPE",
                                headerName: "Type",
                                width: 100,
                            },
                            {
                                field: "PM_NO",
                                headerName: "Bill No",
                                width: 100,
                            },
                            {
                                field: "BillDate",
                                headerName: "Bill Date",
                                width: 100,
                            },
                            {
                                field: "PM_AC_NAME",
                                headerName: "Name",
                                width: 100,
                            },
                            {
                                field: "PM_AMT",
                                headerName: "Amt",
                                width: 100,
                            },
                            {
                                field: "PM_PAID_AMT",
                                headerName: "Paid Amt",
                                width: 100,
                            },
                            {
                                field: "CREATED_BY",
                                headerName: "Created By",
                                width: 150,
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
                                field: "JVM_TYPE_WISE_ID",
                                headerName: "No",
                                width: 100,
                            },
                            {
                                field: "delete", // New column for delete
                                headerName: "Delete",
                                width: 100,
                                renderCell: (param) => (
                                    <MdDelete
                                        onClick={() => handlerDelete(param)}
                                        className="w-5 h-5 cursor-pointer text-red-500"
                                    ></MdDelete>
                                ),
                            },
                        ]}
                        rows={GC?.purchaseMasterData?.map((element, index) => {
                            return {
                                id: element.PM_ID,
                                BillDate: element.CREATED_AT,
                                ...element,
                            };
                        })}
                    />
                </div>

                <DialogBox
                    state={purchaseDialogBox}
                    setState={setPurchaseDialogBox}
                    title1={DialogBoxTitle}
                    title2={"Bill Receipt"}
                >
                    {/* Input Fields */}
                    <div
                        onKeyDown={handlekeySubmit}
                        className="max-h-[70vh] mt-3 overflow-auto hide-scrollbar"
                    >
                        {/* 1. Purchase Master Fields */}
                        <div className="grid grid-cols-2 px-5 py-1 gap-x-5 gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 max-h-[70vh] overflow-y-auto hide-scrollbar">
                            {/* <div className="hidden">
                                <TextFieldTopLabeled
                                    label="Id"
                                    placeholder="Auto Generated"
                                    className="w-1/2"
                                    minWidth={100}
                                    value={pmId}
                                    disabled={true}
                                ></TextFieldTopLabeled>
                            </div> */}
                            <TextFieldTopLabeled
                                label="Bill No"
                                placeholder="Enter"
                                className="w-1/2"
                                minWidth={100}
                                value={pmType}
                                onChange={(e) => {
                                    setPmType(e.target.value);
                                    let typeArray = GC?.purchaseMasterData?.filter(
                                        (element) => element.PM_TYPE === e.target.value
                                    );
                                    let pmNo = typeArray?.pop()?.PM_NO + 1 || 1;
                                    setPmNo(pmNo);
                                }}
                                list={"purchase-type"}>

                                <datalist id="purchase-type" className="bg-white">
                                    {GC?.typeMasterData?.map((element, index) => {
                                        if (element.TNM_NAME === "Purchase Type") {
                                            return (
                                                <option
                                                    key={index}
                                                    className="text-black"
                                                    value={element.TM_NAME}
                                                ></option>
                                            );
                                        }
                                    })}
                                </datalist>
                            </TextFieldTopLabeled>
                            <input
                            type="text"
                            value={dateTime}
                            readOnly>
                            </input>
                            {/* <TextFieldTopLabeled
                                label="Bill Date T"
                                type="number"
                                disabled={true}
                                placeholder="Auto"
                                value={pmNo}
                                onChange={(e) => setPmNo(e.target.value)}
                            ></TextFieldTopLabeled> */}
                            <CheckBox
                                label="Emergency"
                                state={isChecked}
                                className="w-[5px]"
                                minWidth='5px'
                                setState={handleCheckboxChange}
                            />
                            <TextFieldTopLabeled
                                    label="Name"
                                    type="text"
                                    className="w-[100]"
                                    minWidth={100}
                                    placeholder="Enter"
                                    value={pmCrLimit}
                                    onChange={(e) => setPmCrLimit(e.target.value)}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                label="Age/Sex"
                                lassName="w-[100]"
                                minWidth={100}
                                type="text"
                                placeholder="Enter"
                                value={pmInwardNo}
                                onChange={(e) => setPmInwardNo(e.target.value)}
                            ></TextFieldTopLabeled>
                        </div>
                        <div className="grid grid-cols-2 px-5 py-1 gap-x-5 gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6 max-h-[70vh] overflow-y-auto hide-scrollbar">
                        
                            {/* <DateTopLabeled
                                label="Inward Date"
                                placeholder="Enter"
                                value={pmInwardDate}
                                onChange={(e) => setPmInwardDate(e.target.value)}
                            ></DateTopLabeled> */}
                            {/* <TextFieldTopLabeled
                                label="Reference"
                                placeholder="Enter"
                                value={pmReference}
                                required={true}
                                onChange={(e) => setPmReference(e.target.value)}
                            ></TextFieldTopLabeled> */}
                            
                            {/* <DateTopLabeled
                                label="Name"
                                placeholder="Enter"
                                // value={pmPurchaseDate}
                                // onChange={(e) => setPmPurchaseDate(e.target.value)}
                            ></DateTopLabeled> */}

                            <TextFieldTopLabeled
                                label="Case NO"
                                placeholder="Enter"
                                lassName="w-[100]"
                                    minWidth={100}
                                value={pmAcName}
                                required={true}
                            >
                            </TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                label="IPD NO"
                                placeholder="Enter"
                                lassName="w-[100]"
                                    minWidth={100}
                                required={true}
                            >
                            </TextFieldTopLabeled>

                            <TextFieldTopLabeled
                                label="Patient ID"
                                type="number"
                                placeholder="Enter"
                                lassName="w-[100]"
                                    minWidth={100}
                                value={pmCrLimit}
                                onChange={(e) => setPmCrLimit(e.target.value)}
                            ></TextFieldTopLabeled>

                            <TextFieldTopLabeled
                                label="Address"
                                placeholder="Enter"
                                lassName="w-[100]"
                                    minWidth={100}
                                value={pmPo}
                                onChange={(e) => setPmPo(e.target.value)}
                            ></TextFieldTopLabeled>
                             
                            <TextFieldTopLabeled
                                label="Cons. Dr."
                                type="text"
                                lassName="w-[100]"
                                    minWidth={100}
                                placeholder="Enter"
                                value={pmGrossAmt}
                                onChange={(e) => setPmGrossAmt(e.target.value)}
                            ></TextFieldTopLabeled> 
                            <TextFieldTopLabeled
                                label="Ref. Dr."
                                type="text"
                                lassName="w-[100]"
                                    minWidth={100}
                                placeholder="Enter"
                                value={pmAmt}
                                onChange={(e) => setPmAmt(e.target.value)}
                            ></TextFieldTopLabeled>
                            {/* <TextFieldTopLabeled
                                label="Total Qty"
                                type="number"
                                placeholder="Enter"
                                value={pmTotalQty}
                                onChange={(e) => setPmTotalQty(e.target.value)}
                            ></TextFieldTopLabeled> */}
                            {/* <TextFieldTopLabeled
                                label="Payed Amt"
                                type="number"
                                placeholder="Enter"
                                value={pmPayedAmt}
                                onChange={(e) => setPmPayedAmt(e.target.value)}
                            ></TextFieldTopLabeled> */}
                            {/* <TextFieldTopLabeled
                                label="narration"
                                placeholder="Enter"
                                value={pmnarration}
                                onChange={(e) => setPmnarration(e.target.value)}
                            ></TextFieldTopLabeled> */}
                            {/* <TextFieldTopLabeled
                                label="Year"
                                type="number"
                                placeholder="Enter"
                                value={pmYear}
                                onChange={(e) => setPmYear(e.target.value)}
                            ></TextFieldTopLabeled> */}
                            {/* <TextFieldTopLabeled
                                label="Company Id"
                                type="number"
                                placeholder="Enter"
                                value={pmCompId}
                                onChange={(e) => setPmCompId(e.target.value)}
                            ></TextFieldTopLabeled> */}
                        </div>

                        {/* 2. Purchase Details Fields */}
                        <div className="pb-1 px-5 mt-1 mb-5 overflow-x-auto max-w-[100%]">
                            <div className="flex flex-nowrap gap-2 p-2 border rounded">
                                {/* <div className="w-[50px]">
                                    <label className="text-xs">
                                        <div className="">DB/CR</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded"
                                            value={pdDbCr}
                                            onChange={(e) => setPdDbCr(e.target.value)}
                                            list="dbCrList"
                                        />
                                        <datalist id="dbCrList">
                                            <option value="DB"></option>
                                            <option value="CR"></option>
                                        </datalist>
                                    </label>
                                </div> */}
                                {/* <div className="w-[50px]">
                                    <label className="text-xs">
                                        <div className="">Item Id</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded"
                                            value={pdId}
                                            disabled={true}
                                        />
                                    </label>
                                </div> */}
                                <div className="w-[30]">
                                    <label className="text-xs">
                                        <div className="">
                                            Particular <span className="text-red-500 ml-1">*</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded"
                                            value={pdParticular}
                                            onChange={(e) => {
                                                setPdParticular(e.target.value);
                                                let element = document.querySelector(
                                                    `#itemIdList [value="${e.target.value}"]`
                                                );

                                                setPdId(
                                                    element?.getAttribute("data-item-id") || ""
                                                );
                                                setpdRate(element?.getAttribute("data-pack") || "");
                                                setPdMRP(element?.getAttribute("data-mrp") || "");
                                                setPdPurRate(
                                                    element?.getAttribute("data-purchase-rate") ||
                                                    ""
                                                );
                                                setpdRateQty(
                                                    element?.getAttribute("data-sale-rate") || ""
                                                );
                                                setSgst(element?.getAttribute("data-sgst") || "");
                                                setCgst(element?.getAttribute("data-cgst") || "");
                                                setIgst(element?.getAttribute("data-igst") || "");
                                            }}
                                            // list="itemIdList"
                                        />
                                        {/* <datalist id="itemIdList">
                                            {GC?.itemMasterData?.map((element, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={element.IM_NAME}
                                                        data-item-id={element.IM_ID}
                                                        data-perticular={element.IM_NAME}
                                                        data-pack={element.IM_PACK}
                                                        data-mrp={element.IM_MRP}
                                                        data-purchase-rate={element.IM_PUR_RATE}
                                                        data-sale-rate={element.IM_SALES_RATE}
                                                        data-sgst={element.IM_SGST}
                                                        data-cgst={element.IM_CGST}
                                                        data-igst={element.IM_IGST}
                                                    ></option>
                                                );
                                            })}
                                        </datalist> */}
                                    </label>
                                </div>
                                <div className="w-[30]">
                                    <label className="text-xs">
                                        <div className="">
                                            Doctor <span className="text-red-500 ml-1">*</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded"
                                            value={pdParticular}
                                            onChange={(e) => {
                                                setPdParticular(e.target.value);
                                                let element = document.querySelector(
                                                    `#itemIdList [value="${e.target.value}"]`
                                                );

                                                setPdId(
                                                    element?.getAttribute("data-item-id") || ""
                                                );
                                                setpdRate(element?.getAttribute("data-pack") || "");
                                                setPdMRP(element?.getAttribute("data-mrp") || "");
                                                setPdPurRate(
                                                    element?.getAttribute("data-purchase-rate") ||
                                                    ""
                                                );
                                                setpdRateQty(
                                                    element?.getAttribute("data-sale-rate") || ""
                                                );
                                                setSgst(element?.getAttribute("data-sgst") || "");
                                                setCgst(element?.getAttribute("data-cgst") || "");
                                                setIgst(element?.getAttribute("data-igst") || "");
                                            }}
                                            // list="itemIdList"
                                        />
                                        {/* <datalist id="itemIdList">
                                            {GC?.itemMasterData?.map((element, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={element.IM_NAME}
                                                        data-item-id={element.IM_ID}
                                                        data-perticular={element.IM_NAME}
                                                        data-pack={element.IM_PACK}
                                                        data-mrp={element.IM_MRP}
                                                        data-purchase-rate={element.IM_PUR_RATE}
                                                        data-sale-rate={element.IM_SALES_RATE}
                                                        data-sgst={element.IM_SGST}
                                                        data-cgst={element.IM_CGST}
                                                        data-igst={element.IM_IGST}
                                                    ></option>
                                                );
                                            })}
                                        </datalist> */}
                                    </label>
                                </div>
                                <div className="w-[50px]">
                                    <label className="text-xs">
                                        <div className="">Rate</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded"
                                            disabled={false}
                                            value={pdRate}
                                            onChange={(e) => {
                                                let rate = e.target.value;
                                                let total = Number(rate * pdQty);
                                                let discountAmount = (total * pdDiscPer) / 100;

                                                
                                                setpdRate(e.target.value)
                                                setpdRateQty(rate * pdQty);
                                                setPdDiscAmt(discountAmount);
                                                setPdTotalAfterDisc(total - discountAmount);
                                                setPdGrandTotal(total - discountAmount);
                                            }}
                                        />
                                    </label>
                                </div>
                                <div className="w-[50px]">
                                    <label className="text-xs">
                                        <div className="">
                                            Qty <span className="text-red-500">*</span>
                                        </div>
                                        <input
                                            type="number"
                                            className="w-full p-2 mt-1 border rounded"
                                            value={pdQty}
                                            onKeyDown={handlekeyAdd}
                                            onChange={(e) => {
                                                let qty = e.target.value;
                                                let total = Number(pdRate * qty);
                                                let discountAmount = (total * pdDiscPer) / 100;

                                                
                                                setpdRateQty(qty * pdRate);
                                                setPdQty(qty);
                                                setPdDiscAmt(discountAmount);
                                                setPdTotalAfterDisc(total - discountAmount);
                                                setPdGrandTotal(total - discountAmount);
                                            }}
                                        />
                                    </label>
                                </div>
                                {/* <div className="w-[60px]">
                                    <label className="text-xs">
                                        <div className="">batch no</div>
                                        <input
                                            type="number"
                                            className="w-full p-2 mt-1 border rounded shrink"
                                            value={pdBatchNo}
                                            onChange={(e) => setPdBatchNo(e.target.value)}
                                        />
                                    </label>
                                </div> */}
                                {/* <div className="w-[120px]">
                                    <label className="text-xs">
                                        <div className="">Expiry</div>

                                        <input
                                            type="month"
                                            className="w-full p-[7px] mt-1 border rounded"
                                            value={pdDoe}
                                            onChange={(e) => setPdDoe(e.target.value)}
                                        />
                                    </label>
                                </div>*/}
                             
                                <div className="w-[80px]">
                                    <label className="text-xs">
                                        <div className="">Rate*Qty</div>
                                        <input
                                            type="number"
                                            className="w-full p-2 mt-1 border rounded "
                                            disabled={true}
                                            value={pdRateQty}
                                            onChange={(e) => {
                                                setpdRateQty(e.target.value);

                                                // Remove calculations related to sales rate

                                                // Recalculate based on purchase rate * quantity
                                                // let total = Number(pdPurRate * pdQty);
                                                // let discountAmount = (total * pdDiscPer) / 100;

                                                // let totalGst =
                                                //     Number(sgst) + Number(cgst) + Number(igst);
                                                // let totalAmtAfterGst =
                                                //     total + (total * totalGst) / 100;

                                                // setPdTotal(pdPurRate * pdQty);
                                                // setPdDiscAmt(discountAmount);
                                                // setPdTotalAfterDisc(total - discountAmount);
                                                // setPdGrandTotal(total - discountAmount);
                                            }}
                                        />
                                    </label>
                                </div>

                                {/* <div className="w-[80px]">
                                    <label className="text-xs">
                                        <div className="">Pur. Rate</div>
                                        <input
                                            type="number"
                                            className="w-full p-2 mt-1 border rounded "
                                            disabled={false}
                                            value={pdPurRate}
                                            onChange={(e) => {
                                                setPdPurRate(e.target.value);

                                                // Recalculate based on purchase rate * quantity
                                                let total = Number(e.target.value * pdQty);
                                                let discountAmount = (total * pdDiscPer) / 100;

                                                let totalGst =
                                                    Number(sgst) + Number(cgst) + Number(igst);
                                                let totalAmtAfterGst =
                                                    total + (total * totalGst) / 100;

                                                setPdTotal(e.target.value * pdQty);
                                                setPdDiscAmt(discountAmount);
                                                setPdTotalAfterDisc(total - discountAmount);
                                                setPdGrandTotal(totalAmtAfterGst - discountAmount);
                                            }}
                                        />
                                    </label>
                                </div>
                               

                                <div className="w-[50px]">
                                    <label className="text-xs">
                                        <div className="">Free</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded "
                                            value={pdFree}
                                            onChange={(e) => setPdFree(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="w-[80px]">
                                    <label className="text-xs">
                                        <div className="">Total</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded"
                                            value={pdTotal}
                                            disabled={true}
                                        />
                                    </label>
                                </div> */}
                                <div className="w-[80px]">
                                    <label className="text-xs">
                                        <div className="">Disc %</div>
                                        <input
                                            type="number"
                                            className="w-full p-2 mt-1 border rounded "
                                            value={pdDiscPer}
                                            onChange={(e) => {
                                                let discountPercentage = e.target.value;
                                                let total = Number(pdRate * pdQty);
                                                let discountAmount = (total * discountPercentage) / 100;

                                                setPdDiscPer(discountPercentage);
                                                setPdDiscAmt(discountAmount);
                                                setPdTotalAfterDisc(total - discountAmount);
                                                setPdGrandTotal(total - discountAmount);
                                            }}
                                        />
                                    </label>
                                </div>
                                <div className="w-[80px]">
                                    <label className="text-xs">
                                        <div className="">Disc. Amt</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded "
                                            value={pdDiscAmt}
                                            disabled={true}
                                        />
                                    </label>
                                </div>
                                <div className="w-[80px]">
                                    <label className="text-xs">
                                        <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                                            Total after Disc
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded "
                                            value={pdTotalAfterDisc}
                                            disabled={true}
                                        />
                                    </label>
                                </div>
                                <div className="w-[80px]">
                                    <label className="text-xs">
                                        <div className="">G total</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded "
                                            value={pdGrandTotal}
                                            disabled={true}
                                        />
                                    </label>
                                </div>
                        <TextFieldTopLabeled
                            label="Narration"
                            type="text"
                            className="w-[5px]"
                            minWidth='5px'
                            placeholder="Enter"
                            value={lmNarration}
                            onChange={(e) => setLmNarration(e.target.value)}
                        ></TextFieldTopLabeled>
                         {/* <TextFieldTopLabeled
                            label="Type Wise No"
                            type="number"
                            disabled={true}
                            placeholder="Auto"
                            value={jvmTypeNo}
                        ></TextFieldTopLabeled> */}

                                <div onKeyDown={handlekeyAdd}>
                                    <div className="mt-4 border"></div>
                                    <CustomButton1
                                        label={"Add"}
                                        className="text-white bg-first"
                                        onClick={handlerPurchaseDetailsAddToTable}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* 4. Table */}
                        <div className="mb-2 -mt-1 mx-5 rounded-md max-w-[100%] overflow-auto text-sm">
                            <table
                                className="border-collapse [&_td]:border-l [&_td]:border-b [&_td]:px-8 [&_td]:py-1 [&_td]:break-keep"
                                style={{ tableLayout: "auto" }}
                            >
                                <thead>
                                    <tr className="text-white rounded-t bg-first [&_td]:py-2">
                                        <td>Sr.</td>
                                        <td>Id</td>
                                        <td>Particular</td>
                                        <td>Doctor</td>
                                        {/* <td>Batch&nbsp;No</td> */}
                                        {/* <td>Expiry</td> */}
                                        {/* <td>MRP</td> */}
                                        {/* <td>Pur&nbsp;rate</td> */}
                                        {/* <td>MRP</td> */}
                                        <td>&nbsp;rate</td>
                                        <td>Qty</td>
                                        <td>Rate*Qty</td>
                                        {/* <td>Total</td> */}
                                        <td>Disc&nbsp;%</td>
                                        <td>Disc&nbsp;Amt</td>
                                        <td>Total&nbsp;Amt</td>
                                         {<td>Total</td>}

                                        {/* <td>Total&nbsp;after&nbsp;Disc</td> */}
                                        {/* <td>Grand&nbsp;Total</td> */}
                                        <td>Narration</td>

                                        <td>De</td>
                                        {/* <td>SGST&nbsp;%</td>
                                        <td>SGST&nbsp;AMT</td>
                                        <td>CGST&nbsp;%</td>
                                        <td>CGST&nbsp;AMT</td>
                                        <td>IGST&nbsp;%</td>
                                        <td>IGST&nbsp;AMT</td> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchaseDetailsArray.map((element, index) => {
                                         // Calculate the cumulative total for the current row
                                        const currentCumulativeTotal = purchaseDetailsArray
                                        .slice(0, index + 1) // Consider elements up to the current index
                                        .reduce((acc, curr) => acc + (parseFloat(curr.pdGrandTotal) || 0), 0);

                                        return (
                                            <tr key={index}>

                                                <td>{index + 1}</td>
                                                <td>{element.pdItemId}</td>
                                                <td>{element.pdParticular}</td>
                                                <td>{element.pdParticular}</td>
                                                <td>{element.pdRate}</td>
                                                <td>{element.pdQty}</td>
                                                <td>{element.pdRateQty}</td>
                                                <td>{element.pdDiscPer}</td>
                                                <td>{element.pdDiscAmt}</td>
                                                <td>{element.pdTotalAfterDisc}</td>
                                                <td>{currentCumulativeTotal}</td>                                                <td>{element.lmNarration}</td>
                                                {/* <td>{element.pdPurRate}</td> */}
                                                {/* <td>{element.pdBatchNo}</td> */}
                                                {/* <td className="min-w-[200px]">{element.pdDoe}</td> */}
                                                {/* <td>{element.pdMRP}</td>
                                                <td>{element.pdFree}</td>
                                                <td>{element.pdTotal}</td> */}
                                                {/* <td>{element.sgst}</td>
                                                <td>
                                                    {(element.pdTotalAfterDisc * element.sgst) /
                                                        100}
                                                </td>
                                                <td>{element.cgst}</td>
                                                <td>
                                                    {(element.pdTotalAfterDisc * element.cgst) /
                                                        100}
                                                </td>
                                                <td>{element.igst}</td>
                                                <td>
                                                    {(element.pdTotalAfterDisc * element.igst) /
                                                        100}
                                                </td> */}
                                                <td>
                                                    <MdDelete
                                                        className="text-red-500 h-5 w-5 cursor-pointer"
                                                        onClick={() =>
                                                            handlerPurchaseDetailsRemoveFromTable(
                                                                element.pdId
                                                            )
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
                        <div className="grid grid-cols-1 px-5 pb-5 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 max-h-[70vh] overflow-y-auto hide-scrollbar">
                            <TextFieldTopLabeled
                                label="Company A AMT"
                                className="w-[100]"
                                width={100}
                                type="number"
                                disabled={true}
                                placeholder="Auto"
                                value={purchaseDetailsArrayQty}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                label="Company B AMT"
                                type="number"
                                className="w-[100]"
                                width={100}
                                disabled={true}
                                placeholder="Auto"
                                value={pdExcludedTotal}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                label="Grand Total"
                                type="number"
                                className="w-[100]"
                                width={100}
                                disabled={true}
                                placeholder="Auto"
                                value={purchaseDetailsArrayGrandTotal}
                            ></TextFieldTopLabeled>
                            <div className="col-span-3">
                                <TextFieldTopLabeled
                                    label="Narration"
                                    className="w-[100]"
                                    minWidth={200}
                                    placeholder="Enter"
                                    value={pmnarration}
                                    onChange={(e) => setPmnarration(e.target.value)}
                                ></TextFieldTopLabeled>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-5 mt-5" onKeyDown={handlekeySubmit}>
                        <div>
                            <CustomButton1
                                label={"Submit"}
                                className="submit text-white bg-first"
                                onClick={handlerSubmit}
                            />
                        </div>
                        <div>
                            <CustomButton1
                                label={"cancel"}
                                variant="outlined"
                                className="cancel text-first"
                                onClick={() => setPurchaseDialogBox(false)}
                            />
                        </div>
                        <div>
                            <CustomButton1
                                label={"Clear Form"}
                                variant="outlined"
                                className="clearForm text-gray-400 border-gray-400"
                                onClick={() => {
                                    clearPurchaseDetailsForm();
                                    clearPurchaseMasterForm();
                                    clearPurchaseDetailsArry();
                                }}
                            />
                        </div>
                    </div>
                </DialogBox>
            </div>
        </div>
    );
}
// function handleDelete(param) {
//     // Assuming you have a unique identifier in your data, for example, PAYM_ID
//     const PM_IDToDelete = param.row.PM_ID;

//     // Confirm deletion with the user
//     const isConfirmed = window.confirm("Are you sure you want to delete this record?");

//     if (isConfirmed) {
//         FetchData("POST", "/api/purchase-master/delete-row", {
//             PM_ID: param.row.PM_ID,
//         }).then((res) => {
//             console.log(res);
//             if (!res) return;
//             if (res.isSuccess) {
//                 toast.success(res.message || "Row deleted");
//                 if (res.data?.purchaseMasterData) {
//                     GC?.setPurchaseMasterData(res.data?.purchaseMasterData); // Corrected typo here
//                 }
//             } else {
//                 toast.error(res?.message || "Failed to delete row");
//             }
//         });
//         // Perform the delete operation here
//         // You might want to make an API call to delete the record on the server
//         // After successful deletion, update your local state or refetch data

//         // Example:
//         // Your API call or logic to delete the record
//         // deleteRecord(PAYM_IDToDelete)
//         //   .then(() => {
//         //     // Update local state or refetch data after successful deletion
//         //     fetchPaymentMasterData();
//         //   })
//         //   .catch((error) => {
//         //     console.error("Error deleting record:", error);
//         //   });

//         // For now, let's simulate the update locally
//         const updatedPurchaseMasterData = GC?.purchaseMasterData?.filter(
//             (element) => element.PM_ID !== PM_IDToDelete
//         );

//         // Update the local state
//         GC?.setPurchaseMasterData(updatedPurchaseMasterData);

//         // Optionally, you can show a success message
//         toast.success("Record deleted successfully");
//     }
// }


export default BillReceipt;

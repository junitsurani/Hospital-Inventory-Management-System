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

function Connect() {
    // Global Context
    let GC = useContext(GlobalContext);

    // DilogBox states
    let [action, setAction] = useState("Add");
    let [DialogBoxTitle, setDialogBoxTitle] = useState("");
    let [connectDialogBox, setConnectDialogBox] = useState(false);

    // FormData states
    // Purchase Master
    let [pmId, setPmId] = useState(
        GC?.purchaseMasterData[GC?.purchaseMasterData?.length - 1]?.PM_ID + 1 || 1
    );
    let [pmType, setPmType] = useState("");
    let [pmNo, setPmNo] = useState("");
    let [pmInwardNo, setPmInwardNo] = useState("");
    let [pmInwardDate, setPmInwardDate] = useState("");
    let [pmReference, setPmReference] = useState("");
    let [pmPurchaseDate, setPmPurchaseDate] = useState("");
    let [pmGstType, setPmGstType] = useState("");
    let [pmCrLimit, setPmCrLimit] = useState("");
    let [pmAcName, setPmAcName] = useState("");
    let [pmLedger, setPmLedger] = useState("");
    let [pmPo, setPmPo] = useState("");
    let [pmGrossAmt, setPmGrossAmt] = useState("");
    let [pmAmt, setPmAmt] = useState("");
    let [pmTotalQty, setPmTotalQty] = useState("");
    let [pmPayedAmt, setPmPayedAmt] = useState("");
    let [pmFnarration, setPmFnarration] = useState("");
    let [pmYear, setPmYear] = useState("");
    let [pmCompId, setPmCompId] = useState("");

    // FormData states
    // Purchase Details
    let [pdDbCr, setPdDbCr] = useState("CR");
    let [pdId, setPdId] = useState("");
    let [pdParticular, setPdParticular] = useState("");
    let [pdPack, setPdPack] = useState("");
    let [pdBatchNo, setPdBatchNo] = useState("");
    let [pdDoe, setPdDoe] = useState("");
    let [pdMRP, setPdMRP] = useState("");
    let [pdPurRate, setPdPurRate] = useState("");
    let [pdSalesRate, setPdSalesRate] = useState("");
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

    // States for Purchase Details Table
    let [purchaseDetailsArray, setPurchaseDetailsArray] = useState([]);
    let [purchaseDetailsArrayTotal, setPurchaseDetailsArrayTotal] = useState(0);
    let [purchaseDetailsArrayGrandTotal, setPurchaseDetailsArrayGrandTotal] = useState(0);
    let [purchaseDetailsArrayQty, setPurchaseDetailsArrayQty] = useState(0);

    // Datagrid state
    let [apiRef, setApiRef] = useState();

    // Fetch Purchase Master and Purchase Detail Data
    useEffect(function () {
        FetchData("POST", "/api/purchase/get-purchase-data").then((res) => {
            console.log(res);
            if (res?.isSuccess) {
                if (res?.data) {
                    GC?.setPurchaseDetailsData(res?.data?.purchaseDetailsData);
                    GC?.setPurchaseMasterData(res?.data?.purchaseMasterData);

                    console.log(res?.data?.purchaseDetailsData);
                    console.log(res?.data?.purchaseMasterData);
                }
            } else {
                toast.error(res?.message || "Failed to purchase data");
            }
        });
    }, []);

    function clearPurchaseMasterForm() {
        setPmType("");
        setPmNo("");
        setPmInwardNo("");
        setPmInwardDate("");
        setPmReference("");
        setPmPurchaseDate("");
        setPmGstType("");
        setPmCrLimit("");
        setPmAcName("");
        setPmLedger("");
        setPmPo("");
        setPmGrossAmt("");
        setPmAmt("");
        setPmTotalQty("");
        setPmPayedAmt("");
        setPmFnarration("");
        setPmYear("");
        setPmCompId("");
    }
    function clearPurchaseDetailsForm() {
        setPdDbCr("");
        setPdId("");
        setPdParticular("");
        setPdPack("");
        setPdBatchNo("");
        setPdDoe("");
        setPdPurRate("");
        setPdSalesRate("");
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
        setPurchaseDetailsArrayTotal(0);
        setPurchaseDetailsArrayGrandTotal(0);
        setPurchaseDetailsArrayQty(0);
    }
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

        if (!pmReference) {
            toast.error("Please enter Reference");

            let field = document.querySelector("[data-label='Reference']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        if (!pmPurchaseDate) {
            toast.error("Please enter Purchase Date");

            let field = document.querySelector("[data-label='Purchase Date']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        if (!pmGstType) {
            toast.error("Please enter Gst Type");

            let field = document.querySelector("[data-label='GST Type']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        if (!pmCrLimit) {
            toast.error("Please enter Cr Limit");

            let field = document.querySelector("[data-label='CR Limit']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        if (!pmAcName) {
            toast.error("Please enter Ac Name");

            let field = document.querySelector("[data-label='Ac Name']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        if (!pmLedger) {
            toast.error("Please enter Ledger");

            let field = document.querySelector("[data-label='Ledger']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

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

        // if (!pmFnarration) {
        //     toast.error("Please enter Fnarration");

        //     let field = document.querySelector("[data-label='Fnarration']");
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
    function handlerPurchaseDetailsAddToTable() {
        if (pdQty < 1) {
            toast.error("Please enter valid Qty");
            return;
        }

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
            pdPack,
            pdBatchNo,
            pdDoe,
            pdMRP,
            pdPurRate,
            pdSalesRate,
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

        clearPurchaseDetailsForm();
    }
    function handlerPurchaseDetailsRemoveFromTable() {
        console.log();
    }
    function handlerAdd() {
        setConnectDialogBox(true);
        setAction("Add");
        setDialogBoxTitle("Add Purchase");

        setPmId(GC?.purchaseMasterData[GC?.purchaseMasterData?.length - 1]?.PM_ID + 1 || 1);
    }
    function handlerEdit(param) {}
    async function handlerSumit() {
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
            pmInwardNo: pmInwardNo || null,
            pmInwardDate: pmInwardDate || null,
            pmReference: pmReference || null,
            pmPurchaseDate: pmPurchaseDate || null,
            pmGstType: pmGstType || null,
            pmCrLimit: pmCrLimit || null,
            pmAcName: pmAcName || null,
            pmLedger: pmLedger || null,
            pmPo: pmPo || null,
            pmGrossAmt: pmGrossAmt || null,
            pmAmt: purchaseDetailsArrayGrandTotal || null,
            pmTotalQty: purchaseDetailsArrayQty || null,
            pmPayedAmt: pmPayedAmt || null,
            pmFnarration: pmFnarration || null,
            pmYear: new Date().getFullYear(),
            pmCompId: localStorage.getItem("lmId"),
            purchaseDetailsArray: purchaseDetailsArray || null,
        }).then((res) => {
            console.log(res);
            if (!res) return;
            if (res.isSuccess) {
                toast.success(res.message || "Data added successfully");
                GC?.setPurchaseDetailsData(res?.data?.purchaseDetailsData);
                GC?.setPurchaseMasterData(res?.data?.purchaseMasterData);

                setPmId(
                    res?.data?.purchaseMasterData[res?.data?.purchaseMasterData?.length - 1]
                        ?.PM_ID + 1
                );

                clearPurchaseDetailsForm();
                clearPurchaseMasterForm();
                clearPurchaseDetailsArry();
            } else {
                toast.error(res?.message || "Failed to add data");
            }
        });
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            const focusedElement = document.activeElement;
            // console.log("Focused element ", focusedElement);
            if (focusedElement.classList.contains('cancel')) {
                // Click the "Cancel" button
                setConnectDialogBox(false);
            }
        }
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            <Title title1={"Connect"} title2={"Configuration"} />
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
                                        <div className="pl-2 cursor-pointer">
                                            {param.formattedValue}
                                        </div>
                                    );
                                },
                            },
                            {
                                field: "Ref_no",
                                headerName: "Ref No",
                                width: 100,
                            },
                            {
                                field: "Name",
                                headerName: "Name",
                                width: 100,
                            },
                            {
                                field: "Mobile",
                                headerName: "Mobile",
                                width: 100,
                            },
                            {
                                field: "Email",
                                headerName: "Email",
                                width: 100,
                            },
                            {
                                field: "IO",
                                headerName: "I/O",
                                width: 100,
                            },
                            {
                                field: "City",
                                headerName: "City",
                                width: 100,
                            },
                            {
                                field: "Delete",
                                headerName: "Delete",
                                width: 100,
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
                        ]}
                        rows={[
                            {
                                id: 1,
                                Ref_no: 1452366,
                                Name: "Name 1",
                                Mobile: 4569871230,
                                Email: "viral.gajera218@gmail.com",
                                IO: "Incoming",
                                City: "Rajkot",
                                Delete: "Button",
                                CREATED_BY: "superadmin@gmail.com",
                                CREATED_AT: "15/10/2023",
                                UPDATED_BY: "[]",
                                UPDATED_AT: "[]",
                            },
                            {
                                id: 2,
                                Ref_no: 1452366,
                                Name: "Name 1",
                                Mobile: 4569871230,
                                Email: "viral.gajera218@gmail.com",
                                IO: "Incoming",
                                City: "Rajkot",
                                Delete: "Button",
                                CREATED_BY: "superadmin@gmail.com",
                                CREATED_AT: "15/10/2023",
                                UPDATED_BY: "[]",
                                UPDATED_AT: "[]",
                            },
                            {
                                id: 3,
                                Ref_no: 1452366,
                                Name: "Name 1",
                                Mobile: 4569871230,
                                Email: "viral.gajera218@gmail.com",
                                IO: "Incoming",
                                City: "Rajkot",
                                Delete: "Button",
                                CREATED_BY: "superadmin@gmail.com",
                                CREATED_AT: "15/10/2023",
                                UPDATED_BY: "[]",
                                UPDATED_AT: "[]",
                            },
                        ]}
                    />
                </div>

                <DialogBox
                    state={connectDialogBox}
                    setState={setConnectDialogBox}
                    title1={DialogBoxTitle}
                    title2={"Purchase"}
                >
                    {/* Search */}
                    <div className="flex flex-wrap items-center gap-5 my-8 md:mx-10 lg:mx-16">
                        <div className="font-semibold text-gray-600">Search Company</div>
                        <TextFieldTopLabeled placeholder="Search"></TextFieldTopLabeled>
                        <CustomButton1
                            label={"Search"}
                            className="max-h-[34px] px-10 py-[5px] mb-[2px] text-white grow bg-first"
                        />
                    </div>

                    <div className="min-h-[100px]"></div>

                    <div className="flex justify-center gap-5 mt-5" onKeyDown={handleKeyPress}>
                        <div>
                            <CustomButton1 
                                label={"Submit"} 
                                className="submit text-white bg-first" 
                            />
                        </div>
                        <div>
                            <CustomButton1
                                label={"cancel"}
                                variant="outlined"
                                className="cancel text-first"
                                onClick={() => setConnectDialogBox(false)}
                            />
                        </div>
                        <div>
                            <CustomButton1
                                label={"Clear Form"}
                                variant="outlined"
                                className="clearForm text-gray-400 border-gray-400"
                            />
                        </div>
                    </div>
                </DialogBox>
            </div>
        </div>
    );
}

export default Connect;

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

function ReceiptPayment() {
    // Global Context
    let GC = useContext(GlobalContext);

    let date = new Date();
    let dateFiledFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date
        .getDay()
        .toLocaleString("US", {
            minimumIntegerDigits: 2,
        })}`;

    // Dialog box states
    let [action, setAction] = useState("Add");
    let [dialogBoxTitle, setDialogBoxTitle] = useState("");
    let [dialogBox, setDialogBox] = useState(false);

    // Form States: PR-Master
    let [prmId, setPrmId] = useState(
        GC?.paymentReceiptMasterData[GC?.paymentReceiptMasterData?.length - 1]?.PRM_ID + 1 || 1
    );
    let [prmType, setPrmType] = useState("");
    let [prmTypeId, setPrmTypeId] = useState("");
    let [prmTypeNo, setPrmTypeNo] = useState("");
    let [prmDate, setPrmDate] = useState(dateFiledFormat);
    let [prmNarration, setPrmNarration] = useState(""); 

    // Form States: PR-Details
    let [dbCr, setDbCr] = useState("DB");
    let [acName, setAcName] = useState("");
    let [acId, setAcId] = useState("");
    let [advAgst, setAdvAgst] = useState("");
    let [cr, setCr] = useState("");
    let [db, setDb] = useState("");
    let [narration, setNarration] = useState("");

    // Payment & Receipt PR-Details array:
    let [prdArray, setPdrArray] = useState([]);
    let [prdCrTotal, setPrdCrTotal] = useState(0);
    let [prdDbTotal, setPrdDbTotal] = useState(0);

    // Datagrid state
    let [apiRef, setApiRef] = useState();

    useEffect(function () {
        // FetchData("POST", "/api/payment-receipt/get-details").then((res) => {
        //     console.log(res);
        //     if (res?.isSuccess) {
        //         if (res?.data) {
        //             GC?.setPaymentReceiptDetailsData(res?.data?.paymentReceiptDetailsData);
        //             GC?.setPaymentReceiptMasterData(res?.data?.paymentReceiptMasterData);
        //             console.log(res?.data?.paymentReceiptDetailsData);
        //             console.log(res?.data?.paymentReceiptMasterData);
        //         }
        //     } else {
        //         toast.error(res?.message || "Failed to purchase data");
        //     }
        // });
    }, []);

    // PR-Details
    function clearPrd() {
        setDbCr("DB");
        setAcName("");
        setAdvAgst("");
        setCr("");
        setDb("");
        setNarration("");
    }

    function clearPrm() {
        setPrmType("");
        setPrmTypeNo("");
        setPrmDate(dateFiledFormat);
        setPrmNarration("");
        setPrdCrTotal(0);
        setPrdDbTotal(0);
        setPdrArray([]);
    }

    // PR-Details : Add details to array
    function prdAddToTable() {
        if (action == "Edit") {
            toast.error("Adding new record not allowed while editing");
            return;
        }

        setPrdCrTotal((old) => old + Number(cr));
        setPrdDbTotal((old) => old + Number(db));

        let detailObject = {
            dbCr,
            acName,
            advAgst,
            cr,
            db,
            narration,
        };

        setPdrArray((old) => {
            return [...old, detailObject];
        });
        clearPrd();
    }

    // Add Button -> Opens Dialog Box
    function handlerAdd() {
        setAction("Add");
        setDialogBox(true);
        setDialogBoxTitle("Add Receipt & Payment");

        setPrmId(
            GC?.paymentReceiptMasterData[GC?.paymentReceiptMasterData?.length - 1]?.PRM_ID + 1 || 1
        );
    }

    // Edit -> Opens Dialog Box
    function handlerEdit(param) {
        setAction("Edit");
        setDialogBox(true);
        setDialogBoxTitle("Add Receipt & Payment");

        clearPrd();
        clearPrm();

        console.log(param.row);

        setPrmId(() => param.row.PRM_ID || "0");
        setPrmType(() => param.row.PRM_TYPE || "");
        setPrmDate(() => param.row.PRM_DATE || "");
        setPrmNarration(() => param.row.PRM_NARRATION || "");
        setPrdCrTotal(() => param.row.PRM_CR_TOTAL || "");
        setPrdDbTotal(() => param.row.PRM_DB_TOTAL || "");

        setPdrArray(() => {
            let filteredValue = GC?.paymentReceiptDetailsData?.map((element) => {
                if (element.PRM_ID === param.row.PRM_ID) {
                    return {
                        prdId: element.PRD_ID,
                        dbCr: element.PRD_CR_DB,
                        acName: element.PRD_AC_NAME,
                        advAgst: element.PRD_REF,
                        cr: element.PRD_CR_AMT,
                        db: element.PRD_DB_AMT,
                        narration: element.PRD_NARRATION,
                    };
                }
            });

            filteredValue = filteredValue?.filter((element) => element);

            return filteredValue;
        });
    }

    function handlerSumit() {
        let url = "";
        if (action == "Add") {
            url = "/api/payment-receipt/add-details";
        } else if (action == "Edit") {
            url = "/api/payment-receipt/edit-details";
        }

        FetchData("POST", url, {
            user_email: localStorage.getItem("email") || null,
            prmId: prmId || 0,
            prmType: prmType || null,
            prmTypeNo: prmTypeNo || null,
            prmDate: prmDate || null,
            prmNarration: prmNarration || null,
            prdCrTotal: prdCrTotal || null,
            prdDbTotal: prdDbTotal || null,
            prdArray: prdArray || null,
        }).then((res) => {
            console.log(res);
            if (!res) return;
            if (res.isSuccess) {
                toast.success(res.message || "Data added successfully");
                GC?.setPaymentReceiptMasterData(res?.data?.paymentReceiptMasterData);
                GC?.setPaymentReceiptDetailsData(res?.data?.paymentReceiptDetailsData);

                clearPrd();
                clearPrm();

                setPrmId(
                    res?.data?.paymentReceiptMasterData[
                        res?.data?.paymentReceiptMasterData?.length - 1
                    ]?.PRM_ID + 1
                );

                setAction("Add");
            } else {
                toast.error(res?.message || "Failed to add data");
            }
        });
    }

    function handlekeySubmit(e) {
        if (e.key === "Enter") {
            handlerSumit();
        }
    }

    function handleKeyAdd(e) {
        if (e.key === "Enter") {
            prdAddToTable();
        }
    }

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            <Title title1={"Receipt & Payment"} title2={"Transaction"} />
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
                                            className="pl-2 cursor-pointer"
                                            onClick={() => handlerEdit(param)}
                                        >
                                            {param.formattedValue}
                                        </div>
                                    );
                                },
                            },
                            {
                                field: "PRM_TYPE",
                                headerName: "Type",
                                width: 100,
                            },
                            {
                                field: "PRM_TYPE_WISE_ID",
                                headerName: "No",
                                width: 100,
                            },
                            {
                                field: "PRM_DATE",
                                headerName: "Date Time",
                                width: 100,
                            },
                            {
                                field: "Amount",
                                headerName: "Amount",
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
                        rows={GC?.paymentReceiptMasterData?.map((element, index) => {
                            return {
                                id: element.PRM_ID,
                                ...element,
                            };
                        })}
                    />
                </div>

                <DialogBox
                    state={dialogBox}
                    setState={setDialogBox}
                    title1={dialogBoxTitle}
                    title2={"Receipt & Payment"}
                >
                    {/* Input Fields */}
                    <div
                        className="max-h-[70vh] mt-3 overflow-auto hide-scrollbar"
                        onKeyDown={handleKeyAdd}
                    >
                        {/* Fields */}
                        <div className="grid grid-cols-1 p-5 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-h-[70vh] overflow-y-auto hide-scrollbar">
                            <TextFieldTopLabeled
                                label="Id"
                                placeholder="Auto"
                                value={prmId}
                                disabled={true}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                label="Type"
                                placeholder="Select"
                                value={prmType}
                                list={"receipt-payment-type"}
                                onChange={(e) => {setPrmType(e.target.value)
                                    var ind = e.target.value.split("-");
                                    ind = parseInt(ind[0]);
                                    setPrmTypeId(ind);}}
                            >
                                <datalist id="receipt-payment-type" className="bg-white">
                                    {GC?.typeMasterData?.map((element) => {
                                        if (element.TNM_NAME === "Payment-Receipt-Type") {
                                            return <option value={element.TM_ID + "- " + element.TM_NAME}></option>;
                                        }
                                    })}
                                </datalist>
                            </TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                label="Type Wise No"
                                type="number"
                                disabled={true}
                                placeholder="Auto"
                                value={prmTypeNo}
                            ></TextFieldTopLabeled>
                            <DateTopLabeled
                                label="Date"
                                value={prmDate}
                                onChange={(e) => setPrmDate(e.target.value)}
                            ></DateTopLabeled>
                        </div>

                        {/* Fields */}
                        <div className="pb-1 px-5 mt-10 mb-5 overflow-x-auto max-w-[100%]">
                            <div className="flex flex-wrap gap-2 p-2 border rounded">
                                <div className="w-[100px]">
                                    <label className="text-xs">
                                        <div className="">DB/CR</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded"
                                            value={dbCr}
                                            onChange={(e) => setDbCr(e.target.value)}
                                            list="dbCrList"
                                        />
                                        <datalist id="dbCrList">
                                            <option value="DB"></option>
                                            <option value="CR"></option>
                                        </datalist>
                                    </label>
                                </div>
                                <div className="grow w-[150px]">
                                    <label className="text-xs">
                                        <div className="">A/C Name</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded"
                                            value={acName}
                                            onChange={(e) => {setAcName(e.target.value)
                                                var ind = e.target.value.split("-");
                                                ind = parseInt(ind[0]);
                                                setAcId(ind);}}
                                            list="ac-name"
                                        />
                                        <datalist id="ac-name" className="bg-white">
                                            {GC?.accountGroupData.map((element, index) => {
                                                if (element.AG_NAME) {
                                                    return (
                                                        <option
                                                            key={index}
                                                            className="text-black"
                                                            value={element.AG_ID + "- " + element.AG_NAME}
                                                            data-agid={element.AG_ID}
                                                        ></option>
                                                    );
                                                }
                                            })}
                                        </datalist>
                                    </label>
                                </div>
                                <div className="grow w-[150px]">
                                    <label className="text-xs">
                                        <div className="">Adv/Agst Ref</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded"
                                            value={advAgst}
                                            onChange={(e) => setAdvAgst(e.target.value)}
                                            list="adv-agst-ref"
                                        />
                                        <datalist id="adv-agst-ref">
                                            <option value="Advance"></option>
                                            <option value="Against Reference"></option>
                                        </datalist>
                                    </label>
                                </div>
                                <div className="w-[80px]">
                                    <label className="text-xs">
                                        <div className="">CR</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded shrink"
                                            value={cr}
                                            onChange={(e) => setCr(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="w-[80px]">
                                    <label className="text-xs">
                                        <div className="">DB</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded shrink"
                                            value={db}
                                            onChange={(e) => setDb(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="w-[150px]">
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
                                        <td>DR/CR</td>
                                        <td>A/C Name</td>
                                        <td>Adv/ Agst Ref</td>
                                        <td>CR</td>
                                        <td>CB</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prdArray.map((element, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{element.dbCr}</td>
                                                <td>{element.acName}</td>
                                                <td>{element.advAgst}</td>
                                                <td>{element.cr}</td>
                                                <td>{element.db}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* 5. Fields */}
                        <div
                            className="grid grid-cols-1 px-5 pb-5 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 max-h-[70vh] overflow-y-auto hide-scrollbar"
                            onKeyDown={handlekeySubmit}
                        >
                            <div className="col-span-3">
                                <TextFieldTopLabeled
                                    label="Narration"
                                    placeholder="Enter"
                                    value={prmNarration}
                                    onChange={(e) => setPrmNarration(e.target.value)}
                                ></TextFieldTopLabeled>
                            </div>
                            <TextFieldTopLabeled
                                label="Cr"
                                type="number"
                                disabled={true}
                                placeholder="Auto"
                                value={prdCrTotal}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                label="Db"
                                type="number"
                                disabled={true}
                                placeholder="Auto"
                                value={prdDbTotal}
                            ></TextFieldTopLabeled>
                        </div>
                    </div>

                    <div className="flex justify-center gap-5 mt-5">
                        <div>
                            <CustomButton1
                                label={"Submit"}
                                className="text-white bg-first"
                                onClick={handlerSumit}
                            />
                        </div>
                        <div>
                            <CustomButton1
                                label={"cancel"}
                                variant="outlined"
                                className="text-first"
                                onClick={() => setDialogBox(false)}
                            />
                        </div>
                        <div>
                            <CustomButton1
                                label={"Clear Form"}
                                variant="outlined"
                                className="text-gray-400 border-gray-400"
                                onClick={clearPrm}
                            />
                        </div>
                    </div>
                </DialogBox>
            </div>
        </div>
    );
}

export default ReceiptPayment;

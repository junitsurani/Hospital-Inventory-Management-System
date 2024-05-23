import * as React from "react";
import toast from "react-hot-toast";
import { useState, useContext } from "react";
import MUIDataGrid from "../components/DataGridTables/MUIDataGrid";

import CustomButton1 from "../components/CustomButton1.component";
import Title from "../components/SectionComponents/Title.component";
import Controls2 from "../components/SectionComponents/Controls2.component";
import DialogBox from "../components/DialogBoxComponents/DialogBox.compoent";
import CheckBoxTopLabeled from "../components/DialogBoxComponents/CheckBoxTopLabeled";
import TextFieldTopLabeled from "../components/DialogBoxComponents/TextFieldTopLabeled";

import { FetchData } from "../functions/FetchData.function";
import { GlobalContext } from "../global-context/GlobalContextComponent";

function ItemMaster() {
    let GC = useContext(GlobalContext);

    // DilogBox states
    let [action, setAction] = useState("Add");
    let [DialogBoxTitle, setDialogBoxTitle] = useState("");
    let [itemMasterDialogBox, setItemMasterDialogBox] = useState(false);

    // FormData states
    let [imId, setImId] = useState(
        GC?.itemMasterData[GC?.itemMasterData?.length - 1]?.LM_ID + 1 || ""
    );
    let [imName, setImName] = useState("");
    let [imAlias, setImAlias] = useState("");
    let [imDepartId, setImDepartId] = useState("");
    let [imDepartmentName, setImDepartmentName] = useState("");
    let [imDepartmentNameField, setImDepartmentNameField] = useState("");
    let [imGroup, setImGroup] = useState("");
    let [imGroupField, setImGroupField] = useState("");
    let [imGroupId, setImGroupId] = useState("");
    let [imManufacture, setImManufacture] = useState("");
    let [imManufactureField, setImManufactureField] = useState("");
    let [imManufactureId, setImManufactureId] = useState("");
    let [imUnder, setImUnder] = useState("");
    let [imUnderField, setImUnderField] = useState("");
    let [imUnderId, setImUnderId] = useState("");
    let [imLocationId, setImLocationId] = useState("");
    let [imUnit, setImUnit] = useState("");
    let [imUnitField, setImUnitField] = useState("");
    let [imUnitId, setImUnitId] = useState("");
    let [imMrp, setImMrp] = useState("");
    let [imPurRate, setImPurRate] = useState("");
    let [imSalesRate, setImSalesRate] = useState("");
    let [imPack, setImPack] = useState(1);
    let [imHsnCode, setImHsnCode] = useState("");
    let [imSgst, setImSgst] = useState("");
    let [imCgst, setImCgst] = useState("");
    let [imIgst, setImIgst] = useState("");
    let [imLocation, setImLocation] = useState("");
    let [imLocationField, setImLocationField] = useState("");
    let [imIsActive, setImIsActive] = useState(true);
    let [imIsDefault, setImIsDefault] = useState(true);
    let [compId, setCompId] = useState("");
    let [imDiscPer, setImDiscPer] = useState("");

    // Datagrid state
    let [apiRef, setApiRef] = useState();

    function clearForm() {
        setImName(() => "");
        setImAlias(() => "");
        setImDepartId(() => "");
        setImDepartmentName(() => "");
        setImDepartmentNameField("");
        setImGroup(() => "");
        setImGroupId(null);
        setImGroupField("");
        setImManufacture(() => "");
        setImManufactureField("");
        setImManufactureId(null);
        setImUnder(() => "");
        setImUnderField("");
        setImUnderId(null);
        setImUnit(() => "");
        setImUnitId(null);
        setImUnitField("");
        setImMrp(() => "");
        setImPurRate(() => "");
        setImPack(() => 1);
        setImHsnCode(() => "");
        setImSgst(() => "");
        setImCgst(() => "");
        setImIgst(() => "");
        setImLocation(() => "");
        setImIsActive(() => true);
        setImIsDefault(() => true);
        setCompId(() => "");
        setImDiscPer(() => "");
    }
    function validate() {
        if (!imName) {
            toast.error("Please enter name");

            let field = document.querySelector("[data-label='Name']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        // if (!imAlias) {
        //     toast.error("Please enter alias");

        //     let field = document.querySelector("[data-label='Alias']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!imDepartId) {
        //     toast.error("Please enter department id");

        //     let field = document.querySelector("[data-label='Department ID']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!imDepartmentName) {
        //     toast.error("Please enter department name");

        //     let field = document.querySelector("[data-label='Department Name']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // } else {
        //     let deptIdsNames = GC?.typeMasterData?.map((element) => {
        //         if (element.TNM_NAME === "Department") {
        //             return element.TM_NAME_ID + " " + element.TM_NAME;
        //         }
        //     });

        //     console.log(deptIdsNames);

        //     if (!deptIdsNames.includes(imDepartId + " " + imDepartmentName)) {
        //         toast.error("Please select valid department");

        //         let field = document.querySelector("[data-label='Department Name']");
        //         field?.focus();
        //         field?.scrollIntoView({
        //             behavior: "smooth",
        //             block: "center",
        //             inline: "nearest",
        //         });
        //         return;
        //     }
        // }

        if (!imGroup) {
            toast.error("Please enter group");

            let field = document.querySelector("[data-label='Group']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        if (imGroup) {
            let groupNames = GC?.typeMasterData?.map((element) => {
                if (element.TNM_NAME === "Group") {
                    return element.TM_NAME;
                }
            });

            if (!groupNames.includes(imGroup)) {
                toast.error("Please select group from the dropdown");

                let field = document.querySelector("[data-label='Group']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // if (!imManufacture) {
        //     toast.error("Please enter manufacture");

        //     let field = document.querySelector("[data-label='Manufacture']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        if (imManufacture) {
            let manufactureNames = GC?.typeMasterData?.map((element) => {
                if (element.TNM_NAME === "Menufacture") {
                    return element.TM_NAME;
                }
            });

            if (!manufactureNames.includes(imManufacture)) {
                toast.error("Please select manufacture from the dropdown");

                let field = document.querySelector("[data-label='Manufacture']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // if (!imUnder) {
        //     toast.error("Please enter under");

        //     let field = document.querySelector("[data-label='Under']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        if (imUnder) {
            let underNames = GC?.accountGroupData?.map((element) => {
                if (element.AG_NAME) {
                    return element.AG_NAME;
                }
            });

            if (!underNames.includes(imUnder)) {
                toast.error("Please select under from the dropdown");

                let field = document.querySelector("[data-label='Under']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // if (!imUnit) {
        //     toast.error("Please enter Unit");

        //     let field = document.querySelector("[data-label='Unit']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        if (imUnit) {
            let unitNames = GC?.typeMasterData?.map((element) => {
                if (element.TNM_NAME === "Unit") {
                    return element.TM_NAME;
                }
            });

            if (!unitNames.includes(imUnit)) {
                toast.error("Please select unit from the dropdown");

                let field = document.querySelector("[data-label='Unit']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        if (!imPack || Number(imPack) < 1 || !Number.isInteger(+imPack)) {
            toast.error("Please enter valid Pack");

            let field = document.querySelector("[data-label='Pack']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        // if (!imHsnCode) {
        //     toast.error("Please enter HSN Code");

        //     let field = document.querySelector("[data-label='HSN Code']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!imDiscPer) {
        //     toast.error("Please enter Discount Percentage");

        //     let field = document.querySelector("[data-label='Discount Percentage']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }
        if (imDiscPer) {
            if (imDiscPer < 0 || imDiscPer > 100) {
                toast.error("Please enter valid Discount Percentage");

                let field = document.querySelector("[data-label='Discount Percentage']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // if (!imMrp) {
        //     toast.error("Please enter MRP");

        //     let field = document.querySelector("[data-label='MRP']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        if (imMrp) {
            if (imMrp < 0) {
                toast.error("Please enter valid MRP");

                let field = document.querySelector("[data-label='MRP']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // if (!imPurRate) {
        //     toast.error("Please enter Purchase Rate");

        //     let field = document.querySelector("[data-label='Purchase Rate']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        if (imPurRate) {
            if (imPurRate < 0) {
                toast.error("Please enter valid Purchase Rate");

                let field = document.querySelector("[data-label='Purchase Rate']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // if (!imSalesRate) {
        //     toast.error("Please enter Sales Rate");

        //     let field = document.querySelector("[data-label='Sales Rate']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        if (imSalesRate) {
            if (imSalesRate < 0) {
                toast.error("Please enter valid Sales Rate");

                let field = document.querySelector("[data-label='Sales Rate']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // if (!imLocation) {
        //     toast.error("Please enter Location");

        //     let field = document.querySelector("[data-label='Location']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        if (imLocation) {
            let locationNames = GC?.typeMasterData?.map((element) => {
                if (element.TNM_NAME === "Location") {
                    return element.TM_NAME;
                }
            });

            if (!locationNames.includes(imLocation)) {
                toast.error("Please select location from the dropdown");

                let field = document.querySelector("[data-label='Location']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // if (!imSgst) {
        //     toast.error("Please enter SGST");

        //     let field = document.querySelector("[data-label='SGST']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        if (imSgst) {
            if (imSgst < 0 || imSgst > 100) {
                toast.error("Please enter valid SGST");

                let field = document.querySelector("[data-label='SGST']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // if (!imCgst) {
        //     toast.error("Please enter CGST");

        //     let field = document.querySelector("[data-label='CGST']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        if (imCgst) {
            if (imCgst < 0 || imCgst > 100) {
                toast.error("Please enter valid CGST");

                let field = document.querySelector("[data-label='CGST']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // if (!imIgst) {
        //     toast.error("Please enter IGST");

        //     let field = document.querySelector("[data-label='IGST']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        if (imIgst) {
            if (imIgst < 0 || imIgst > 100) {
                toast.error("Please enter valid IGST");

                let field = document.querySelector("[data-label='IGST']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // if (!compId) {
        //     toast.error("Please enter Company ID");

        //     let field = document.querySelector("[data-label='Company ID']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        return true;
    }
    function handlerAdd() {
        clearForm();
        setItemMasterDialogBox(true);
        setAction("Add");
        setDialogBoxTitle("Add Item Master Details");

        setImId(GC?.itemMasterData[GC?.itemMasterData?.length - 1]?.IM_ID + 1 || 1);
    }
    function handlerEdit(param) {
        setItemMasterDialogBox(true);
        setAction("Edit");
        setDialogBoxTitle("Edit Item Master Details");

        clearForm();

        setImId(() => param.row.IM_ID);
        setImName(() => param.row.IM_NAME ?? "");
        setImAlias(() => param.row.IM_ALIAS ?? "");
        setImDepartId(() => param.row.IM_DEPART_ID ?? "");
        setImDepartmentName(() => param.row.IM_DEPARTMENT_NAME ?? "");
        setImGroupId(() => param.row.IM_GROUP ?? "");
        setImManufactureId(() => param.row.IM_MANUFACTURE ?? "");
        setImUnderId(() => param.row.IM_UNDER ?? "");
        setImUnitId(() => param.row.IM_UNIT ?? "");
        setImMrp(() => param.row.IM_MRP ?? "");
        setImPurRate(() => param.row.IM_PUR_RATE ?? "");
        setImSalesRate(() => param.row.IM_SALES_RATE ?? "");
        setImPack(() => param.row.IM_PACK ?? "");
        setImHsnCode(() => param.row.IM_HSN_CODE ?? "");
        setImSgst(() => param.row.IM_SGST ?? "");
        setImCgst(() => param.row.IM_CGST ?? "");
        setImIgst(() => param.row.IM_IGST ?? "");
        setImLocationId(() => param.row.IM_LOCATION ?? "");
        setImIsActive(() => param.row.IM_IS_Active ?? "");
        setImIsDefault(() => param.row.IM_IS_DEFAULT ?? "");
        setCompId(() => param.row.COMP_ID ?? "");
        setImDiscPer(() => param.row.IM_DISC_PER ?? "");

        setImDepartmentNameField(param.row.IM_DEPART_ID + ' - ' +param.row.IM_DEPARTMENT_NAME);



        GC?.typeMasterData?.map((element, index) => {
            if (element.TNM_ID === 2) {
                if (element.TM_NAME_ID === param.row.IM_GROUP) {
                    setImGroup(element.TM_NAME);
                    setImGroupField(element.TM_NAME_ID + ' - ' + element.TM_NAME);
                }
            }

            if (element.TNM_ID === 3) {
                if (element.TM_NAME_ID === param.row.IM_MANUFACTURE) {
                    setImManufacture(element.TM_NAME);
                    setImManufactureField(element.TM_NAME_ID + ' - ' + element.TM_NAME);
                }
            }

            if (element.TNM_ID === 7) {
                if (element.TM_NAME_ID === param.row.IM_UNIT) {
                    setImUnit(element.TM_NAME);
                    setImUnitField(element.TM_NAME_ID + ' - ' + element.TM_NAME);
                }
            }

            if (element.TNM_ID === 4) {
                if (element.TM_NAME_ID === param.row.IM_LOCATION) {
                    setImLocation(element.TM_NAME);
                    setImLocationField(element.TM_NAME_ID + ' - ' + element.TM_NAME);
                }
            }
        })

        GC?.accountGroupData.map((element, index) => {
            if (element.AG_ID === param.row.IM_UNDER) {
                setImUnder(element.AG_ID);
                setImUnderField(element.AG_ID + ' - '+element.AG_ID);
            }
        })



    }
    async function handlerSubmit() {
        let url = "";
        if (action == "Add") {
            url = "/api/item-master/add-item-data";
        } else if (action == "Edit") {
            url = "/api/item-master/edit-item-data";
        }

        if (!validate()) return;

        FetchData("POST", url, {
            user_email: localStorage.getItem("email"),
            imId,
            imName,
            imAlias,
            imDepartId,
            imDepartmentName,
            imGroup: imGroupId,
            imManufacture: imManufactureId,
            imUnder: imUnderId,
            imUnit: imUnitId,
            imMrp,
            imPurRate,
            imSalesRate,
            imPack,
            imHsnCode,
            imSgst,
            imCgst,
            imIgst,
            imLocation: imLocationId,
            imIsActive,
            imIsDefault,
            compId,
            imDiscPer,
        }).then((res) => {
            console.log(res);
            if (res?.isSuccess) {
                toast.success(res?.message || "Data added successfully");
                if (res?.data?.itemMasterData) {
                    GC?.setItemMasterData(res.data?.itemMasterData);
                }
                if (action == "Add") {
                    clearForm();
                    setImId((old) => old + 1);
                } else if (action == "Edit") {
                    clearForm();
                    setItemMasterDialogBox(false);
                }
            } else {
                toast.error(res?.message || "Failed to add data");
            }
        });
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            const focusedElement = document.activeElement;
            // console.log("Focused element ", focusedElement);
            if (focusedElement.classList.contains('submit')) {
                // Execute the submit handler
                handlerSubmit();
            } else if (focusedElement.classList.contains('cancel')) {
                // Click the "Cancel" button
                setItemMasterDialogBox(false);
            } else if (focusedElement.classList.contains('clearForm')) {
                // Click the "Clear Form" button
                clearForm();
            } else {
                handlerSubmit();
            }
        }
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            <Title title1={"Item Master"} title2={"Configuration"} />
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
                                field: "IM_ID",
                                width: 50,
                                renderHeader: (param) => {
                                    return <div className="pl-2 font-[500]">ID</div>;
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
                                field: "IM_NAME",
                                headerName: "Name",
                                width: 100,
                            },
                            {
                                field: "IM_ALIAS",
                                headerName: "Alias",
                                width: 100,
                            },
                            {
                                field: "IM_DEPART_ID",
                                headerName: "Department ID",
                                width: 100,
                            },
                            {
                                field: "IM_DEPARTMENT_NAME",
                                headerName: "Department Name",
                                width: 100,
                            },
                            {
                                field: "IM_GROUP",
                                headerName: "Group",
                                width: 100,
                            },
                            {
                                field: "IM_MANUFACTURE",
                                headerName: "Manufacture",
                                width: 100,
                            },
                            {
                                field: "IM_UNDER",
                                headerName: "Under",
                                width: 100,
                            },
                            {
                                field: "IM_UNIT",
                                headerName: "Unit",
                                width: 100,
                            },
                            {
                                field: "IM_MRP",
                                headerName: "MRP",
                                width: 100,
                            },
                            {
                                field: "IM_PUR_RATE",
                                headerName: "Purchase Rate",
                                width: 100,
                            },
                            {
                                field: "IM_SALES_RATE",
                                headerName: "Sales Rate",
                                width: 100,
                            },
                            {
                                field: "IM_PACK",
                                headerName: "Pack",
                                width: 100,
                            },
                            {
                                field: "IM_HSN_CODE",
                                headerName: "HSN Code",
                                width: 100,
                            },
                            {
                                field: "IM_SGST",
                                headerName: "SGST",
                                width: 100,
                            },
                            {
                                field: "IM_CGST",
                                headerName: "CGST",
                                width: 100,
                            },
                            {
                                field: "IM_IGST",
                                headerName: "IGST",
                                width: 100,
                            },
                            {
                                field: "IM_LOCATION",
                                headerName: "Location",
                                width: 100,
                            },
                            {
                                field: "IM_IS_Active",
                                headerName: "Is Active",
                                width: 100,
                            },
                            {
                                field: "IM_IS_DEFAULT",
                                headerName: "Is Default",
                                width: 100,
                            },
                            {
                                field: "COMP_ID",
                                headerName: "Company ID",
                                width: 100,
                            },
                            {
                                field: "IM_DISC_PER",
                                headerName: "Discount Percentage",
                                width: 100,
                            },
                            {
                                field: "CREATED_BY",
                                headerName: "Created By",
                                width: 100,
                            },
                            {
                                field: "CREATED_AT",
                                headerName: "Created At",
                                width: 100,
                            },
                            {
                                field: "UPDATED_BY",
                                headerName: "Updated By",
                                width: 100,
                                renderCell: (param) => {
                                    let updatedByArray = JSON.parse(param.formattedValue);
                                    return updatedByArray[updatedByArray.length - 1];
                                },
                            },
                            {
                                field: "UPDATED_AT",
                                headerName: "Updated At",
                                width: 100,
                                renderCell: (param) => {
                                    let updatedAtArray = JSON.parse(param.formattedValue);
                                    let timeString = updatedAtArray[updatedAtArray.length - 1];
                                    if (timeString) {
                                        return timeString.replace("T", " ").substring(0, 16);
                                    } else {
                                        return "-";
                                    }
                                },
                            },
                        ]}
                        rows={GC?.itemMasterData?.map((element, index) => {
                            return {
                                id: element.IM_ID,
                                ...element,
                            };
                        })}
                        setApiRef={setApiRef}
                    />
                </div>

                <DialogBox
                    state={itemMasterDialogBox}
                    setState={setItemMasterDialogBox}
                    title1={DialogBoxTitle}
                    title2={"Item Master"}
                >
                    <div
                        className="grid grid-cols-1 p-5 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-4 max-h-[70vh] overflow-y-auto hide-scrollbar"
                        onKeyDown={handleKeyPress}
                    >
                        <TextFieldTopLabeled
                            label="ID"
                            placeholder="Enter"
                            value={imId}
                            onChange={(e) => setImId(e.target.value)}
                            disabled={true}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Name"
                            placeholder="Enter"
                            required={true}
                            value={imName}
                            onChange={(e) => setImName(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Alias"
                            placeholder="Enter"
                            value={imAlias}
                            onChange={(e) => setImAlias(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Group ID"
                            placeholder="Auto"
                            type="number"
                            disabled={true}
                            value={imGroupId}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Group"
                            placeholder="Select"
                            required={true}
                            value={imGroupField}
                            onChange={(e) => {
                                let element = document.querySelector(
                                    `#group-list [value="${e.target.value}"]`
                                );
                                let dataGroupId = element?.getAttribute("data-group-id");
                                let dataGroupName = element?.getAttribute("data-groupname");
                                setImGroupId(dataGroupId);
                                setImGroup(dataGroupName);
                                setImGroupField(e.target.value);
                            }}
                            list={"group-list"}
                        >
                            <datalist id="group-list" className="bg-white">
                                {GC?.typeMasterData?.map((element, index) => {
                                    if (element.TNM_NAME === "Group") {
                                        return (
                                            <option
                                                key={index}
                                                className="text-black"
                                                value={element.TM_NAME_ID + " - " + element.TM_NAME}
                                                data-group-id={element.TM_NAME_ID}
                                                data-groupname={element.TM_NAME}
                                            ></option>
                                        );
                                    }
                                })}
                            </datalist>
                        </TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Department Name"
                            placeholder="Enter"
                            value={imDepartmentNameField}
                            onChange={(e) => {
                                let element = document.querySelector(
                                    `#department-name [value="${e.target.value}"]`
                                );
                                let deptId = element?.getAttribute("data-dept-id");
                                let deptName = element?.getAttribute("data-deptname");
                                setImDepartId(deptId);
                                setImDepartmentName(deptName);
                                setImDepartmentNameField(e.target.value);
                            }}
                            list={"department-name"}
                        >
                            <datalist id="department-name" className="bg-white">
                                {GC?.typeMasterData?.map((element, index) => {
                                    if (element.TNM_NAME === "Department") {
                                        return (
                                            <option
                                                key={index}
                                                className="text-black"
                                                value={element.TM_NAME_ID + "- " + element.TM_NAME}
                                                data-dept-id={element.TM_NAME_ID}
                                                data-deptname={element.TM_NAME}
                                            ></option>
                                        );
                                    }
                                })}
                            </datalist>
                        </TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Manufacture"
                            placeholder="Enter"
                            value={imManufactureField}
                            onChange={(e) => {
                                let element = document.querySelector(
                                    `#manufacture-list [value="${e.target.value}"]`
                                );
                                let deptId = element?.getAttribute("data-dept-id");
                                let deptName = element?.getAttribute("data-dept-name");
                                setImManufacture(deptName);
                                setImManufactureId(deptId);
                                setImManufactureField(e.target.value);
                            }}
                            list={"manufacture-list"}
                        >
                            <datalist id="manufacture-list" className="bg-white">
                                {GC?.typeMasterData?.map((element, index) => {
                                    if (element.TNM_ID === 3) {
                                        return (
                                            <option
                                                key={index}
                                                className="text-black"
                                                value={element.TM_NAME_ID + " - " + element.TM_NAME}
                                                data-dept-id={element.TM_NAME_ID}
                                                data-dept-name={element.TM_NAME}
                                            ></option>
                                        );
                                    }
                                })}
                            </datalist>
                        </TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Under"
                            placeholder="Enter"
                            value={imUnderField}
                            onChange={(e) => {
                                let element = document.querySelector(
                                    `#im-under [value="${e.target.value}"]`
                                );
                                let agid = element?.getAttribute("data-agid");
                                let agname = element?.getAttribute("data-agname");
                                setImUnderField(e.target.value);
                                setImUnder(agname);
                                setImUnderId(agid);
                            }}
                            list={"im-under"}
                        >
                            <datalist id="im-under" className="bg-white">
                                {GC?.accountGroupData.map((element, index) => {
                                    if (element.AG_NAME) {
                                        return (
                                            <option
                                                key={index}
                                                className="text-black"
                                                value={element.AG_ID + "- " + element.AG_NAME}
                                                data-agid={element.AG_ID}
                                                data-agname={element.AG_NAME}
                                            ></option>
                                        );
                                    }
                                })}
                            </datalist>
                        </TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Unit"
                            placeholder="Enter"
                            value={imUnitField}
                            onChange={(e) => {
                                let element = document.querySelector(
                                    `#unit-list [value="${e.target.value}"]`
                                );
                                let deptid = element?.getAttribute("data-dept-id");
                                let deptname = element?.getAttribute("data-deptname");
                                setImUnit(deptname);
                                setImUnitId(deptid);
                                setImUnitField(e.target.value);
                            }}
                            list={"unit-list"}
                        >
                            <datalist id="unit-list" className="bg-white">
                                {GC?.typeMasterData?.map((element, index) => {
                                    if (element.TNM_NAME === "Unit") {
                                        return (
                                            <option
                                                key={index}
                                                className="text-black"
                                                value={element.TM_NAME_ID + "- " + element.TM_NAME}
                                                data-dept-id={element.TM_NAME_ID}
                                                data-deptname={element.TM_NAME}
                                            ></option>
                                        );
                                    }
                                })}
                            </datalist>
                        </TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Pack"
                            placeholder="Enter"
                            type={"number"}
                            required={true}
                            value={imPack}
                            onChange={(e) => setImPack(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="HSN Code"
                            placeholder="Enter"
                            value={imHsnCode}
                            onChange={(e) => setImHsnCode(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Discount Percentage"
                            type={"number"}
                            placeholder="Enter"
                            value={imDiscPer}
                            onChange={(e) => setImDiscPer(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="MRP"
                            type="number"
                            placeholder="0.00"
                            value={imMrp}
                            onChange={(e) => setImMrp(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Purchase Rate"
                            type="number"
                            placeholder="0.00"
                            value={imPurRate}
                            onChange={(e) => setImPurRate(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Sales Rate"
                            type="number"
                            placeholder="0.00"
                            value={imSalesRate}
                            onChange={(e) => setImSalesRate(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Location"
                            placeholder="Enter"
                            value={imLocationField}
                            onChange={(e) => {
                                let element = document.querySelector(
                                    `#location-list [value="${e.target.value}"]`
                                );
                                let deptid = element?.getAttribute("data-dept-id");
                                let deptname = element?.getAttribute("data-deptname");
                                setImLocation(deptname);
                                setImLocationId(deptid);
                                setImLocationField(e.target.value);
                            }}
                            list={"location-list"}
                        >
                            <datalist id="location-list" className="bg-white">
                                {GC?.typeMasterData?.map((element, index) => {
                                    if (element.TNM_NAME === "Location") {
                                        return (
                                            <option
                                                key={index}
                                                className="text-black"
                                                value={element.TM_NAME_ID + "- " + element.TM_NAME}
                                                data-dept-id={element.TM_NAME_ID}
                                                data-deptname={element.TM_NAME}
                                            ></option>
                                        );
                                    }
                                })}
                            </datalist>
                        </TextFieldTopLabeled>

                        <TextFieldTopLabeled
                            label="SGST"
                            type="number"
                            placeholder="0.00"
                            value={imSgst}
                            onChange={(e) => setImSgst(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="CGST"
                            type="number"
                            placeholder="0.00"
                            value={imCgst}
                            onChange={(e) => setImCgst(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="IGST"
                            type="number"
                            placeholder="0.00"
                            value={imIgst}
                            onChange={(e) => setImIgst(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Company Name"
                            value={compId}
                            placeholder="Select"
                            onChange={(e) => setCompId(e.target.value)}
                            list={"parent-id"}
                        >
                            <datalist id="parent-id" className="bg-white">
                                {GC?.ledgerMasterData.map((element, index) => {
                                    if (element.LM_ID) {
                                        return (
                                            <option
                                                key={index}
                                                className="text-black"
                                                value={element.LM_ID}
                                            ></option>
                                        );
                                    }
                                })}
                            </datalist>
                        </TextFieldTopLabeled>

                        <CheckBoxTopLabeled
                            label="Is Active"
                            placeholder="Enter"
                            state={imIsActive}
                            setState={setImIsActive}
                        ></CheckBoxTopLabeled>
                        <CheckBoxTopLabeled
                            label="Is Default"
                            placeholder="Enter"
                            state={imIsDefault}
                            setState={setImIsDefault}
                        ></CheckBoxTopLabeled>
                    </div>
                    <div className="flex justify-center gap-5 mt-5" onKeyDown={handleKeyPress}>
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
                                onClick={() => setItemMasterDialogBox(false)}
                            />
                        </div>
                        <div>
                            <CustomButton1
                                label={"Clear Form"}
                                variant="outlined"
                                className="clearForm text-gray-400 border-gray-400"
                                onClick={clearForm}
                            />
                        </div>
                    </div>
                </DialogBox>
            </div>
        </div>
    );
}

export default ItemMaster;

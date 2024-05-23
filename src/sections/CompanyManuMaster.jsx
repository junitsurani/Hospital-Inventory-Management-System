import * as React from "react";
import toast from "react-hot-toast";
import { useState, useContext } from "react";

import { FetchData } from "../functions/FetchData.function";
import CustomButton1 from "../components/CustomButton1.component";
import Title from "../components/SectionComponents/Title.component";
import { GlobalContext } from "../global-context/GlobalContextComponent";
import Controls2 from "../components/SectionComponents/Controls2.component";
import DialogBox from "../components/DialogBoxComponents/DialogBox.compoent";
import CheckBoxTopLabeled from "../components/DialogBoxComponents/CheckBoxTopLabeled";
import TextFieldTopLabeled from "../components/DialogBoxComponents/TextFieldTopLabeled";
import MultipleSelectTopLabeled from "../components/DialogBoxComponents/MultipleSelectTopLabeled";

import MUIDataGrid from "../components/DataGridTables/MUIDataGrid";

function CompanyManuMaster() {
    let GC = useContext(GlobalContext);
    let { companyMenuMasterData, setCompanyMenuMasterData } = GC;
    let { menuMasterData } = GC;

    // Dialogbox data
    let [action, setAction] = useState("Add");
    let [DialogBoxTitle, setDialogBoxTitle] = useState("");
    let [companyMenuMasterDialogBox, setCompanyMenuMasterDialogBox] = useState(false);

    // Form Data
    let [lmId, setLmId] = useState("");
    let [lmName, setLmName] = useState("");
    let [lmNameField, setLmNameField] = useState("");
    let [menuId, setMenuId] = useState([]);
    let [isActive, setIsActive] = useState(true);

    // Datagrid state
    let [apiRef, setApiRef] = useState();

    function clearForm() {
        setMenuId(() => []);
        setLmName(() => "");
        setLmId(() => "");
        setIsActive(() => true);
        setLmNameField("");
    }

    function validataion() {
        if (!lmId) {
            toast.error("Please select company name");

            let field = document.querySelector("[data-label='Company Name']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        } else if (action == "Add") {
            // Check if ledger master already has permission
            let isAlreadyAdded = companyMenuMasterData.filter((e) => e.LM_ID == lmId)[0];
            if (isAlreadyAdded) {
                toast.error("The Company that you have selected, already has permission");

                let field = document.querySelector("[data-label='Company Name']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });

                return;
            }
        }
        if (menuId?.length == 0) {
            toast.error("Please select menu id");

            let field = document.querySelector("[data-label='Menu Name']");
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

    function handlerAdd() {
        setCompanyMenuMasterDialogBox(true);
        setAction("Add");
        setDialogBoxTitle("Add Comapany Menu Master");

        clearForm();
    }
    function handlerEdit(param) {
        console.log(param.row);

        setCompanyMenuMasterDialogBox(true);
        setAction("Edit");
        setDialogBoxTitle("Edit Comapany Menu Master");

        clearForm();

        setMenuId(() => param.row.MENU_LIST);
        var tlmname = GC?.ledgerMasterData.filter((e) => e.LM_ID == param.row.LM_ID)[0].LM_NAME;
        setLmName(() => tlmname);
        setLmId(() => param.row.LM_ID || "");
        setLmNameField(param.row.LM_ID + ' - '+ tlmname );
        setIsActive(() => param.row.IS_ACTIVE || true);
    }


    function handlerSubmit() {
        let url = "";
        if (action == "Add") {
            url = "/api/company-menu-master/add-company-menu";
        } else if (action == "Edit") {
            url = "/api/company-menu-master/edit-company-menu";
        }

        if (!validataion()) return;

        FetchData("POST", url, {
            user_email: localStorage.getItem("email"),
            menuId: menuId || null,
            lmId: lmId || null,
            isActive: Number(isActive),
        }).then((res) => {
            console.log(res);
            if (res?.isSuccess) {
                toast.success("Permission Modified");
                if (res.data?.companyMenuMasterData) {
                    setCompanyMenuMasterData(res.data?.companyMenuMasterData);
                }
                if (action == "Add") {
                    clearForm();

                    let firstField = document.getElementById("company-menu-master-id");
                    firstField.focus();
                    firstField.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "nearest",
                    });
                } else if (action == "Edit") {
                    clearForm();
                    setCompanyMenuMasterDialogBox(false);
                }
            } else {
                toast.error(res?.message || "Failed to add data");
            }
        });
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            const focusedElement = document.activeElement;
            //console.log("Focused element ", focusedElement);
            if (focusedElement.classList.contains('submit')) {
                // Execute the submit handler
                handlerSubmit();
            } else if (focusedElement.classList.contains('cancel')) {
                // Click the "Cancel" button
                setCompanyMenuMasterDialogBox(false);
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
            <Title title1={"Comapany Menu Master"} title2={"Configuration"} />
            <div className="p-3 mt-2 bg-white rounded grow">
                <div className="p-2 mt-3 rounded bg-second">
                    <div className="p-1">
                        <Controls2 onClick1={handlerAdd} apiRef={apiRef} />
                    </div>
                </div>

                <div className="mt-5">
                    <MUIDataGrid
                        columns={[
                            {
                                field: "id",
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
                                field: "LM_NAME",
                                headerName: "Comp Name",
                                width: 150,
                            },
                            {
                                field: "LM_ID",
                                headerName: "Comp Id",
                                width: 70,
                            },
                            {
                                field: "CREATED_BY",
                                headerName: "Created By",
                                width: 180,
                            },
                            {
                                field: "CREATED_AT",
                                headerName: "Created Date",
                                flex: 1,
                                minWidth: 150,
                                renderCell: (param) => {
                                    if (param.formattedValue) {
                                        return String(param.formattedValue)
                                            .replace("T", " ")
                                            .substring(0, 16);
                                    } else {
                                        return "-";
                                    }
                                },
                            },
                            {
                                field: "UPDATED_BY",
                                headerName: "Updated By",
                                flex: 1,
                                minWidth: 200,
                                renderCell: (param) => {
                                    let updatedByArray = JSON.parse(param.formattedValue);
                                    return updatedByArray[updatedByArray.length - 1];
                                },
                            },
                            {
                                field: "UPDATED_AT",
                                headerName: "Updated At",
                                flex: 1,
                                minWidth: 150,
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
                            // {
                            //     renderCell: (param) => (
                            //         <div className="flex gap-3">
                            //             <ButtonEdit onClick={() => handlerEdit(param)} />
                            //         </div>
                            //     ),
                            //     headerName: "Action",
                            //     flex: 1,
                            //     minWidth: 150,
                            // },
                        ]}
                        rows={GC?.ledgerMasterData
                            ?.map((element) => {
                                return {
                                    id: element?.LM_ID,
                                    MENU_LIST: GC?.companyMenuMasterData?.map((e) => {
                                        if (element?.LM_ID === e?.LM_ID) {
                                            let menuId = e?.M_ID;
                                            let menuName = GC?.menuMasterData?.filter(
                                                (menu) => menu.M_ID === menuId
                                            )[0]?.M_NAME;
                                            return menuId + " " + menuName;
                                        }
                                    }),
                                    ...element,
                                };
                            })
                            ?.filter((element) => {
                                let doCompExistInCMM = companyMenuMasterData.filter(
                                    (e) => e.LM_ID === element.LM_ID
                                );
                                return doCompExistInCMM.length;
                            })}
                        setApiRef={setApiRef}
                    />
                </div>

                <DialogBox
                    state={companyMenuMasterDialogBox}
                    setState={setCompanyMenuMasterDialogBox}
                    title1={DialogBoxTitle}
                    title2={"Company Menu Master"}
                >
                    <div
                        className="grid grid-cols-1 p-5 gap-x-4 gap-y-3 md:grid-cols-2  max-h-[70vh] overflow-y-auto hide-scrollbar"
                        onKeyDown={handleKeyPress}
                    >
                        <TextFieldTopLabeled
                            label="Id"
                            placeholder="Auto Generated"
                            value={lmId}
                            disabled={true}
                        ></TextFieldTopLabeled>

                        <TextFieldTopLabeled
                            label="Company Name"
                            value={lmNameField}
                            placeholder={"Select"}
                            disabled={action == "Edit" ? true : false}
                            required={true}
                            id="company-menu-master-id"
                            onChange={(e) => {
                                setLmNameField(e.target.value);
                                let element = document.querySelector(
                                    `#Comapany-name [value="${e.target.value}"]`
                                );
                                let dataLmId = element?.getAttribute("data-lmid");
                                let dataLmName = element?.getAttribute("data-lmname");
                                let dataReferenceId = element?.getAttribute("data-referenceid");
                                setLmId(dataLmId);
                                setLmName(dataLmName);
                            }}
                            list={"Comapany-name"}
                        >
                            <datalist id="Comapany-name" className="bg-white">
                                {GC?.ledgerMasterData?.map((element, index) => {
                                    if (element.LM_NAME) {
                                        return (
                                            <option
                                                key={index}
                                                className="text-black"
                                                value={element.LM_ID + "- " +element.LM_NAME}
                                                data-lmid={element.LM_ID}
                                                data-lmname={element.LM_NAME}
                                                data-referenceid={element.LM_REFERENCE_ID}
                                            ></option>
                                        );
                                    }
                                })}
                            </datalist>
                        </TextFieldTopLabeled>

                        <MultipleSelectTopLabeled
                            label="Menu Name"
                            placeholder="Search"
                            required={true}
                            state={menuId}
                            setState={setMenuId}
                            onChange={(selectedValues) => {
                                console.log("Selected values:", selectedValues);
                            }}
                            optionData={GC?.menuMasterData?.map((element) => {
                                if (!element.M_PARENT_ID)
                                    return element["M_ID"] + " " + element["M_NAME"];
                            })}
                            maxWidth="270px"
                        ></MultipleSelectTopLabeled>

                        {/* <CheckBoxTopLabeled
                            label="Is Active"
                            state={isActive}
                            setState={setIsActive}
                        /> */}
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
                                onClick={() => setCompanyMenuMasterDialogBox(false)}
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

export default CompanyManuMaster;

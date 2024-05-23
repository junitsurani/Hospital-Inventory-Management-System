import * as React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

import Title from "../components/SectionComponents/Title.component";
import CustomButton1 from "../components/CustomButton1.component";
import DialogBox from "../components/DialogBoxComponents/DialogBox.compoent";
import Controls2 from "../components/SectionComponents/Controls2.component";
import TextFieldTopLabeled from "../components/DialogBoxComponents/TextFieldTopLabeled";
import CheckBoxTopLabeled from "../components/DialogBoxComponents/CheckBoxTopLabeled";

import MUIDataGrid from "../components/DataGridTables/MUIDataGrid";

import { useContext } from "react";
import { GlobalContext } from "../global-context/GlobalContextComponent";
import { FetchData } from "../functions/FetchData.function";

function TypeMaster() {
    // Global context
    let GC = useContext(GlobalContext);
    let { typeMasterData, setTypeMasterData } = GC;
    let { typeNameMasterData } = GC;

    // Dialogbox data
    let [action, setAction] = useState("Add");
    let [DialogBoxTitle, setDialogBoxTitle] = useState("");
    let [typeMasterDialogBox, setTypeMasterDialogBox] = useState(false);

    // Form data
    let [tmId, setTmId] = useState(typeMasterData[typeMasterData.length - 1]?.TM_ID + 1 || "");
    let [tmNameId, setTmNameId] = useState();
    let [tnmId, setTnmId] = useState();
    let [tnmName, setTnmName] = useState("");
    let [tnmNameField, setTnmNameField] = useState("");
    let [tmName, setTmName] = useState("");
    let [isDefault, setIsDefault] = useState(false);
    let [isDeleted, setIsDeleted] = useState(false);
    let [isActive, setIsActive] = useState(true);
    let [remarkDisplay, setRemarkDisplay] = useState(false);
    let [remark1, setRemark1] = useState("");
    let [remark2, setRemark2] = useState("");

    // Datagrid state
    let [apiRef, setApiRef] = useState();

    function clearForm() {
        setTmNameId(() => "");
        setTnmId(() => "");
        setTnmName(() => "");
        setTnmNameField("");
        setTmName(() => "");
        setRemark1("");
        setRemark2("");
        setIsDefault(() => false);
        setIsDeleted(() => false);
        setIsActive(() => true);
    }
    function validate() {
        if (!tnmId) {
            toast.error("Please select master name");

            let field = document.querySelector("[data-label='Master Name']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        if (!tmName) {
            toast.error("Please enter valid name");

            let field = document.querySelector("[data-label='Name']");
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
        setTypeMasterDialogBox(true);
        setAction("Add");
        setDialogBoxTitle("Add Type Master");

        clearForm();

        setTmId(typeMasterData[typeMasterData.length - 1]?.TM_ID + 1 || 1);
    }
    function handlerEdit(param) {
        setTypeMasterDialogBox(true);
        setAction("Edit");
        setDialogBoxTitle("Edit Type Master");

        clearForm();

        setTmId(() => param.row.TM_ID || "");
        setTmNameId(() => param.row.TM_NAME_ID || "");
        setTnmId(() => param.row.TNM_ID || "");
        setTnmName(() => param.row.TNM_NAME || "");
        setTnmNameField(() => (param.row.TNM_ID + ' - ' + param.row.TNM_NAME));
        setTmName(() => param.row.TM_NAME || "");
        setIsDefault(() => param.row.IS_DEFAULT);
        setIsDeleted(() => param.row.IS_DELETE);
        setIsActive(() => param.row.IS_ACTIVE);
        setRemark1(() => param.row.TM_REMARKS_1 || "");
        setRemark2(() => param.row.TM_REMARKS_2 || "");
    }
    function handlerSubmit() {
        let url = "";
        if (action == "Add") {
            url = "/api/type-master/add-type";
        } else if (action == "Edit") {
            url = "/api/type-master/edit-type";
        }

        if (!validate()) return;

        FetchData("POST", url, {
            user_email: localStorage.getItem("email"),
            tmId: Number(tmId) || null,
            tmNameId: Number(tmNameId) || null,
            tnmId: Number(tnmId) || null,
            tnmName: tnmName || null,
            tmName: tmName || null,
            remark1: remark1 || null,
            remark2: remark2 || null,
            isDefault: Number(isDefault),
            isDeleted: Number(isDeleted),
            isActive: Number(isActive),
        }).then((res) => {
            console.log(res);
            if (!res) return;
            if (res.isSuccess) {
                toast.success("Data added successfully");
                if (res.data?.typeMasterData) {
                    setTypeMasterData(res.data.typeMasterData);
                }
                if (action == "Add") {
                    clearForm();
                    setTmId((old) => old + 1);
                    let firstField = document.getElementById("type-master-id");
                    firstField.focus();
                    firstField.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "nearest",
                    });
                } else if (action == "Edit") {
                    clearForm();
                    setTypeMasterDialogBox(false);
                }
            } else {
                toast.error(res.message || "Failed to add data");
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
                setTypeMasterDialogBox(false);
            } else if (focusedElement.classList.contains('clearForm')) {
                // Click the "Clear Form" button
                clearForm();
            } else {
                handlerSubmit();
            }
        }
    };

    function handlerChangeTypeMasterName(tnmId) {
        let max = 0;
        GC?.typeMasterData?.forEach((element) => {
            if (element.TNM_ID == tnmId) {
                if (element.TM_NAME_ID > max) {
                    max = element.TM_NAME_ID;
                }
            }
        });
        setTmNameId(max + 1);
    }

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            <Title title1={"Type Master"} title2={"Configuration"} />
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
                                field: "TM_ID",
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
                                field: "TM_NAME_ID",
                                headerName: "Display Id",
                                width: 100,
                            },
                            {
                                field: "TNM_NAME",
                                headerName: "Master Name",
                                width: 130,
                            },
                            {
                                field: "TM_NAME",
                                headerName: "Name",
                                flex: 1,
                                minWidth: 150,
                            },
                            {
                                field: "IS_ACTIVE",
                                headerName: "Active",
                                width: 80,
                                renderCell: (param) => {
                                    return (
                                        <div className="pl-2">
                                            {param.formattedValue ? "Yes" : "No"}
                                        </div>
                                    );
                                },
                            },
                            {
                                field: "IS_DEFAULT",
                                headerName: "Default",
                                width: 80,
                                renderCell: (param) => {
                                    return (
                                        <div className="pl-2">
                                            {param.formattedValue ? "Yes" : "No"}
                                        </div>
                                    );
                                },
                            },
                            {
                                field: "CREATED_BY",
                                headerName: "Created By",
                                flex: 1,
                                minWidth: 200,
                            },
                            {
                                field: "CREATED_AT",
                                headerName: "Created At",
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
                            //     field: "IS_DELETE",
                            //     headerName: "Deleted",
                            //     flex: 1,
                            //     minWidth: 100,
                            //     renderCell: (param) => {
                            //         return (
                            //             <div className="pl-2">
                            //                 {param.formattedValue ? "Yes" : "No"}
                            //             </div>
                            //         );
                            //     },
                            // },
                            // {
                            //     renderCell: (param) => (
                            //         <div className="flex gap-3 pl-2">
                            //             <ButtonEdit onClick={() => handlerEdit(param)} />
                            //         </div>
                            //     ),
                            //     headerName: "Action",
                            //     flex: 1,
                            //     minWidth: 150,
                            // },
                        ]}
                        rows={typeMasterData.map((element, index) => {
                            return {
                                key: index,
                                id: element.TM_ID,
                                ...element,
                            };
                        })}
                        setApiRef={setApiRef}
                    />
                </div>

                <DialogBox
                    state={typeMasterDialogBox}
                    setState={setTypeMasterDialogBox}
                    title1={DialogBoxTitle}
                    title2={"Type Master"}
                >
                    <div
                        className="grid grid-cols-1 p-5 gap-x-4 gap-y-3 md:grid-cols-2 max-h-[70vh] overflow-y-auto hide-scrollbar"
                        onKeyDown={handleKeyPress}
                    >
                        <TextFieldTopLabeled
                            label="Id"
                            placeholder="Auto Generated"
                            value={tmId}
                            onChange={(e) => setTmId(e.target.value)}
                            disabled={true}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Display id"
                            placeholder="Auto calculated"
                            value={tmNameId}
                            disabled={true}
                            onChange={(e) => setTmNameId(e.target.value)}
                        ></TextFieldTopLabeled>

                        <TextFieldTopLabeled
                            label="Master Name"
                            value={tnmNameField}
                            required={true}
                            id="type-master-id"
                            onChange={(e) => {
                                let element = document.querySelector(
                                    `#Master-name [value="${e.target.value}"]`
                                );
                                let tnmId = element?.getAttribute("data-tnmid");
                                let tnName = element?.getAttribute("data-tnname");
                                let remarkDisplay = element?.getAttribute("data-remarkdisplay");
                                setTnmName(tnName);
                                setTnmId(tnmId);
                                setTnmNameField(e.target.value);
                                handlerChangeTypeMasterName(tnmId);
                                setRemarkDisplay(Number(remarkDisplay));
                            }}
                            list={"Master-name"}
                        >
                            <datalist id="Master-name" className="bg-white">
                                {GC?.typeNameMasterData.map((element, index) => {
                                    if (element.TNM_NAME) {
                                        return (
                                            <option
                                                key={index}
                                                className="text-black"
                                                value={element.TNM_ID + "- "+ element.TNM_NAME}
                                                data-tnmid={element.TNM_ID}
                                                data-tnname={element.TNM_NAME}
                                                data-remarkdisplay={element.REMARK_DISPLAY}
                                            ></option>
                                        );
                                    }
                                })}
                            </datalist>
                        </TextFieldTopLabeled>

                        <TextFieldTopLabeled
                            label="Name"
                            placeholder="Enter"
                            required={true}
                            value={tmName}
                            onChange={(e) => setTmName(e.target.value)}
                        ></TextFieldTopLabeled>

                        {remarkDisplay ? (
                            <TextFieldTopLabeled
                                label="Remark 1"
                                placeholder="Enter"
                                value={remark1}
                                onChange={(e) => setRemark1(e.target.value)}
                            ></TextFieldTopLabeled>
                        ) : (
                            ""
                        )}
                        {remarkDisplay ? (
                            <TextFieldTopLabeled
                                label="Remark 2"
                                placeholder="Enter"
                                value={remark2}
                                onChange={(e) => setRemark2(e.target.value)}
                            ></TextFieldTopLabeled>
                        ) : (
                            ""
                        )}

                        <div className="flex flex-wrap justify-between col-span-1 gap-5 md:col-span-2">
                            <CheckBoxTopLabeled
                                state={isDefault}
                                setState={setIsDefault}
                                label="Is Default"
                            />
                            <CheckBoxTopLabeled
                                state={isDeleted}
                                setState={setIsDeleted}
                                label="Is Deleted"
                            />
                            <CheckBoxTopLabeled
                                state={isActive}
                                setState={setIsActive}
                                label="Is Active"
                            />
                        </div>
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
                                onClick={() => setTypeMasterDialogBox(false)}
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

export default TypeMaster;

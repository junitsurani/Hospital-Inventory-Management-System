import * as React from "react";
import { useState } from "react";

import Title from "../components/SectionComponents/Title.component";
import CustomButton1 from "../components/CustomButton1.component";
import DialogBox from "../components/DialogBoxComponents/DialogBox.compoent";
import Controls1 from "../components/SectionComponents/Controls1.component";
import Controls2 from "../components/SectionComponents/Controls2.component";
import TextFieldTopLabeled from "../components/DialogBoxComponents/TextFieldTopLabeled";
import SelectOptionTopLabeled from "../components/DialogBoxComponents/SelectOptionTopLabeled";
import CheckBoxTopLabeled from "../components/DialogBoxComponents/CheckBoxTopLabeled";
import DateTopLabeled from "../components/DialogBoxComponents/DateTopLabeled";

import MUIDataGrid from "../components/DataGridTables/MUIDataGrid";
import ButtonConfig from "../components/DataGridTables/ButtonConfig.compoent";
import ButtonEdit from "../components/DataGridTables/ButtonEdit.component";

import { useContext } from "react";
import { GlobalContext } from "../global-context/GlobalContextComponent";
import toast from "react-hot-toast";
import { FetchData } from "../functions/FetchData.function";

function TypeNameMaster() {
    // Global context
    let GC = useContext(GlobalContext);
    let { typeNameMasterData, setTypeNameMasterData } = GC;

    // Dialogbox data
    let [action, setAction] = useState("Add");
    let [DialogBoxTitle, setDialogBoxTitle] = useState("");
    let [typeNameMasterDialogBox, setTypeNameMasterDialogBox] = useState(false);

    // Form Data
    let [tnmId, setTnmId] = useState(
        typeNameMasterData[typeNameMasterData.length - 1]?.TNM_ID + 1 || ""
    );
    let [typeName, setTypeName] = useState("");
    let [isActive, setIsActive] = useState(true);
    let [isGroup, setIsGroup] = useState(true);
    let [remarkDisplay, setRemarkDisplay] = useState(true);

    // Datagrid state
    let [apiRef, setApiRef] = useState();

    function clearForm() {
        setTypeName(() => "");
        setIsActive(() => true);
        setIsGroup(() => true);
        setRemarkDisplay(() => true);
    }
    function validate() {
        if (!typeName) {
            toast.error("Please enter valid type name");

            let field = document.querySelector("[data-label='Type Name']");
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
        setTypeNameMasterDialogBox(true);
        setAction("Add");
        setDialogBoxTitle("Add Type Name Master");

        clearForm();

        setTnmId(typeNameMasterData[typeNameMasterData.length - 1]?.TNM_ID + 1 || 1);
    }
    function handlerEdit(param) {
        setTypeNameMasterDialogBox(true);
        setAction("Edit");
        setDialogBoxTitle("Edit Type Name Master");

        clearForm();

        setTnmId(() => param.row.TNM_ID || "");
        setTypeName(() => param.row.TNM_NAME || "");
        setIsActive(() => param.row.IS_ACTIVE || "");
        setIsGroup(() => param.row.IS_GROUP || "");
        setRemarkDisplay(() => param.row.REMARK_DISPLAY || "");
    }
    function handlerSubmit() {
        let url = "";
        if (action == "Add") {
            url = "/api/type-name-master/add-type-name";
        } else if (action == "Edit") {
            url = "/api/type-name-master/edit-type-name";
        }

        if (!validate()) return;

        FetchData("POST", url, {
            user_email: localStorage.getItem("email"),
            tnmId: Number(tnmId) || null,
            typeName: typeName || null,
            isActive: Number(isActive),
            isGroup: Number(isGroup),
            remarkDisplay: Number(remarkDisplay),
        }).then((res) => {
            console.log(res);
            if (res?.isSuccess) {
                toast.success("Data added successfully");
                if (res.data?.typeNameMasterData) {
                    setTypeNameMasterData(res.data?.typeNameMasterData);
                }
                if (action == "Add") {
                    clearForm();
                    setTnmId((old) => old + 1);
                    let firstField = document.getElementById("type-name-master-id");
                    firstField.focus();
                    firstField.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "nearest",
                    });
                } else if (action == "Edit") {
                    clearForm();
                    setTypeNameMasterDialogBox(false);
                }
            } else {
                toast.error(res?.message || "Failed to add data");
            }
        });
    }
    function handlekeySubmit(e) {
        if (e.key === "Enter") {
            const focusedElement = document.activeElement;
            // console.log("Focused element ", focusedElement);
            if (focusedElement.classList.contains('submit')) {
                // Execute the submit handler
                handlerSubmit();
            } else if (focusedElement.classList.contains('cancel')) {
                // Click the "Cancel" button
                setTypeNameMasterDialogBox(false);
            } else if (focusedElement.classList.contains('clearForm')) {
                // Click the "Clear Form" button
                clearForm();
            } else {
                handlerSubmit();
            }
        }
    }

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            <Title title1={"Type Name Master"} title2={"Configuration"} />
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
                                field: "TNM_ID",
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
                                key: 2,
                                field: "TNM_NAME",
                                headerName: "Name",
                                flex: 1,
                                minWidth: 150,
                            },
                            {
                                key: 3,
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
                                key: 4,
                                field: "IS_GROUP",
                                headerName: "Group",
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
                                key: 5,
                                field: "REMARK_DISPLAY",
                                headerName: "Remark Display",
                                width: 130,
                                renderCell: (param) => {
                                    return (
                                        <div className="pl-2">
                                            {param.formattedValue ? "Yes" : "No"}
                                        </div>
                                    );
                                },
                            },
                            {
                                key: 6,
                                field: "CREATED_BY",
                                headerName: "Created By",
                                width: 180,
                            },
                            {
                                key: 7,
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
                                key: 8,
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
                                key: 9,
                                field: "UPDATED_AT",
                                headerName: "Updated Date",
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
                            //     key: 10,
                            //     field: "IS_DELETE",
                            //     headerName: "Deleted",
                            //     flex: 1,
                            //     minWidth: 150,
                            //     renderCell: (param) => {
                            //         return (
                            //             <div className="pl-2">
                            //                 {param.formattedValue ? "Yes" : "No"}
                            //             </div>
                            //         );
                            //     },
                            // },
                            // {
                            //     key: 11,
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
                        rows={typeNameMasterData.map((element, index) => {
                            return {
                                id: element.TNM_ID,
                                ...element,
                            };
                        })}
                        setApiRef={setApiRef}
                    />
                </div>

                <DialogBox
                    state={typeNameMasterDialogBox}
                    setState={setTypeNameMasterDialogBox}
                    title1={DialogBoxTitle}
                    title2={"Type Name Master"}
                >
                    <div
                        className="grid grid-cols-1 p-5 gap-x-4 gap-y-3 md:grid-cols-2 max-h-[70vh] overflow-y-auto hide-scrollbar"
                        onKeyDown={handlekeySubmit}
                    >
                        <TextFieldTopLabeled
                            label="Master id"
                            placeholder="Auto Generated"
                            value={tnmId}
                            onChange={(e) => setTnmId(e.target.value)}
                            disabled={true}
                        ></TextFieldTopLabeled>

                        <TextFieldTopLabeled
                            label="Type Name"
                            placeholder="Enter"
                            value={typeName}
                            required={true}
                            id="type-name-master-id"
                            onChange={(e) => setTypeName(e.target.value)}
                        ></TextFieldTopLabeled>

                        <div className="flex flex-wrap justify-between col-span-1 gap-5 md:col-span-2">
                            <CheckBoxTopLabeled
                                label="Is Active"
                                state={isActive}
                                setState={setIsActive}
                            />
                            <CheckBoxTopLabeled
                                label="Is Group"
                                state={isGroup}
                                setState={setIsGroup}
                            />
                            <CheckBoxTopLabeled
                                label="Remark Display"
                                state={remarkDisplay}
                                setState={setRemarkDisplay}
                            />
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
                                onClick={() => setTypeNameMasterDialogBox(false)}
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

export default TypeNameMaster;

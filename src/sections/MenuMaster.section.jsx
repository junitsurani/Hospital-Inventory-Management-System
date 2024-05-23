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

function MenuMaster() {
    // Global context
    let GC = useContext(GlobalContext);
    let { menuMasterData, setMenuMasterData } = GC;

    // DialogBox data
    let [action, setAction] = useState("Add");
    let [DialogBoxTitle, setDialogBoxTitle] = useState("");
    let [menuMasterDialogBox, setMenuMasterDialogBox] = useState(false);

    // Form Data
    let [menuId, setMenuId] = useState(menuMasterData[menuMasterData.length - 1]?.M_ID + 1 || "");
    let [menuName, setMenuName] = useState("");
    let [menuFormLink, setMenuFormLink] = useState("");
    let [parentId, setParentId] = useState();
    let [haveForm, setHaveForm] = useState(-1);
    let [menuPrefix, setMenuPrefix] = useState("");
    let [menuOrder, setMenuOrder] = useState("");
    let [menuIcon, setMenuIcon] = useState("");
    let [menuType, setMenuType] = useState("");
    let [menuShortCutKey, setMenuShortCutKey] = useState("");
    let [isActive, setIsActive] = useState(true);

    // Datagrid state
    let [apiRef, setApiRef] = useState();

    function clearForm() {
        setMenuName(() => "");
        setMenuFormLink(() => "");
        setParentId(() => "");
        setHaveForm(() => -1);
        setMenuPrefix(() => "");
        setMenuOrder(() => "");
        setMenuIcon(() => "");
        setMenuType(() => "");
        setMenuShortCutKey(() => "");
        setIsActive(() => true);
    }
    function validate() {
        if (!menuName) {
            toast.error("Please enter valid menu name");

            let field = document.querySelector("[data-label='Menu Name']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }
        if (haveForm == "-1") {
            toast.error("Please select 'Have Form' option ");

            let field = document.querySelector("[data-label='Have Form']");
            console.log(field);
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }
        if (haveForm == "1" && !menuFormLink) {
            toast.error("Please enter valid menu form link");

            let field = document.querySelector("[data-label='Menu Form Link']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }
        if (haveForm == "1" && !parentId) {
            toast.error("Please enter valid parent id");

            let field = document.querySelector("[data-label='Parent Id']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        } else if (haveForm == "1") {
            let parentIdsArray = GC?.menuMasterData?.filter((element) => {
                return element.M_HAVE_FORM == "0";
            });

            parentIdsArray = parentIdsArray.map((element) => {
                return element.M_ID;
            });

            if (!parentIdsArray.includes(+parentId)) {
                toast.error("Please enter valid parent id");

                let field = document.querySelector("[data-label='Parent Id']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }
        if (!menuOrder) {
            toast.error("Please enter menu order");

            let field = document.querySelector("[data-label='Menu Order']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }
        if (haveForm == "0" && !menuIcon) {
        }

        return true;
    }
    function handlerAdd() {
        setMenuMasterDialogBox(true);
        setAction("Add");
        setDialogBoxTitle("Add Menu");

        clearForm();

        setMenuId(menuMasterData[menuMasterData.length - 1]?.M_ID + 1);
    }
    function handlerEdit(param) {
        setMenuMasterDialogBox(true);
        setAction("Edit");
        setDialogBoxTitle("Edit Menu");

        clearForm();

        setMenuId(() => param.row.M_ID);
        setMenuName(() => param.row.M_NAME || "");
        setMenuFormLink(() => param.row.M_FORM_LINK || "");
        setParentId(() => param.row.M_PARENT_ID || "");
        setHaveForm(() => param.row.M_HAVE_FORM);
        setMenuPrefix(() => param.row.M_PREFIX || "");
        setMenuOrder(() => param.row.M_ORDER || "");
        setMenuType(() => param.row.M_TYPE || "");
        setMenuShortCutKey(() => param.row.M_SHORT_KEY || "");
        setIsActive(() => param.row.M_IS_ACTIVE || true);
    }
    function handlerAddSubmit() {
        let url = "";
        if (action == "Add") {
            url = "/api/menu-master/add-menu";
        } else if (action == "Edit") {
            url = "/api/menu-master/edit-menu";
        }

        if (!validate()) return;

        FetchData("POST", url, {
            user_email: localStorage.getItem("email"),
            menuId: Number(menuId),
            menuName: menuName || null,
            menuFormLink: menuFormLink || null,
            parentId: parentId || null,
            haveForm: haveForm,
            menuPrefix: menuPrefix || null,
            menuOrder: menuOrder,
            menuIcon: menuIcon || null,
            menuType: menuType || null,
            menuShortCutKey: menuShortCutKey || null,
            isActive: Number(isActive),
        }).then((res) => {
            console.log(res);
            if (res?.isSuccess) {
                toast.success("Data added successfully");
                if (res.data?.menuMasterData) {
                    setMenuMasterData(res.data.menuMasterData);
                }
                if (action == "Add") {
                    clearForm();
                    setMenuId((old) => old + 1);
                    let firstField = document.getElementById("menu-master-id");
                    firstField.focus();
                    firstField.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "nearest",
                    });
                } else if (action == "Edit") {
                    clearForm();
                    setMenuMasterDialogBox(false);
                }
            } else {
                toast.error(res?.message || "Failed to add data");
            }
        });
    }
    function handlerCalcMenuOrder(haveForm, parentId) {
        if (haveForm == "1") {
            let menuOrder = GC?.menuMasterData?.filter((element) => {
                return element.M_HAVE_FORM == "1" && element.M_PARENT_ID == parentId;
            });

            console.log(menuOrder);

            if (!menuOrder.length) {
                setMenuOrder(1);
                return;
            }

            let maxMenuOrder = Math.max(...menuOrder.map((element) => element.M_ORDER));
            setMenuOrder(maxMenuOrder + 1);
        } else {
            console.log("Hello", haveForm);
            let menuOrder = GC?.menuMasterData?.filter((element) => {
                return element.M_HAVE_FORM == "0";
            });

            let maxMenuOrder = Math.max(...menuOrder.map((element) => element.M_ORDER));
            setMenuOrder(maxMenuOrder + 1);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            const focusedElement = document.activeElement;
            //console.log("Focused element ", focusedElement);
            if (focusedElement.classList.contains('submit')) {
                // Execute the submit handler
                handlerAddSubmit();
            } else if (focusedElement.classList.contains('cancel')) {
                // Click the "Cancel" button
                setMenuMasterDialogBox(false);
            } else if (focusedElement.classList.contains('clearForm')) {
                // Click the "Clear Form" button
                clearForm();
            } else {
                handlerAddSubmit();
            }
        }
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            <Title title1={"Menu Master"} title2={"Configuration"} />
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
                                field: "M_ID",
                                width: 50,
                                renderHeader: (param) => {
                                    return <div className="pl-2 font-[500]">ID</div>;
                                },
                                renderCell: (param) => {
                                    return (
                                        <div
                                            className="pl-2 cursor-pointer "
                                            onClick={() => handlerEdit(param)}
                                        >
                                            {param.formattedValue}
                                        </div>
                                    );
                                },
                            },
                            {
                                field: "M_NAME",
                                headerName: "Name",
                                flex: 1,
                                minWidth: 150,
                            },
                            {
                                field: "M_FORM_LINK",
                                headerName: "Form Link",
                                flex: 1,
                                minWidth: 150,
                            },
                            {
                                field: "M_PARENT_ID",
                                headerName: "Parent Id",
                                width: 100,
                            },
                            {
                                field: "M_ORDER",
                                headerName: "Menu Order",
                                width: 120,
                            },
                            {
                                field: "M_ICON",
                                headerName: "Menu Icon",
                                width: 120,
                            },
                            {
                                field: "M_TYPE",
                                headerName: "Menu Type",
                                flex: 1,
                                minWidth: 150,
                            },
                            {
                                field: "M_SHORT_KEY",
                                headerName: "Shortcut Key",
                                flex: 1,
                                minWidth: 150,
                            },
                            {
                                field: "M_PREFIX",
                                headerName: "Menu Prefix",
                                flex: 1,
                                minWidth: 150,
                            },
                            {
                                field: "M_HAVE_FORM",
                                headerName: "Have Form",
                                flex: 1,
                                minWidth: 150,
                                renderCell: (param) => {
                                    return (
                                        <div className="pl-2">
                                            {param.formattedValue ? "Yes" : "No"}
                                        </div>
                                    );
                                },
                            },
                            {
                                field: "M_IS_ACTIVE",
                                headerName: "Active",
                                flex: 1,
                                minWidth: 150,
                                renderCell: (param) => {
                                    return (
                                        <div className="pl-2">
                                            {param.formattedValue ? "Yes" : "No"}
                                        </div>
                                    );
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
                        rows={menuMasterData.map((element) => {
                            return {
                                id: element.M_ID,
                                ...element,
                            };
                        })}
                        setApiRef={setApiRef}
                    />
                </div>

                <DialogBox
                    state={menuMasterDialogBox}
                    setState={setMenuMasterDialogBox}
                    title1={DialogBoxTitle}
                    title2={"Menu Master"}
                >
                    <div
                        className="grid grid-cols-1 p-5 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3 max-h-[70vh] overflow-y-auto hide-scrollbar"
                        onKeyDown={handleKeyPress}
                    >
                        <TextFieldTopLabeled
                            label="Id"
                            placeholder="Auto Generated"
                            value={menuId}
                            onChange={(e) => setMenuId(e.target.value)}
                            disabled={true}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Menu Name"
                            placeholder="Enter"
                            required={true}
                            value={menuName}
                            id="menu-master-id"
                            onChange={(e) => setMenuName(e.target.value)}
                        ></TextFieldTopLabeled>
                        <SelectOptionTopLabeled
                            label="Have Form"
                            required={true}
                            value={haveForm}
                            onChange={(e) => {
                                setParentId("");
                                setMenuFormLink("");
                                setHaveForm(() => {
                                    handlerCalcMenuOrder(e.target.value);
                                    return e.target.value;
                                });
                            }}
                        >
                            <option className="text-black" value="1" selected={haveForm == 1}>
                                Yes
                            </option>
                            <option className="text-black" value="0" selected={haveForm == 0}>
                                No
                            </option>
                        </SelectOptionTopLabeled>
                        <TextFieldTopLabeled
                            label="Menu Form Link"
                            placeholder="Enter"
                            required={true}
                            value={menuFormLink}
                            onChange={(e) => setMenuFormLink(e.target.value)}
                            disabled={haveForm == "1" ? false : true}
                        ></TextFieldTopLabeled>

                        <TextFieldTopLabeled
                            label="Parent Id"
                            type="number"
                            required={true}
                            placeholder="Enter"
                            value={parentId}
                            onChange={(e) => {
                                setParentId(e.target.value);
                                handlerCalcMenuOrder(haveForm, e.target.value);
                            }}
                            disabled={haveForm == "1" ? false : true}
                        ></TextFieldTopLabeled>

                        <TextFieldTopLabeled
                            label="Menu Prefix"
                            placeholder="Enter"
                            value={menuPrefix}
                            onChange={(e) => setMenuPrefix(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Menu Order"
                            required={true}
                            disabled={true}
                            placeholder="Enter"
                            value={menuOrder}
                            onChange={(e) => setMenuOrder(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Menu Icon"
                            required={true}
                            placeholder="Enter"
                            value={menuIcon}
                            disabled={haveForm == "0" ? false : true}
                            onChange={(e) => setMenuIcon(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Menu Type"
                            placeholder="Enter"
                            value={menuType}
                            onChange={(e) => setMenuType(e.target.value)}
                        ></TextFieldTopLabeled>

                        <TextFieldTopLabeled
                            label="Menu ShortCut Key"
                            placeholder="Enter"
                            value={menuShortCutKey}
                            onChange={(e) => setMenuShortCutKey(e.target.value)}
                        ></TextFieldTopLabeled>

                        <CheckBoxTopLabeled
                            label="Is Active"
                            state={isActive}
                            setState={setIsActive}
                        />
                    </div>
                    <div className="flex justify-center gap-5 mt-5" onKeyDown={handleKeyPress}>
                        <div>
                            <CustomButton1
                                label={"Submit"}
                                className="submit text-white bg-first"
                                onClick={handlerAddSubmit}
                            />
                        </div>
                        <div>
                            <CustomButton1
                                label={"cancel"}
                                variant="outlined"
                                className="cancel text-first"
                                onClick={() => setMenuMasterDialogBox(false)}
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

export default MenuMaster;

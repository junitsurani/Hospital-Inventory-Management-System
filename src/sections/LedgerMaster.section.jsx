import * as React from "react";
import toast from "react-hot-toast";
import { useState, useEffect, useContext } from "react";
import MUIDataGrid from "../components/DataGridTables/MUIDataGrid";

import CustomButton1 from "../components/CustomButton1.component";
import Title from "../components/SectionComponents/Title.component";
import Controls2 from "../components/SectionComponents/Controls2.component";
import DialogBox from "../components/DialogBoxComponents/DialogBox.compoent";
import ButtonDelete from "../components/DataGridTables/ButtonDelete.compoent";
import CheckBoxTopLabeled from "../components/DialogBoxComponents/CheckBoxTopLabeled";
import TextFieldTopLabeled from "../components/DialogBoxComponents/TextFieldTopLabeled";
import FileUploadTopLabeled from "../components/DialogBoxComponents/FileUploadTopLabeled";

import { FetchData } from "../functions/FetchData.function";
import { GlobalContext } from "../global-context/GlobalContextComponent";

function LedgerMaster() {
    let GC = useContext(GlobalContext);

    // DilogBox states
    let [action, setAction] = useState("Add");
    let [DialogBoxTitle, setDialogBoxTitle] = useState("");
    let [ledgerMasterDialogBox, setLedgerMasterDialogBox] = useState(false);

    // FormData states
    let [lmParentId, setLmParentId] = useState("");
    let [lmDateOfExpiry, setLmDateOfExpiry] = useState("");
    let [lmLedgerId, setLmLedgerId] = useState(
        GC?.ledgerMasterData[GC?.ledgerMasterData.length - 1]?.LM_ID + 1 || ""
    );
    let [lmReferenceNo, setLmReferenceNo] = useState(
        GC?.ledgerMasterData[GC?.ledgerMasterData.length - 1]?.LM_REFERENCE_ID + 1 || ""
    );
    let [lmName, setLmName] = useState("");
    let [lmAlias, setLmAlias] = useState("");
    let [lmUnderId, setLmUnderId] = useState("");
    let [lmUnderName, setLmUnderName] = useState("");
    let [lmUnderNameField, setLmUnderNameField] = useState("");
    let [lmLinkId, setLmLinkId] = useState("");
    let [lmCrLimit, setLmCrLimit] = useState("");
    let [lmLogo, setLmLogo] = useState("");
    let [lmIsActive, setLmIsActive] = useState(true);
    let [lmAddress, setLmAddress] = useState("");
    let [lmCity, setLmCity] = useState("");
    let [lmArea, setLmArea] = useState("");
    let [lmPincode, setLmPincode] = useState("");
    let [lmPhoneNumber, setLmPhoneNumber] = useState("");
    let [lmMobileNumber, setLmMobileNumber] = useState("");
    let [lmWebsite, setLmWebsite] = useState("");
    let [lmAadharNumber, setLmAadharNumber] = useState("");
    let [lmPanNumber, setLmPanNumber] = useState("");
    let [lmGstNumber, setLmGstNumber] = useState("");
    let [lmOpeningBalance, setOpeningBalance] = useState("");
    let [lmDrCr, setLmDrCr] = useState("Dr");
    let [lmEmail, setLmEmail] = useState("");
    let [lmPassword, setLmPassword] = useState("");

    let [canEdit, setCanEdit] = useState(true);

    // Datagrid state
    let [apiRef, setApiRef] = useState();

    // Fetch City Data
    useEffect(function () {
        FetchData("POST", "/api/ledger-master/get-city-data").then((res) => {
            if (res?.isSuccess) {
                if (res.data?.cityData) {
                    GC.setCityData(res.data?.cityData);
                }
            } else {
                toast.error("Failed to load city data");
            }
        });
    }, []);

    function clearForm() {
        setLmParentId(() => "");
        setLmDateOfExpiry(() => "");
        setLmName(() => "");
        setLmAlias(() => "");
        setLmUnderId(() => "");
        setLmUnderName(() => "");
        setLmLinkId(() => "");
        setLmLogo(() => "");
        setLmIsActive(true);
        setLmAddress(() => "");
        setLmCity(() => "");
        setLmArea(() => "");
        setLmPincode(() => "");
        setLmPhoneNumber(() => "");
        setLmMobileNumber(() => "");
        setLmWebsite(() => "");
        setLmAadharNumber(() => "");
        setLmPanNumber(() => "");
        setLmGstNumber(() => "");
        setLmEmail(() => "");
        setLmPassword(() => "");
        setLmUnderNameField("");
    }
    function validate() {
        // Validate name
        if (!lmName) {
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

        // Validate alias
        // if (!lmAlias) {
        //     toast.error("Please enter alias");

        //     let field = document.querySelector("[data-label='Alias *']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // Validate under id
        if (!lmUnderId) {
            toast.error("Please select under name");

            let field = document.querySelector("[data-label='Under Name']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        } else {
            let valid = false;
            {
                GC?.accountGroupData?.forEach((element, index) => {
                    if (element.AG_ID) {
                        console.log(lmUnderId + "==========>" + lmUnderName)
                        if (element.AG_ID == lmUnderId && element.AG_NAME == lmUnderName) {
                            valid = true;
                        }
                    }
                });
            }

            if (!valid) {
                toast.error("Please select valid under id");

                let field = document.querySelector("[data-label='Under Name']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // Validate link id
        // if (!lmLinkId) {
        //     toast.error("Please enter link id");

        //     let field = document.querySelector("[data-label='Link Id *']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // if (!lmCrLimit) {
        //     toast.error("Please enter credit limit");

        //     let field = document.querySelector("[data-label='Cr Limit *']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });

        //     return;
        // }

        if (lmLogo.name) {
            if (lmLogo.size > 1000 * 1000) {
                toast.error("Logo size should be less than 1000KB");

                let field = document.querySelector("[data-label='Logo']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // Validate address
        // if (!lmAddress) {
        //     toast.error("Please enter address");

        //     let field = document.querySelector("[data-label='Address *']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // Validate city
        // if (!lmCity) {
        //     toast.error("Please select city");

        //     let field = document.querySelector("[data-label='City *']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        let city = lmCity.split(",")[0] || "-,-,-";
        let state = lmCity.split(",")[1] || "-";
        let country = lmCity.split(",")[2] || "-";
        if (!city || !state || !country) {
            toast.error("Please select the valid city");

            let field = document.querySelector("[data-label='City *']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        // Validate area
        // if (!lmArea) {
        //     toast.error("Please enter area");

        //     let field = document.querySelector("[data-label='Area *']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // Validate pincode
        // if (!lmPincode) {
        //     toast.error("Please enter pincode");

        //     let field = document.querySelector("[data-label='Pincode *']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }
        if (lmPincode) {
            if (String(lmPincode).length != 6) {
                toast.error("Please enter valid pincode");

                let field = document.querySelector("[data-label='Pincode']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // Validate phone number
        // if (!lmPhoneNumber) {
        //     toast.error("Please enter phone number");

        //     let field = document.querySelector("[data-label='Phone Number *']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }
        if (lmPhoneNumber) {
            if (String(lmPhoneNumber).length != 10) {
                toast.error("Please enter valid phone number");

                let field = document.querySelector("[data-label='Phone Number']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // Validate mobile number
        // if (!lmMobileNumber) {
        //     toast.error("Please enter mobile");

        //     let field = document.querySelector("[data-label='Mobile Number']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }
        if (lmMobileNumber) {
            if (String(lmMobileNumber).length != 10) {
                toast.error("Please enter valid mobile number");

                let field = document.querySelector("[data-label='Mobile Number']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // Validate email address
        // if (!lmEmail) {
        //     toast.error("Please enter Email Address");

        //     let field = document.querySelector("[data-label='Email Address']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // } else {
        //     if (!/[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z0-9.]{2,}/i.test(lmEmail)) {
        //         toast.error("Please enter valid Email");

        //         let field = document.querySelector("[data-label='Email Address']");
        //         field?.focus();
        //         field?.scrollIntoView({
        //             behavior: "smooth",
        //             block: "center",
        //             inline: "nearest",
        //         });
        //         return;
        //     }
        // }

        // Validate password
        // if (!lmPassword) {
        //     toast.error("Please enter Password");

        //     let field = document.querySelector("[data-label='Password']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // Validate website
        // if (!lmWebsite) {
        //     toast.error("Please enter website");

        //     let field = document.querySelector("[data-label='Website *']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

        // Validate Aadhar
        // if (!lmAadharNumber) {
        //     toast.error("Please enter Aadhar number");

        //     let field = document.querySelector("[data-label='Aadhar Number *']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }
        if (lmAadharNumber) {
            if (String(lmAadharNumber).length != 12) {
                toast.error("Please enter 12 digit Aadhar number");

                let field = document.querySelector("[data-label='Aadhar Number']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // Validate PAN Number
        // if (!lmPanNumber) {
        //     toast.error("Please enter PAN Number");

        //     let field = document.querySelector("[data-label='PAN Number *']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }
        if (lmPanNumber) {
            if (String(lmPanNumber).length != 10) {
                toast.error("Please enter 10 digit PAN number");

                let field = document.querySelector("[data-label='PAN Number']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // Validate GST Number
        // if (!lmGstNumber) {
        //     toast.error("Please enter GST Number");

        //     let field = document.querySelector("[data-label='GST Number *']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }
        if (lmGstNumber) {
            if (String(lmGstNumber).length != 15) {
                toast.error("Please enter 15 digit GST number");

                let field = document.querySelector("[data-label='GST Number *']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        if (lmOpeningBalance < 0) {
            toast.error("Please enter valid opening balance");

            let field = document.querySelector("[data-label='Opening Balance *']");
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
        setLedgerMasterDialogBox(true);
        setAction("Add");
        setDialogBoxTitle("Add Ledger Details");
        setCanEdit(true);
        clearForm();

        setLmLedgerId(GC?.ledgerMasterData[GC?.ledgerMasterData.length - 1]?.LM_ID + 1);
        setLmReferenceNo(
            GC?.ledgerMasterData[GC?.ledgerMasterData.length - 1]?.LM_REFERENCE_ID + 1
        );
    }
    function handlerEdit(param) {
        setLedgerMasterDialogBox(true);
        setAction("Edit");
        setDialogBoxTitle("Edit Ledger Details");
        if (param.row.LM_READ_ONLY === 0) {
            setCanEdit(false);
        } else {
            setCanEdit(true);
        }
        clearForm();

        setLmParentId(() => param.row.LM_PARENT_ID || "");
        setLmDateOfExpiry(() => param.row.LM_DOE || "");
        setLmLedgerId(() => param.row.LM_ID || "");
        setLmReferenceNo(() => param.row.LM_REFERENCE_ID || "");
        setLmName(() => param.row.LM_NAME || "");
        setLmAlias(() => param.row.LM_ALIAS || "");
        setLmUnderId(() => param.row.LM_UNDER_ID || "");
        setLmUnderName(() => param.row.LM_UNDER_NAME || "");
        setLmUnderId(()=> param.row.LM_UNDER_ID || "")
        setLmUnderNameField(()=> (param.row.LM_UNDER_ID + ' - ' + param.row.LM_UNDER_NAME));
        setLmLinkId(() => param.row.LINK_ID || "");
        setLmLogo(() => param.row.LM_LOGO || "");
        setLmIsActive(() => param.row.IS_ACTIVE || "");
        setLmAddress(() => param.row.LM_ADDRESS || "");
        setLmCity(
            () =>
                `${param.row.LM_CITY || ""}, ${param.row.LM_STATE || ""}, ${
                    param.row.LM_COUNTRY || ""
                }`
        );
        setLmArea(() => param.row.LM_AREA || "");
        setLmPincode(() => param.row.LM_PINCODE || "");
        setLmPhoneNumber(() => param.row.LM_PHONE || "");
        setLmMobileNumber(() => param.row.LM_MOBILE || "");
        setLmWebsite(() => param.row.LM_WEBSITE || "");
        setLmAadharNumber(() => param.row.LM_AADHAR_NO || "");
        setLmPanNumber(() => param.row.LM_PAN_CARD_NO || "");
        setLmGstNumber(() => param.row.LM_GST_NO || "");
        setLmEmail(() => param.row.LM_EMAIL || "");
        setLmPassword(() => param.row.LM_PASSWORD || "");
    }
    function handlerDelete(param) {
        console.log(param.row.LM_ID);

        FetchData("POST", "/api/ledger-master/delete-row", {
            LM_ID: param.row.LM_ID,
        }).then((res) => {
            console.log(res);
            if (!res) return;
            if (res.isSuccess) {
                toast.success(res.message || "Row deleted");
                if (res.data?.ledgerMasterData) {
                    GC?.setLedgerMasterData(res.data?.ledgerMasterData);
                }
            } else {
                toast.error(res?.message || "Failed to delete row");
            }
        });
    }
    async function handlerSumit() {
        let url = "";
        if (action == "Add") {
            url = "/api/ledger-master/add-ledger-data";
        } else if (action == "Edit") {
            url = "/api/ledger-master/edit-ledger-data";
        }

        if (!validate()) return;

        let fileUrl;
        if (lmLogo.name) {
            let formData = new FormData();
            formData.append("file", lmLogo);
            formData.append("fileName", "viral.png");
            let responce = await fetch(process.env.REACT_APP_BASEURL + "/api/upload", {
                method: "POST",
                body: formData,
            });

            let res = await responce.json();
            fileUrl = res.data.fileUrl;
            if (fileUrl) {
                toast.success("Logo uploaded successfully");
            } else {
                toast.error("Failed to upload logo");
            }
        }

        FetchData("POST", url, {
            user_email: localStorage.getItem("email") || null,
            lmParentId: Number(lmParentId) || null,
            lmDateOfExpiry: lmDateOfExpiry || null,
            lmLedgerId: Number(lmLedgerId) || null,
            lmReferenceNo: Number(lmReferenceNo),
            lmName: lmName || null,
            lmAlias: lmAlias || null,
            lmUnderId: lmUnderId || null,
            lmUnderName: lmUnderName || null,
            lmLinkId: lmLinkId || null,
            lmCrLimit: lmCrLimit || null,
            lmLogo: fileUrl || lmLogo || null,
            lmIsActive: Number(lmIsActive),
            lmAddress: lmAddress || null,
            lmCity: lmCity || null,
            lmArea: lmArea || null,
            lmPincode: lmPincode || null,
            lmPhoneNumber: lmPhoneNumber || null,
            lmMobileNumber: lmMobileNumber || null,
            lmWebsite: lmWebsite || null,
            lmAadharNumber: lmAadharNumber || null,
            lmPanNumber: lmPanNumber || null,
            lmGstNumber: lmGstNumber || null,
            lmOpeningBalance: lmOpeningBalance || null,
            lmDrCr: lmDrCr || null,
            lmEmail: lmEmail || null,
            lmPassword: lmPassword || null,
            lmIsView: 1,
            lmReadOnly: 1,
        }).then((res) => {
            console.log(res);
            if (!res) return;
            if (res.isSuccess) {
                toast.success(res.message || "Data added successfully");
                if (res.data?.ledgerMasterData) {
                    GC?.setLedgerMasterData(res.data?.ledgerMasterData);
                }
                if (action == "Add") {
                    clearForm();
                    setLmLedgerId((old) => old + 1);
                    setLmReferenceNo((old) => old + 1);
                    let firstField = document.getElementById("ledger-master-id");
                    firstField.focus();
                    firstField.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                        inline: "nearest",
                    });
                } else if (action == "Edit") {
                    clearForm();
                    setLedgerMasterDialogBox(false);
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
                handlerSumit();
            } else if (focusedElement.classList.contains('cancel')) {
                // Click the "Cancel" button
                setLedgerMasterDialogBox(false);
            } else if (focusedElement.classList.contains('clearForm')) {
                // Click the "Clear Form" button
                clearForm();
            } else {
                handlerSumit();
            }
        }
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            <Title title1={"Ledger Master"} title2={"Configuration"} />
            <div className="p-3 mt-2 bg-white rounded grow">
                <div className="p-2 mt-3 rounded bg-second">
                    <div className="p-1">
                        <Controls2 onClick1={handlerAdd} apiRef={apiRef} />
                    </div>
                </div>

                <div className="mt-5 w-[100%]">
                    <MUIDataGrid
                        columns={[
                            {
                                field: "LM_ID",
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
                                field: "LM_REFERENCE_ID",
                                headerName: "Reference Id",
                                width: 110,
                            },
                            {
                                field: "LM_NAME",
                                headerName: "Name",
                                flex: 1,
                                minWidth: 150,
                            },
                            {
                                field: "LM_UNDER_ID",
                                headerName: "Under Id",
                                width: 100,
                            },
                            {
                                field: "LM_UNDER_NAME",
                                headerName: "Under Name",
                                flex: 1,
                                minWidth: 150,
                            },
                            {
                                field: "LM_MOBILE",
                                headerName: "Mobile",
                                flex: 1,
                                minWidth: 150,
                            },
                            {
                                field: "LM_EMAIL",
                                headerName: "Email",
                                flex: 1,
                                minWidth: 200,
                            },
                            {
                                field: "LM_CITY",
                                headerName: "City",
                                width: 120,
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
                                headerName: "Updated AT",
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
                            {
                                renderCell: (param) => (
                                    <div className="flex gap-3">
                                        <ButtonDelete onClick={() => handlerDelete(param)} />
                                    </div>
                                ),
                                headerName: "Action",
                                flex: 1,
                                minWidth: 150,
                            },
                        ]}
                        rows={GC.ledgerMasterData.map((element, index) => {
                            return {
                                id: element.LM_ID,
                                PARENT_NAME: element.LM_PARENT_ID,
                                ...element,
                            };
                        })}
                        setApiRef={setApiRef}
                    />
                </div>

                <DialogBox
                    state={ledgerMasterDialogBox}
                    setState={setLedgerMasterDialogBox}
                    title1={DialogBoxTitle}
                    title2={"Ledger Master"}
                >
                    <div
                        className="grid grid-cols-1 p-5 gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-4 max-h-[77vh] overflow-y-auto hide-scrollbar"
                        onKeyDown={handleKeyPress}
                    >
                        <TextFieldTopLabeled
                            label="Ledger Id"
                            placeholder="Auto Generated"
                            value={lmLedgerId}
                            onChange={(e) => setLmLedgerId(e.target.value)}
                            disabled={true}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Reference No"
                            placeholder="Auto Generated"
                            value={lmReferenceNo}
                            onChange={(e) => setLmReferenceNo(e.target.value)}
                            disabled={true}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Link Id"
                            placeholder="Enter"
                            value={lmLinkId}
                            onChange={(e) => setLmLinkId(e.target.value)}
                        ></TextFieldTopLabeled>
                        <FileUploadTopLabeled
                            label="Logo"
                            // value={lmLogo}
                            files={lmLogo}
                            onChange={(e) => setLmLogo(e.target.files[0])}
                            accept="image/*"
                        ></FileUploadTopLabeled>
                        <TextFieldTopLabeled
                            label="Name"
                            placeholder="Enter"
                            required={true}
                            value={lmName}
                            onChange={(e) => setLmName(e.target.value)}
                            id="ledger-master-id"
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Alias"
                            placeholder="Enter"
                            value={lmAlias}
                            onChange={(e) => setLmAlias(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Under Name"
                            placeholder="Select"
                            required={true}
                            value={lmUnderNameField}
                            onChange={(e) => {
                                // setLmUnderName(e.target.value);

                                let element = document.querySelector(
                                    `#Under-Name [value="${e.target.value}"]`
                                );
                                let agId = element?.getAttribute("data-agid");
                                setLmUnderId(agId);
                                let agName = element?.getAttribute("data-agname");
                                setLmUnderName(agName);
                                setLmUnderNameField(e.target.value);
                            }}
                            list={"Under-Name"}>
                            <datalist id="Under-Name" className="bg-white">
                                {GC?.accountGroupData.map((element, index) => {
                                    if (element.AG_NAME) {
                                        return (
                                            <option
                                                key={index}
                                                className="text-black"
                                                value={element.AG_ID + "- " +element.AG_NAME}
                                                data-agid={element.AG_ID}
                                                data-agname={element.AG_NAME}
                                            ></option>
                                        );
                                    }
                                })}
                            </datalist>
                        </TextFieldTopLabeled>

                        <TextFieldTopLabeled
                            label="Cr Limit"
                            placeholder="Enter"
                            type="number"
                            value={lmCrLimit}
                            onChange={(e) => setLmCrLimit(e.target.value)}
                        ></TextFieldTopLabeled>

                        <div className="col-span-1 mt-3 mb-2 font-bold md:col-span-2 lg:col-span-3 xl:lg:col-span-4">
                            Comapny Contact Details
                        </div>
                        <TextFieldTopLabeled
                            label="Address"
                            placeholder="Enter"
                            value={lmAddress}
                            onChange={(e) => setLmAddress(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="City"
                            value={lmCity}
                            onChange={(e) => setLmCity(e.target.value)}
                            list={"cityData"}
                        >
                            <datalist id="cityData" className="bg-white">
                                {GC?.cityData?.map((element, index) => {
                                    if (element.CITY) {
                                        return (
                                            <option
                                                key={index}
                                                className="text-black"
                                                value={
                                                    element.CITY +
                                                    ", " +
                                                    element.STATE +
                                                    ", " +
                                                    element.COUNTRY
                                                }
                                            >
                                                {element.CITY +
                                                    ", " +
                                                    element.STATE +
                                                    ", " +
                                                    element.COUNTRY}
                                            </option>
                                        );
                                    }
                                })}
                            </datalist>
                        </TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Area"
                            placeholder="Enter"
                            value={lmArea}
                            onChange={(e) => setLmArea(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Pincode"
                            placeholder="Enter"
                            type={"number"}
                            value={lmPincode}
                            onChange={(e) => setLmPincode(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Phone Number"
                            type="number"
                            placeholder="Enter"
                            value={lmPhoneNumber}
                            onChange={(e) => setLmPhoneNumber(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Mobile Number"
                            type="number"
                            placeholder="Enter"
                            value={lmMobileNumber}
                            onChange={(e) => setLmMobileNumber(e.target.value)}
                        ></TextFieldTopLabeled>

                        <TextFieldTopLabeled
                            label="Website"
                            placeholder="Enter"
                            value={lmWebsite}
                            onChange={(e) => setLmWebsite(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Email Address"
                            placeholder="Enter"
                            value={lmEmail}
                            onChange={(e) => setLmEmail(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Password"
                            type="password"
                            placeholder="Enter"
                            value={lmPassword}
                            onChange={(e) => setLmPassword(e.target.value)}
                        ></TextFieldTopLabeled>
                        <CheckBoxTopLabeled
                            label="Is Active"
                            state={lmIsActive}
                            setState={setLmIsActive}
                        />

                        <div className="col-span-1 mt-3 mb-2 font-bold md:col-span-2 lg:col-span-3 xl:lg:col-span-4">
                            Tax Information
                        </div>
                        <TextFieldTopLabeled
                            label="Aadhar Number"
                            type={"number"}
                            placeholder="Enter"
                            value={lmAadharNumber}
                            onChange={(e) => setLmAadharNumber(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="PAN Number"
                            placeholder="Enter"
                            value={lmPanNumber}
                            onChange={(e) => setLmPanNumber(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="GST Number"
                            placeholder="Enter"
                            value={lmGstNumber}
                            onChange={(e) => setLmGstNumber(e.target.value)}
                        ></TextFieldTopLabeled>
                        <div>
                            <label className="flex flex-col gap-1 text-xs grow shrink">
                                <div>Opening Balance</div>
                                <div className="flex gap-1">
                                    <input
                                        type="number"
                                        className={`p-2 text-xs border rounded grow placeholder:text-xs focus:border-first`}
                                        placeholder={"Enter"}
                                        data-label={"Opening Balance *"}
                                        value={lmOpeningBalance}
                                        onChange={(e) => setOpeningBalance(e.target.value)}
                                    />
                                    <select
                                        name=""
                                        id=""
                                        className={`outline-none p-2 text-xs border rounded grow placeholder:text-xs focus:border-first`}
                                        value={lmDrCr}
                                        onChange={(e) => setLmDrCr(e.target.value)}
                                    >
                                        <option value="Dr">DR</option>
                                        <option value="Cr">CR</option>
                                    </select>
                                </div>
                            </label>
                        </div>

                        {/* <div className="col-span-1 mt-5 mb-3 font-bold md:col-span-2 lg:col-span-3 xl:lg:col-span-4">
                            Login Information
                        </div> */}
                    </div>
                    <div className="flex justify-center gap-5 mt-5" onKeyDown={handleKeyPress}>
                        {canEdit ? (
                            <div>
                                <CustomButton1
                                    label={"Submit"}
                                    className="submit text-white bg-first"
                                    onClick={handlerSumit}
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                        <div>
                            <CustomButton1
                                label={"cancel"}
                                variant="outlined"
                                className="cancel text-first"
                                onClick={() => setLedgerMasterDialogBox(false)}
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

export default LedgerMaster;

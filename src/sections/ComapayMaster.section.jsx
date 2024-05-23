import * as React from "react";
import toast from "react-hot-toast";
import { useState, useEffect, useContext } from "react";
import MUIDataGrid from "../components/DataGridTables/MUIDataGrid";

import Title from "../components/SectionComponents/Title.component";
import CustomButton1 from "../components/CustomButton1.component";
import DialogBox from "../components/DialogBoxComponents/DialogBox.compoent";
import Controls2 from "../components/SectionComponents/Controls2.component";
import TextFieldTopLabeled from "../components/DialogBoxComponents/TextFieldTopLabeled";
import CheckBoxTopLabeled from "../components/DialogBoxComponents/CheckBoxTopLabeled";
import DateTopLabeled from "../components/DialogBoxComponents/DateTopLabeled";
import FileUploadTopLabeled from "../components/DialogBoxComponents/FileUploadTopLabeled";

import { GlobalContext } from "../global-context/GlobalContextComponent";
import { FetchData } from "../functions/FetchData.function";

function ComapanyMaster() {
    let GC = useContext(GlobalContext);

    // DilogBox states
    let [action, setAction] = useState("Add");
    let [DialogBoxTitle, setDialogBoxTitle] = useState("");
    let [ledgerMasterDialogBox, setLedgerMasterDialogBox] = useState(false);

    // FormData states
    let [lmParentId, setLmParentId] = useState("");
    let [lmDateOfExpiry, setLmDateOfExpiry] = useState("");
    let [lmLedgerId, setLmLedgerId] = useState(
        GC?.ledgerMasterData[GC?.ledgerMasterData?.length - 1]?.LM_ID + 1 || ""
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
    let [lmEmail, setLmEmail] = useState("");
    let [lmPassword, setLmPassword] = useState("");

    let [companyMasters, setCompanyMasters] = useState([]);

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

        var l = GC?.ledgerMasterData.filter((item) => {
            return item.LM_IS_VIEW === 0 && item.LM_READ_ONLY === 0;
        });

        setCompanyMasters(l);
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
        setLmUnderNameField("");
        setLmPassword(() => "");
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

        // Validate parent id
        // if (!lmParentId) {
        //     toast.error("Please select parent id");

        //     let field = document.querySelector("[data-label='Parent Id']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // } else {
        //     let LM_ID_ARRAY = GC?.ledgerMasterData?.map((element, index) => element.LM_ID);

        //     if (!LM_ID_ARRAY.includes(Number(lmParentId))) {
        //         toast.error("Please select valid parent id");

        //         let field = document.querySelector("[data-label='Parent Id *']");
        //         field?.focus();
        //         field?.scrollIntoView({
        //             behavior: "smooth",
        //             block: "center",
        //             inline: "nearest",
        //         });
        //         return;
        //     }
        // }

        // Validate date of expiry
        // if (!lmDateOfExpiry) {
        //     toast.error("Please select date of expiry");

        //     let field = document.querySelector("[data-label='Date of Expiry *']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // } else {
        //     let date = new Date(lmDateOfExpiry);
        //     if (date < new Date()) {
        //         toast.error("Date of expiry should be greater than today's date");
        //         let field = document.querySelector("[data-label='Date of Expiry *']");
        //         field?.focus();
        //         field?.scrollIntoView({
        //             behavior: "smooth",
        //             block: "center",
        //             inline: "nearest",
        //         });
        //         return;
        //     }
        // }

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

        // if (lmLogo.name) {
        //     if (lmLogo.size > 1000 * 1000) {
        //         toast.error("Logo size should be less than 1000KB");

        //         let field = document.querySelector("[data-label='Logo']");
        //         field?.focus();
        //         field?.scrollIntoView({
        //             behavior: "smooth",
        //             block: "center",
        //             inline: "nearest",
        //         });
        //         return;
        //     }
        // }

        // Validate address
        if (!lmAddress) {
            toast.error("Please enter address");

            let field = document.querySelector("[data-label='Address']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        // Validate city
        if (!lmCity) {
            toast.error("Please select city");

            let field = document.querySelector("[data-label='City']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        }

        let city = lmCity.split(",")[0];
        let state = lmCity.split(",")[1];
        let country = lmCity.split(",")[2];
        if (!city || !state || !country) {
            toast.error("Please select the valid city");

            let field = document.querySelector("[data-label='City']");
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

        //     let field = document.querySelector("[data-label='Area']");
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

        //     let field = document.querySelector("[data-label='Pincode']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // } else {
        //     if (String(lmPincode).length != 6) {
        //         toast.error("Please enter valid pincode");

        //         let field = document.querySelector("[data-label='Pincode']");
        //         field?.focus();
        //         field?.scrollIntoView({
        //             behavior: "smooth",
        //             block: "center",
        //             inline: "nearest",
        //         });
        //         return;
        //     }
        // }

        // Validate phone number
        // if (!lmPhoneNumber) {
        //     toast.error("Please enter phone number");

        //     let field = document.querySelector("[data-label='Phone Number']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // } else {
        //     if (String(lmPhoneNumber).length != 10) {
        //         toast.error("Please enter valid phone number");

        //         let field = document.querySelector("[data-label='Phone Number']");
        //         field?.focus();
        //         field?.scrollIntoView({
        //             behavior: "smooth",
        //             block: "center",
        //             inline: "nearest",
        //         });
        //         return;
        //     }
        // }

        // Validate mobile number
        if (!lmMobileNumber) {
            toast.error("Please enter mobile");

            let field = document.querySelector("[data-label='Mobile Number']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        } else {
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

        // Validate website
        // if (!lmWebsite) {
        //     toast.error("Please enter website");

        //     let field = document.querySelector("[data-label='Website']");
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

        //     let field = document.querySelector("[data-label='Aadhar Number']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // } else {
        //     if (String(lmAadharNumber).length != 12) {
        //         toast.error("Please enter valid Aadhar number");

        //         let field = document.querySelector("[data-label='Aadhar Number']");
        //         field?.focus();
        //         field?.scrollIntoView({
        //             behavior: "smooth",
        //             block: "center",
        //             inline: "nearest",
        //         });
        //         return;
        //     }
        // }

        // Validate PAN Number
        // if (!lmPanNumber) {
        //     toast.error("Please enter PAN Number");

        //     let field = document.querySelector("[data-label='PAN Number']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // } else {
        //     if (String(lmPanNumber).length != 10) {
        //         toast.error("Please enter valid PAN number");

        //         let field = document.querySelector("[data-label='PAN Number']");
        //         field?.focus();
        //         field?.scrollIntoView({
        //             behavior: "smooth",
        //             block: "center",
        //             inline: "nearest",
        //         });
        //         return;
        //     }
        // }

        // Validate GST Number
        // if (!lmGstNumber) {
        //     toast.error("Please enter GST Number");

        //     let field = document.querySelector("[data-label='GST Number']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // } else {
        //     if (String(lmGstNumber).length != 15) {
        //         toast.error("Please enter valid GST number");

        //         let field = document.querySelector("[data-label='GST Number']");
        //         field?.focus();
        //         field?.scrollIntoView({
        //             behavior: "smooth",
        //             block: "center",
        //             inline: "nearest",
        //         });
        //         return;
        //     }
        // }

        // Validate email address
        if (!lmEmail) {
            toast.error("Please enter Email Address");

            let field = document.querySelector("[data-label='Email Address']");
            field?.focus();
            field?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest",
            });
            return;
        } else {
            if (!/[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z0-9.]{2,}/i.test(lmEmail)) {
                toast.error("Please enter valid Email");

                let field = document.querySelector("[data-label='Email Address']");
                field?.focus();
                field?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest",
                });
                return;
            }
        }

        // Validate password
        if (!lmPassword) {
            toast.error("Please enter Password");

            let field = document.querySelector("[data-label='Password']");
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
        clearForm();

        setLedgerMasterDialogBox(true);
        setAction("Add");
        setDialogBoxTitle("Add Company Master Details");

        setLmLedgerId(GC?.ledgerMasterData[GC?.ledgerMasterData.length - 1]?.LM_ID + 1 || 1);
        setLmReferenceNo(
            GC?.ledgerMasterData[GC?.ledgerMasterData.length - 1]?.LM_REFERENCE_ID + 1 || 1
        );
    }
    function handlerEdit(param) {
        setLedgerMasterDialogBox(() => true);
        setAction("Edit");
        setDialogBoxTitle("Edit Company Master Details");

        clearForm();

        setLmParentId(() => param.row.LM_PARENT_ID || "");
        setLmDateOfExpiry(() => param.row.LM_DOE || "");
        setLmLedgerId(() => param.row.LM_ID || "");
        setLmReferenceNo(() => param.row.LM_REFERENCE_ID || "");
        setLmName(() => param.row.LM_NAME || "");
        setLmAlias(() => param.row.LM_ALIAS || "");
        setLmUnderId(() => param.row.LM_UNDER_ID || "");
        setLmUnderName(() => param.row.LM_UNDER_NAME || "");
        setLmUnderNameField(() => (param.row.LM_UNDER_ID + ' - ' + param.row.LM_UNDER_NAME));
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
            lmEmail: lmEmail || null,
            lmPassword: lmPassword || null,
            lmIsView: 0,
            lmReadOnly: 0,
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
                    let field = document.querySelector("[data-label='Name']");
                    field.focus();
                    field.scrollIntoView({
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
            <Title title1={"Company Master"} title2={"Configuration"} />
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
                                field: "LM_NAME",
                                headerName: "Name",
                                width: 140,
                            },
                            {
                                field: "PARENT_NAME",
                                headerName: "Parent Name",
                                width: 130,
                            },
                            {
                                field: "LM_DOE",
                                headerName: "Date of Expiry",
                                width: 120,
                            },
                            {
                                field: "IS_ACTIVE",
                                headerName: "Active",
                                flex: 1,
                                minWidth: 80,
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
                                minWidth: 180,
                            },
                            {
                                field: "CREATED_AT",
                                headerName: "Created At",
                                flex: 1,
                                minWidth: 130,
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
                                minWidth: 180,
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
                        ]}
                        rows={companyMasters.map((element, index) => {
                            let parentName = "";
                            let parentIdsArray = [];
                            if (element.LM_PARENT_ID) {
                                parentIdsArray = companyMasters.filter((e) => {
                                    if (e.LM_ID == element.LM_PARENT_ID) {
                                        return e;
                                    }
                                });
                            }

                            if (parentIdsArray.length) {
                                parentName = parentIdsArray[0].LM_NAME;
                            }

                            return {
                                id: element.LM_ID,
                                PARENT_NAME: parentName,
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
                        {/* <div className="col-span-1 my-3 font-bold md:col-span-2 lg:col-span-3 xl:lg:col-span-4">
                            Company Details
                        </div> */}

                        {/* <div className="col-span-1 my-3 border-t-2 border-dotted md:col-span-2 lg:col-span-3 xl:lg:col-span-4"></div> */}

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
                        <FileUploadTopLabeled
                            label="Logo"
                            // value={lmLogo}
                            files={lmLogo}
                            onChange={(e) => setLmLogo(e.target.files[0])}
                            accept="image/*"
                        ></FileUploadTopLabeled>
                        <DateTopLabeled
                            label="Date of Expiry"
                            placeholder="Enter"
                            value={lmDateOfExpiry}
                            onChange={(e) => {
                                setLmDateOfExpiry(e.target.value);
                            }}
                        ></DateTopLabeled>
                        <TextFieldTopLabeled
                            label="Name"
                            placeholder="Enter"
                            required={true}
                            value={lmName}
                            onChange={(e) => setLmName(e.target.value)}
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
                                let element = document.querySelector(
                                    `#Under-Name [value="${e.target.value}"]`
                                );
                                let agId = element?.getAttribute("data-agid");
                                setLmUnderId(agId);
                                let agName = element?.getAttribute("data-agname");
                                setLmUnderName(agName);
                                setLmUnderNameField(e.target.value);
                            }}
                            list={"Under-Name"}
                        >
                            <datalist id="Under-Name" className="bg-white">
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
                            label="Parent Id"
                            value={lmParentId}
                            placeholder="Select"
                            onChange={(e) => setLmParentId(e.target.value)}
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

                        {/* <TextFieldTopLabeled
                            label="Link Id *"
                            placeholder="Enter"
                            value={lmLinkId}
                            onChange={(e) => setLmLinkId(e.target.value)}
                        ></TextFieldTopLabeled> */}

                        <div className="col-span-1 mt-3 mb-2 font-bold md:col-span-2 lg:col-span-3 xl:lg:col-span-4">
                            Comapny Contact Details
                        </div>
                        <TextFieldTopLabeled
                            label="Address"
                            required={true}
                            placeholder="Enter"
                            value={lmAddress}
                            onChange={(e) => setLmAddress(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="City"
                            value={lmCity}
                            required={true}
                            onChange={(e) => setLmCity(e.target.value)}
                            list={"city-data"}
                            placeholder="Select"
                        >
                            <datalist id="city-data" className="bg-white">
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
                                            ></option>
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
                            required={true}
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
                            required={true}
                            onChange={(e) => setLmEmail(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Password"
                            type="password"
                            placeholder="Enter"
                            required={true}
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
                            onkeypress={handleKeyPress}
                            onChange={(e) => setLmAadharNumber(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="PAN Number"
                            placeholder="Enter"
                            value={lmPanNumber}
                            onkeypress={handleKeyPress}
                            onChange={(e) => setLmPanNumber(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="GST Number"
                            placeholder="Enter"
                            value={lmGstNumber}
                            onkeypress={handleKeyPress}
                            onChange={(e) => setLmGstNumber(e.target.value)}
                        ></TextFieldTopLabeled>

                        {/* <div className="col-span-1 mt-5 mb-3 font-bold md:col-span-2 lg:col-span-3 xl:lg:col-span-4">
                            Login Information
                        </div> */}
                    </div>
                    <div className="flex justify-center gap-5 mt-5" onKeyDown={handleKeyPress}
>
                        <div>
                            <CustomButton1
                                label={"Submit"}
                                className="submit text-white bg-first"
                                onClick={handlerSumit}
                            />
                        </div>
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

export default ComapanyMaster;

import * as React from "react";
import toast from "react-hot-toast";
import { useState, useEffect, useContext } from "react";
import MUIDataGrid from "../components/DataGridTables/MUIDataGrid";

import CustomButton1 from "../components/CustomButton1.component";
import Title from "../components/SectionComponents/Title.component";
import Controls2 from "../components/SectionComponents/Controls2.component";
import DateTopLabeled from "../components/DialogBoxComponents/DateTopLabeled";
import CheckBox from "../components/DialogBoxComponents/CheckBox";
import DialogBox from "../components/DialogBoxComponents/DialogBox.compoent";
import ButtonDelete from "../components/DataGridTables/ButtonDelete.compoent";
import CheckBoxTopLabeled from "../components/DialogBoxComponents/CheckBoxTopLabeled";
import TextFieldTopLabeled from "../components/DialogBoxComponents/TextFieldTopLabeled";
import FileUploadTopLabeled from "../components/DialogBoxComponents/FileUploadTopLabeled";

import { FetchData } from "../functions/FetchData.function";
import { GlobalContext } from "../global-context/GlobalContextComponent";

function PatientRegistration() {
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
    let [lmRegCharge, setLmRegCharge] = useState("");
    let [lmNarration, setLmNarration] = useState("");



    let [lmPhone, setLmPhone] = useState("");
    let [lmMobile, setLmMobile] = useState("");
    let [lmAlias, setLmAlias] = useState("");
    let [lmUnderId, setLmUnderId] = useState("");
    let [lmUnderName, setLmUnderName] = useState("");
    let [lmUnderNameField, setLmUnderNameField] = useState("");
    let [lmLinkId, setLmLinkId] = useState("");
    let [lmCrLimit, setLmCrLimit] = useState("");
    let [prmDate, setPrmDate] = useState("");
    let [age, setAge] = useState(''); // State for age in years
    let [monthDiff, setMonthDiff] = useState(''); // State for difference in months
    let [dayDiff, setDayDiff] = useState(''); // State for difference in days

    let [pmOPDType, setPmOPDType] = useState("O");
    let [pmOldCaseType, setOldCaseType] = useState("No");
    let [pmGenderType, setGenderType] = useState("M");
    let [pmMstatusType, setMstatusType] = useState("Married");
    let [pmTitle, setPmTitle] = useState("");
    let [pmTPAType, setPmTPAType] = useState("");
    let [pmRFAType, setRFAType] = useState("");
    let [pmCdocType, setPmCdocType] = useState("");
    let [lmLogo, setLmLogo] = useState("");
    let [lmIsActive, setLmIsActive] = useState(true);
    let [lmAddress, setLmAddress] = useState("");
    let [lmSearch, setLmSearch] = useState("");
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


    const [isChecked, setIsChecked] = useState(false);
    const [isCheckedMLC, setIsCheckedMLC] = useState(false);
    const [dateTime, setDateTime] = useState("");


    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };

    const handleCheckboxMLC = () => {
      setIsCheckedMLC(!isCheckedMLC);
    };

    const handleDateChange = (newDateStr) => {
        const [day, month, year] = newDateStr.split('/'); // Assuming date format is "dd/mm/yyyy"
        const newDate = new Date(`${year}-${month}-${day}`); // Create Date object from parsed parts
        setPrmDate(newDateStr); // Update selected date state
    
        const dobDate = new Date(newDate);
        const today = new Date();
    
        // Calculate age difference in years
        const ageDiff = today.getFullYear() - dobDate.getFullYear();
    
        // Calculate month difference
        let monthDiff = today.getMonth() - dobDate.getMonth() + 12 * (today.getFullYear() - dobDate.getFullYear());
        if (today.getDate() < dobDate.getDate()) {
            monthDiff--; // Adjust months if today's date is earlier in the month
        }
    
        // Calculate day difference
        const oneDay = 1000 * 60 * 60 * 24;
        const dayDiff = Math.floor((today - dobDate) / oneDay);
    
        // Update state with calculated values (convert to string to avoid displaying NaN)
        setAge(ageDiff.toString());
        setMonthDiff(monthDiff.toString());
        setDayDiff(dayDiff.toString());
    };
   




    // Fetch City Data
    // useEffect(function () {
    //     FetchData("POST", "/api/ledger-master/get-city-data").then((res) => {
    //         if (res?.isSuccess) {
    //             if (res.data?.cityData) {
    //                 GC.setCityData(res.data?.cityData);
    //             }
    //         } else {
    //             toast.error("Failed to load city data");
    //         }
    //     });
    // }, []);

    useEffect(() => {

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
    
        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);

        
      }, []); // Run only once after the component is mounted
    

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
        // if (!lmUnderId) {
        //     toast.error("Please select under name");

        //     let field = document.querySelector("[data-label='Under Name']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // } else {
        //     let valid = false;
        //     {
        //         GC?.accountGroupData?.forEach((element, index) => {
        //             if (element.AG_ID) {
        //                 console.log(lmUnderId + "==========>" + lmUnderName)
        //                 if (element.AG_ID == lmUnderId && element.AG_NAME == lmUnderName) {
        //                     valid = true;
        //                 }
        //             }
        //         });
        //     }

        //     if (!valid) {
        //         toast.error("Please select valid under id");

        //         let field = document.querySelector("[data-label='Under Name']");
        //         field?.focus();
        //         field?.scrollIntoView({
        //             behavior: "smooth",
        //             block: "center",
        //             inline: "nearest",
        //         });
        //         return;
        //     }
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

       
        // let city = lmCity.split(",")[0] || "-,-,-";
        // let state = lmCity.split(",")[1] || "-";
        // let country = lmCity.split(",")[2] || "-";
        // if (!city || !state || !country) {
        //     toast.error("Please select the valid city");

        //     let field = document.querySelector("[data-label='City *']");
        //     field?.focus();
        //     field?.scrollIntoView({
        //         behavior: "smooth",
        //         block: "center",
        //         inline: "nearest",
        //     });
        //     return;
        // }

      
     
        // if (lmPincode) {
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
        setDialogBoxTitle("Add Patient Details");
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
            <Title title1={"Patient Registration"} title2={"Configuration"} />
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
                    title2={"Patient Registration"}
                >
                    <div
                        className="grid grid-cols-1 p-0.4 gap-x-10 gap-y-1 md:grid-cols-1 lg:grid-cols-5 xl:lg:grid-cols-5 max-h-[30vh] overflow-y-auto hide-scrollbar"
                        onKeyDown={handleKeyPress}>
                       
                        <input
                            type="text"
                            value={dateTime}
                            readOnly>
                        </input>
                          
                        <TextFieldTopLabeled
                            label="Patient Id"
                            placeholder="Auto Generated"
                            className="w-[5px]"
                            minWidth='5px'
                            value={lmLedgerId}
                            onChange={(e) => setLmLedgerId(e.target.value)}
                            disabled={true}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="Case No"
                            placeholder="Auto Generated"
                            className="w-[5px]"
                            minWidth='5px'
                            value={lmReferenceNo}
                            onChange={(e) => setLmReferenceNo(e.target.value)}
                            disabled={true}
                        ></TextFieldTopLabeled>
                        
                        <CheckBox
                            label="Emergency"
                            state={isChecked}
                            className="w-[5px]"
                            minWidth='5px'
                            setState={handleCheckboxChange}
                         />
                        <CheckBox
                            label="MlC"
                            state={isCheckedMLC}
                            className="w-[5px]"
                            minWidth='5px'
                            setState={handleCheckboxMLC}
                         />
                    </div>
                    <div
                        className="grid grid-cols-1 p-0.4 gap-x-4 gap-y-1 md:grid-cols-1 lg:grid-cols-5 xl:lg:grid-cols-2 max-h-[30vh] overflow-y-auto hide-scrollbar"
                        onKeyDown={handleKeyPress}>
                        
                        <div className="w-[100]">
                                <label className="text-xs">
                                    <div className="">
                                        Old Case<span className="text-red-600">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full p-2 mt-1 border rounded"
                                        value={pmOldCaseType}
                                        label="OldCase"
                                        onChange={(e) => setOldCaseType(e.target.value)}
                                        list="pmOldCaseType"
                                    />
                                    <datalist id="pmOldCaseType">
                                        <option value="Yes"></option>
                                        <option value="No"></option>
                                       
                                    </datalist>
                                </label>
                            </div>
                            <TextFieldTopLabeled
                            label="Search"
                            placeholder="Enter"
                            className="w-[5px]"
                            minWidth='5px'
                            value={lmSearch}
                            onChange={(e) => setLmSearch(e.target.value)}
                        ></TextFieldTopLabeled>
                    </div>
                    
                    
                        <div className="grid grid-cols-1 p-0.4 md:grid-cols-4 lg:grid-cols-4 gap-10"
                            onKeyDown={handleKeyPress}>

                            <div className="w-[100]">
                                <label className="text-xs">
                                    <div className="">
                                        OPD/IPD<span className="text-red-600">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full p-2 mt-1 border rounded"
                                        value={pmOPDType}
                                        label="OPD/IPD"
                                        onChange={(e) => setPmOPDType(e.target.value)}
                                        list="opdTypeList"
                                    />
                                    <datalist id="opdTypeList">
                                        <option value="O"></option>
                                        <option value="I"></option>

                                    </datalist>
                                </label>
                            </div>
                            <div className="w-[100p%]">
                                <label className="text-xs">
                                    <div className="">
                                        Title<span className="text-red-600">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full p-2 mt-1 border rounded"
                                        value={pmTitle}
                                        label="Title"
                                        onChange={(e) => setPmTitle(e.target.value)}
                                        list="titleList"
                                    />
                                    <datalist id="titleList">
                                        <option value="Mr"></option>
                                        <option value="Miss"></option>

                                    </datalist>
                                </label>
                            </div>
                            
                           
                            <TextFieldTopLabeled
                                className="w-full"
                                minWidth={150}
                                label="Name"
                                placeholder="Enter"
                                required={true}
                                value={lmName}
                                onChange={(e) => setLmName(e.target.value)}
                                id="ledger-master-id"
                            ></TextFieldTopLabeled>
                          <div className="w-[100]">
                                <label className="text-xs">
                                    <div className="">
                                        Gender<span className="text-red-600">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full p-2 mt-1 border rounded"
                                        value={pmGenderType}
                                        label="Gender"
                                        onChange={(e) => setGenderType(e.target.value)}
                                        list="pmGenderType"
                                    />
                                    <datalist id="pmGenderType">
                                        <option value="M"></option>
                                        <option value="F"></option>
                                       
                                    </datalist>
                                </label>
                            </div>                       
                        </div>
                        <div
                            className="grid grid-cols-1 p-0.4 gap-x-4 gap-y-1 md:grid-cols-1 lg:grid-cols-4 xl:lg:grid-cols-6 max-h-[30vh] overflow-y-auto hide-scrollbar"
                            onKeyDown={handleKeyPress}>

                            <div className="w-[100px]">
                                <label className="text-xs">
                                    <div className="">
                                        Marrital Status<span className="text-red-600">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full p-2 mt-1 border rounded"
                                        value={pmMstatusType}
                                        label="Marrital Status"
                                        onChange={(e) => setMstatusType(e.target.value)}
                                        list="pmMarritalType"
                                    />
                                    <datalist id="pmMarritalType">
                                        <option value="Married"></option>
                                        <option value="Unmarried"></option>
                                       
                                    </datalist>
                                </label>
                            </div>
                            <FileUploadTopLabeled
                                label="Photo"
                                // value={lmLogo}
                                files={lmLogo}
                                // className="w-1/2"
                                className="w-full "
                                minWidth={150}
                                // minWidth='5px'
                                onChange={(e) => setLmLogo(e.target.files[0])}
                                accept="image/*"
                            ></FileUploadTopLabeled>
                       
                            <DateTopLabeled
                                    label="DOB"
                                    value={prmDate}
                                    onChange={(e) => handleDateChange(e.target.value)}
                                    className="w-[100]"
                                    minWidth="5px"
                                />
                                <div className="w-[100]">
                                    <label className="text-xs">
                                        <div>Year</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded"
                                            value={age}
                                            disabled
                                        />
                                    </label>
                                </div>
                                <div className="w-[100]">
                                    <label className="text-xs">
                                        <div>Month</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded"
                                            value={monthDiff}
                                            disabled
                                        />
                                    </label>
                                </div>
                                <div className="w-[100]">
                                    <label className="text-xs">
                                        <div>Days</div>
                                        <input
                                            type="text"
                                            className="w-full p-2 mt-1 border rounded"
                                            value={dayDiff}
                                            disabled
                                        />
                                    </label>
                                </div>                       
                            </div>

                        <div
                        className="grid grid-cols-1 p-0.4 gap-x-4 gap-y-1 md:grid-cols-1 lg:grid-cols-4 xl:lg:grid-cols-6  max-h-[30vh] overflow-y-auto hide-scrollbar"
                        onKeyDown={handleKeyPress}>
                        
                        <TextFieldTopLabeled
                            label="Address"
                            className="w-full "
                            minWidth={100}
                            placeholder="Enter"
                            value={lmAddress}
                            onChange={(e) => setLmAddress(e.target.value)}
                        ></TextFieldTopLabeled>
                         <TextFieldTopLabeled
                            label="Area"
                            className="w-full "
                            minWidth={100}
                            placeholder="Enter"
                            value={lmArea}
                            onChange={(e) => setLmArea(e.target.value)}
                        ></TextFieldTopLabeled>
                        <TextFieldTopLabeled
                            label="City"
                            className="w-full "
                            minWidth={100}
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
                                className="w-full "
                                minWidth={100}
                                label="Mobile Number"
                                placeholder="Enter"
                                required={true}
                                value={lmMobile}
                                onChange={(e) => setLmMobile(e.target.value)}
                                id="ledger-master-id"
                        ></TextFieldTopLabeled>

                         <TextFieldTopLabeled
                            className="w-full "
                            minWidth={100}
                            label="Phone Number"
                            placeholder="Enter"
                            required={true}
                            value={lmPhone}
                            onChange={(e) => setLmPhone(e.target.value)}
                            id="ledger-master-id"
                        ></TextFieldTopLabeled>

                        <TextFieldTopLabeled
                            className="w-full "
                            minWidth={100}
                            label="Email Address"
                            placeholder="Enter"
                            required={true}
                            value={lmEmail}
                            onChange={(e) => setLmEmail(e.target.value)}
                            id="ledger-master-id"
                        ></TextFieldTopLabeled>
                    </div>
                       
                        <div
                            className="grid grid-cols-1 p-0.4 gap-x-4 gap-y-1 md:grid-cols-1 lg:grid-cols-3 xl:lg:grid-cols-3  max-h-[30vh] overflow-y-auto hide-scrollbar"
                            onKeyDown={handleKeyPress}>

                         <div className="w-[100]">
                                <label className="text-xs">
                                    <div className="">
                                        Company/TPA<span className="text-red-600">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full p-2 mt-1 border rounded"
                                        value={pmTPAType}
                                        label="Company/TPA"
                                        onChange={(e) => setPmTPAType(e.target.value)}
                                        list="tpaTypeList"
                                    />
                                    <datalist id="tpaTypeList">
                                        <option value="Male"></option>
                                        <option value="female"></option>
                                        <option value="Import"></option>
                                        <option value="NonGST"></option>
                                    </datalist>
                                </label>
                            </div>
                            <div className="w-[100]">
                                <label className="text-xs">
                                    <div className="">
                                        Reference Doctor<span className="text-red-600">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full p-2 mt-1 border rounded"
                                        value={pmRFAType}
                                        label="GST Type"
                                        onChange={(e) => setRFAType(e.target.value)}
                                        list="gstTypeList"
                                    />
                                    <datalist id="gstTypeList">
                                        <option value="Male"></option>
                                        <option value="female"></option>
                                        <option value="Import"></option>
                                        <option value="NonGST"></option>
                                    </datalist>
                                </label>
                            </div>
                            <div className="w-[100]">
                                <label className="text-xs">
                                    <div className="">
                                        Consulting Doctor<span className="text-red-600">*</span>
                                    </div>
                                    <input
                                        type="text"
                                        className="w-full p-2 mt-1 border rounded"
                                        value={pmCdocType}
                                        label="Consulting Doctor"
                                        onChange={(e) => setPmCdocType(e.target.value)}
                                        list="cDocTypeList"
                                    />
                                    <datalist id="cDocTypeList">
                                        <option value="Male"></option>
                                        <option value="female"></option>
                                        <option value="Import"></option>
                                        <option value="NonGST"></option>
                                    </datalist>
                                </label>
                            </div>
                        </div>
                        <div
                            className="grid grid-cols-1 p-0.4 gap-x-4 gap-y-1 md:grid-cols-1 lg:grid-cols-2 xl:lg:grid-cols-2  max-h-[30vh] overflow-y-auto hide-scrollbar"
                            onKeyDown={handleKeyPress}>

                            <TextFieldTopLabeled
                                label="Reg Charge"
                                className="w-[100]"
                                minWidth={100}
                                placeholder="Enter"
                                value={lmRegCharge}
                                onChange={(e) => setLmRegCharge(e.target.value)}
                            ></TextFieldTopLabeled>
                            <TextFieldTopLabeled
                                label="Narration"
                                type="text"
                                className="w-[100]"
                                minWidth={100}
                                placeholder="Enter"
                                value={lmNarration}
                                onChange={(e) => setLmNarration(e.target.value)}
                            ></TextFieldTopLabeled>
                       
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

export default PatientRegistration;

import * as React from "react";
import Button from "@mui/material/Button";
import { useEffect, useState, useContext } from "react";

import { FiMenu } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { IoMdLock } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { BsBellFill } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { BiLogOutCircle } from "react-icons/bi";
import { BiUser } from "react-icons/bi";

import toast from "react-hot-toast";
import NavTabs from "./NavTabs.components";
import ToolTipY from "./ToolTipY.component";
import IconBadge from "./IconBadge.component";
import useResponsive from "../../hooks/useResponsite";
import CustomButton1 from "../CustomButton1.component";
import { FetchData } from "../../functions/FetchData.function";
import DialogBox from "../DialogBoxComponents/DialogBox.compoent";
import TextFieldTopLabeled from "../DialogBoxComponents/TextFieldTopLabeled";

import { onlyIcon } from "../../pages/Admin.page";
import { setOnlyIcon } from "../../pages/Admin.page";
import { GlobalContext } from "../../global-context/GlobalContextComponent";

function Navbar() {
    //
    // Global Context
    //
    let GC = useContext(GlobalContext);
    let { ledgerMasterData } = GC;
    let { asideIsOpen, setAsideIsOpen } = GC;

    //
    // Fetching data from local storage
    //
    let lmId = localStorage.getItem("lmId");
    let lmName = localStorage.getItem("lmName");

    //
    // For notification dropdown postion
    //
    let notificationPosiion = useResponsive("center", "right", "right", "right", "right", "right");

    //
    // Fetch current user details from ledger master data
    // Then use it to display in view profile dialog box
    //
    let userDetails;
    ledgerMasterData.forEach((element) => {
        if (element.LM_ID == lmId) {
            userDetails = element;
        }
    });
    let logoUrl = "/" + userDetails?.LM_LOGO;

    //
    // States for dialog display and hide
    // For View Profile and Reset Password
    //
    let [viewProfileDialogBox, setViewProfileDialogBox] = useState(false);
    let [resetPasswordDialogBox, setResetPasswordDialogBox] = useState(false);

    //
    // Reset Password Form state
    //
    let [newPassword, setNewPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");

    //
    // Called first time when component is mounted
    // To set onlyIcon to false
    //
    useEffect(function () {
        setOnlyIcon(false);
    }, []);

    //
    // Logout
    //
    function logoutHandler() {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        window.location.href = "/";
    }

    //
    // Reset Password Form Submit
    //
    function handlerResetPassword() {
        console.log(newPassword, confirmPassword);

        if (!newPassword) {
            toast.error("Please enter New Password");
            return;
        }
        if (!confirmPassword) {
            toast.error("Please enter Confirm Password");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("New Password and Confirm Password should be same");
            return;
        }

        let lmId = localStorage.getItem("lmId");

        FetchData("POST", "/api/ledger-master/reset-password", {
            lmId,
            newPassword,
            confirmPassword,
        }).then((res) => {
            console.log(res);
            if (!res) return;
            if (res.isSuccess) {
                toast.success(res?.message || "Password Reset Successfully");
                setResetPasswordDialogBox(false);
                setNewPassword("");
                setConfirmPassword("");
            } else {
                toast.error(res?.message || "Failed to Reset Password");
            }
        });
    }

    //
    // Aside Bar For mobile devices
    // Sub Component
    //
    function Aside() {
        return (
            <div className="lg:hidden">
                {/* ASIDE */}
                <div
                    className="fixed top-0 left-0 z-50 w-0 h-screen transition-all bg-white custom-shadow overflow-clip"
                    // ref={asideRef}
                    style={{
                        width: asideIsOpen ? "300px" : "0px",
                    }}
                >
                    {/* CROSS BUTTON */}
                    <div className="p-5 md:p-6">
                        <RxCross2 className="icon press-3" onClick={() => setAsideIsOpen(false)} />
                    </div>

                    {/* NAVTABS */}
                    <div className="m-5 max-h-[80vh] overflow-x-hidden overflow-y-auto hide-scrollbar ">
                        <NavTabs />
                    </div>
                </div>

                {/* OVERLAY */}
                <div
                    className="fixed left-0 top-0 w-0 h-screen bg-[rgba(0,0,0,0.1)] z-40"
                    style={{
                        width: asideIsOpen ? "100%" : "0px",
                    }}
                    onClick={() => setAsideIsOpen(false)}
                ></div>
            </div>
        );
    }

    //
    // Actual Component
    //
    return (
        <section>
            {/* Aside Bar */}
            {/* Mobile Devices */}
            <Aside />

            {/* Top Navigation bar */}
            <div className="flex bg-white rounded">
                <div className="flex items-center justify-between px-5 lg:px-0 lg:pr-2 grow">
                    {/* Left : Mobile Menu icon */}
                    <div onClick={() => setAsideIsOpen(true)} className="cursor-pointer lg:hidden">
                        <FiMenu className="inline-block icon press-5" />
                    </div>

                    {/* Left : Desktop Menu & Logo & Company Name */}
                    <div className="items-center hidden lg:flex w-[350px] relative ">
                        {/* Menu */}
                        <div
                            className="w-[30px] flex items-center justify-center h-[30px] text-fourth press-2 ml-[20px]"
                            onClick={() => setOnlyIcon(!onlyIcon)}
                        >
                            <IoMenu className={`text-[30px] transition cursor-pointer`} />
                        </div>

                        {/* Logo */}
                        <div className="ml-[5px]">
                            {logoUrl && (
                                <img
                                    src={process.env.REACT_APP_BASEURL + logoUrl}
                                    className="max-h-[40px]"
                                />
                            )}
                        </div>

                        <div className="pl-3 font-semibold capitalize">{lmName}</div>
                    </div>

                    {/* Right : User + Notification */}
                    <div className="flex items-center gap-8 my-2">
                        {/* Notification */}
                        <div>
                            <ToolTipY
                                title={
                                    <div className="cursor-pointer">
                                        <IconBadge
                                            icon={<BsBellFill className="inline-block icon" />}
                                            badgeContent={"9+"}
                                        ></IconBadge>
                                    </div>
                                }
                                content={
                                    <div className="p-4 mx-2 overflow-hidden bg-white border border-gray-300 shadow-lg rounded-xl whitespace-nowrap">
                                        <div className="overflow-scroll hide-scrollbar max-h-[200px] flex flex-col gap-1">
                                            {/* NOTIFICATION 1 */}
                                            <div className="p-2 my-1 border rounded shadow">
                                                <div className="flex items-center justify-between gap-16">
                                                    <span className="font-[500] text-green-400">
                                                        Completed
                                                    </span>
                                                    <span className="text-xs">
                                                        20-05-2023 15:02
                                                    </span>
                                                </div>
                                                <div className="text-xs">
                                                    Inquiry VFABNKINQ0065 is
                                                </div>
                                                <div className="text-xs"> Completed by Rohnit</div>
                                            </div>

                                            {/* NOTIFICATION 2 */}
                                            <div className="p-2 my-1 border rounded shadow">
                                                <div className="flex items-center justify-between gap-16">
                                                    <span className="font-[500] text-red-400">
                                                        Revoke
                                                    </span>
                                                    <span className="text-xs">
                                                        20-05-2023 15:02
                                                    </span>
                                                </div>
                                                <div className="text-xs">
                                                    Inquiry VFABNKINQ0065 is
                                                </div>
                                                <div className="text-xs"> Completed by Rohnit</div>
                                            </div>

                                            {/* NOTIFICATION 3 */}
                                            <div className="p-2 my-1 border rounded shadow">
                                                <div className="flex items-center justify-between gap-16">
                                                    <span className="font-[500] text-green-400">
                                                        Completed
                                                    </span>
                                                    <span className="text-xs">
                                                        20-05-2023 15:02
                                                    </span>
                                                </div>
                                                <div className="text-xs">
                                                    Inquiry VFABNKINQ0065 is
                                                </div>
                                                <div className="text-xs"> Completed by Rohnit</div>
                                            </div>

                                            {/* NOTIFICATION 4 */}
                                            <div className="p-2 my-1 border rounded shadow">
                                                <div className="flex items-center justify-between gap-16">
                                                    <span className="font-[500] text-red-400">
                                                        Revoke
                                                    </span>
                                                    <span className="text-xs">
                                                        20-05-2023 15:02
                                                    </span>
                                                </div>
                                                <div className="text-xs">
                                                    Inquiry VFABNKINQ0065 is
                                                </div>
                                                <div className="text-xs"> Completed by Rohnit</div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                height="260px"
                                direction="down"
                                position={notificationPosiion}
                            ></ToolTipY>
                        </div>

                        {/* User */}
                        <div>
                            <ToolTipY
                                title={
                                    <div className="flex items-center gap-2 border-0 rounded-l-full cursor-pointer press-1">
                                        <div className="flex items-center justify-center border-2 rounded-full border-first bg-first">
                                            {logoUrl ? (
                                                <img
                                                    src={process.env.REACT_APP_BASEURL + logoUrl}
                                                    className="w-[33px] h-[33px] rounded-full"
                                                    alt=""
                                                />
                                            ) : (
                                                <BiUser className="m-[5px] text-white"></BiUser>
                                            )}
                                        </div>
                                        <div className="text-xs">
                                            {localStorage.getItem("lmName")}
                                        </div>
                                        <div>
                                            <BiChevronDown className="" />
                                        </div>
                                    </div>
                                }
                                content={
                                    <>
                                        <div className="flex flex-col gap-2 p-5 mx-2 overflow-hidden bg-white border border-gray-300 shadow-lg rounded-xl pace-nowrap">
                                            <div className="px-1 flex items-center justify-start gap-3 text-left font-['Ubuntu'] normal-case pr-5">
                                                {/* Logo */}
                                                <div>
                                                    <div className="flex items-center justify-center border-2 rounded-full border-first bg-first">
                                                        {logoUrl ? (
                                                            <img
                                                                src={
                                                                    process.env.REACT_APP_BASEURL +
                                                                    logoUrl
                                                                }
                                                                className="min-w-[33px] min-h-[33px] max-w-[33px] max-h-[33px] rounded-full"
                                                                alt=""
                                                            />
                                                        ) : (
                                                            <BiUser className="m-[5px] text-white"></BiUser>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* Email + Lm Name */}
                                                <div>
                                                    {/* lmName */}
                                                    <div className="text-sm text-black">
                                                        {localStorage.getItem("lmName")}
                                                    </div>
                                                    {/* email */}
                                                    <div className="text-xs text-gray-600">
                                                        {localStorage.getItem("email")}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-1"></div>
                                            <Button
                                                size="small"
                                                className="justify-start pl-[17px] text-left text-gray-600"
                                                onClick={() => setViewProfileDialogBox(true)}
                                            >
                                                <div className="flex items-center gap-2 capitalize">
                                                    <FaUserAlt className="inline-block text-base" />
                                                    <span className="mt-[2px] ml-1">
                                                        View Profile
                                                    </span>
                                                </div>
                                            </Button>
                                            <Button
                                                size="small"
                                                className="justify-start pl-3 text-left text-gray-600"
                                                onClick={() => setResetPasswordDialogBox(true)}
                                            >
                                                <div className="flex items-center gap-2 capitalize">
                                                    <IoMdLock className="inline-block text-2xl" />
                                                    <span className="mt-[2px]">Reset Password</span>
                                                </div>
                                            </Button>
                                            <Button
                                                size="small"
                                                className="justify-start pl-3 text-left text-gray-600"
                                                onClick={logoutHandler}
                                            >
                                                <div className="flex items-center gap-2 capitalize">
                                                    <BiLogOutCircle className="inline-block text-2xl " />
                                                    <span className="mt-[2px]">Logout</span>
                                                </div>
                                            </Button>

                                            <div className="pl-2 mt-5 text-xs">
                                                <span className="cursor-pointer hover:underline">
                                                    Privacy Policy
                                                </span>{" "}
                                                |{" "}
                                                <span className="cursor-pointer hover:underline">
                                                    Terms & condition
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                }
                                height="300px"
                                direction="down"
                                position="right"
                            ></ToolTipY>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Profile */}
            <DialogBox
                state={viewProfileDialogBox}
                setState={setViewProfileDialogBox}
                title1={"Profile"}
                title2={""}
            >
                <div className="max-h-[70vh] overflow-y-auto hide-scrollbar p-5 grid grid-cols-1 gap-x-16 gap-y-5 md:grid-cols-2 lg:grid-cols-3 mx-10">
                    {/* 1 */}
                    <div className="">
                        <div className="border w-[200px] h-[200px] rounded-full flex justify-center items-center">
                            <img src={process.env.REACT_APP_BASEURL + logoUrl} className="max" />
                        </div>
                    </div>
                    {/* 2 */}
                    <div className="flex flex-col justify-center">
                        {/* Detail */}
                        <div className="my-2">
                            <div className="text-xs">Name</div>
                            <div className="font-[500] capitalize">{userDetails?.LM_NAME}</div>
                        </div>

                        {/* Detail */}
                        <div className="my-2">
                            <div className="text-xs">Email Address</div>
                            <div className="font-[500]">{userDetails?.LM_EMAIL}</div>
                        </div>
                        <div className="my-2">
                            <div className="text-xs">Phone Number</div>
                            <div className="font-[500]">{userDetails?.LM_PHONE || "-"}</div>
                        </div>
                    </div>
                    {/* 3 */}
                    <div className="flex flex-col justify-center">
                        {/* Detail */}
                        <div className="my-2">
                            <div className="text-xs">Mobile Number</div>
                            <div className="font-[500]">{userDetails?.LM_MOBILE || "-"}</div>
                        </div>
                        <div className="my-2">
                            <div className="text-xs">Parent Id</div>
                            <div className="font-[500] capitalize">
                                {userDetails?.LM_PARENT_ID || "-"}
                            </div>
                        </div>

                        {/* Detail */}
                        <div className="my-2">
                            <div className="text-xs">Reference Id</div>
                            <div className="font-[500]">{userDetails?.LM_REFERENCE_ID}</div>
                        </div>
                    </div>
                    {/* 4 */}
                    <div className="flex flex-col">
                        {/* Detail */}
                        <div className="my-2">
                            <div className="text-xs">Aadhar Number</div>
                            <div className="font-[500] capitalize">
                                {userDetails?.LM_AADHAR_NO || "-"}
                            </div>
                        </div>

                        {/* Detail */}
                        <div className="my-2">
                            <div className="text-xs">PAN Number</div>
                            <div className="font-[500]">{userDetails?.LM_PAN_CARD_NO || "-"}</div>
                        </div>
                        <div className="my-2">
                            <div className="text-xs">GST Number</div>
                            <div className="font-[500]">{userDetails?.LM_GST_NO || "-"}</div>
                        </div>
                    </div>
                    {/* 5 */}
                    <div className="flex flex-col">
                        <div className="my-2">
                            <div className="text-xs">Under Id</div>
                            <div className="font-[500]">{userDetails?.LM_UNDER_ID || "-"}</div>
                        </div>
                        <div className="my-2">
                            <div className="text-xs">Under Name</div>
                            <div className="font-[500]">{userDetails?.LM_UNDER_NAME || "-"}</div>
                        </div>
                        {/* Detail */}
                        <div className="my-2">
                            <div className="text-xs">Date of Expiry</div>
                            <div className="font-[500] capitalize">
                                {userDetails?.LM_DOE || "-"}
                            </div>
                        </div>

                        {/* Detail */}
                        <div className="my-2">
                            <div className="text-xs">Password</div>
                            <div className="font-[500]">{userDetails?.LM_PASSWORD}</div>
                        </div>
                    </div>
                    {/* 6 */}
                    <div className="flex flex-col">
                        {/* Detail */}
                        <div className="my-2">
                            <div className="text-xs">Address</div>
                            <div className="font-[500] capitalize">
                                {userDetails?.LM_ADDRESS || "-"}
                            </div>
                        </div>

                        <div className="my-2">
                            <div className="text-xs">City</div>
                            <div className="font-[500]">{userDetails?.LM_CITY || "-"}</div>
                        </div>
                        <div className="my-2">
                            <div className="text-xs">State</div>
                            <div className="font-[500]">{userDetails?.LM_STATE || "-"}</div>
                        </div>
                        <div className="my-2">
                            <div className="text-xs">Country</div>
                            <div className="font-[500]">{userDetails?.LM_COUNTRY || "-"}</div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-5 mt-5">
                    <div>
                        <CustomButton1
                            label={"Close"}
                            variant="outlined"
                            className="text-gray-400 border-gray-400"
                            onClick={() => setViewProfileDialogBox(false)}
                        />
                    </div>
                </div>
            </DialogBox>

            {/* Reset password */}
            <DialogBox
                state={resetPasswordDialogBox}
                setState={setResetPasswordDialogBox}
                title1={"Reset Password"}
                title2={""}
            >
                <div className="grid grid-cols-1 px-10 py-5 gap-x-4 gap-y-3 ">
                    <TextFieldTopLabeled
                        label="New Password *"
                        type="password"
                        placeholder="Enter"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        require={true}
                    ></TextFieldTopLabeled>
                    <TextFieldTopLabeled
                        label="Confirm Password *"
                        type="password"
                        placeholder="Enter"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        require={true}
                    ></TextFieldTopLabeled>
                </div>
                <div className="flex justify-center gap-5 mt-5">
                    <div>
                        <CustomButton1
                            label={"Submit"}
                            className="text-white bg-first"
                            onClick={handlerResetPassword}
                        />
                    </div>
                    <div>
                        <CustomButton1
                            label={"cancel"}
                            variant="outlined"
                            className="text-first"
                            onClick={() => setResetPasswordDialogBox(false)}
                        />
                    </div>
                </div>
            </DialogBox>
        </section>
    );
}

export default Navbar;

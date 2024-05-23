import * as React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useContext } from "react";
import loginImage from "../assets/loginImage.svg";
import { FaUserAlt } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";

import { FetchData } from "../functions/FetchData.function";
import CustomTextField1 from "../components/LoginComponents/TextFieldTopLabeled";
import SideLabeledCheckbox from "../components/LoginComponents/CheckboxSideLabeled";
import CustomButton1 from "../components/CustomButton1.component";

import { GlobalContext } from "../global-context/GlobalContextComponent";

function Login() {
    let GC = useContext(GlobalContext);

    const [emailMobile, setEmailMobile] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rememberMe, setRememberMe] = React.useState(true);

    let navigate = useNavigate();

    function loginHandler() {
        let emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        let mobileRegex = /^[0-9]{10}$/;

        let email;
        let mobile;

        if (emailRegex.test(emailMobile)) {
            email = emailMobile;
            mobile = "";
        } else if (mobileRegex.test(emailMobile)) {
            email = "";
            mobile = emailMobile;
        } else {
            toast.error("Please enter valid email address or mobile number");
            return;
        }

        FetchData("POST", "/api/login", { email, mobile, password }).then((res) => {
            console.log(res);
            if (res?.isSuccess) {
                toast.success("Login Successful ");

                localStorage.setItem("lmId", res.data.lmId);
                localStorage.setItem("lmName", res.data.lmName);
                localStorage.setItem("email", res.data.email);
                localStorage.setItem("password", password);
                localStorage.setItem("token", res.data.token);

                if (!rememberMe) {
                    window.addEventListener("beforeunload", (e) => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("email");
                    });
                }

                navigate("/admin");
            } else {
                toast.error(res?.message || "Login Failed");
            }
        });
    }

    return (
        <>
            <style>
                {`
                    .gradient-1 {
                        background: linear-gradient(
                            0deg,
                            #1c4584,
                            #0045e0,
                            #ffffff
                        );
                    }
                    .zoom-1 {
                        zoom: 0.85;

                        @media screen and (min-width: 450px) {
                            zoom: 1;
                        }
                    }
                `}
            </style>
            <div className="flex items-center justify-center min-h-screen bg-bottom bg-no-repeat bg-contain gradient-1 ">
                {/* Main Login Container */}
                <div className="p-10 bg-white m-10 w-full sm:w-[80%] max-w-[900px] rounded">
                    <div className="flex flex-col items-stretch gap-5 mt-5 md:gap-10 md:flex-row zoom-1">
                        {/* Logo */}
                        <div className="flex items-center justify-center">
                            <img
                                src={loginImage}
                                className=" w-[150px] md:w-[200px] lg:w-[350px]"
                                alt=""
                            />
                        </div>

                        {/* Login Form */}
                        <div className="flex flex-col justify-center grow">
                            <h1 className="text-3xl font-[500] text-fourth">Login</h1>
                            <div className="mt-7">
                                <CustomTextField1
                                    type="text"
                                    // label="Email Address"
                                    icon={<FaUserAlt className="text-gray-700" />}
                                    placeholder="Enter your Email or Mobile Number"
                                    value={emailMobile}
                                    onChange={(e) => setEmailMobile(e.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <CustomTextField1
                                    type="password"
                                    // label="Password"
                                    icon={<IoMdLock className="text-gray-700 scale-[1.3]" />}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 m-1.5 flex justify-between">
                                <SideLabeledCheckbox
                                    label="Remember me"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                {/* <NavLink
                                    to="forgot-password"
                                    className={`text-xs press`}
                                >
                                    Forgot Password?
                                </NavLink> */}
                            </div>
                            <div className="mt-5" onClick={loginHandler}>
                                <div className="w-full min-h-full text-base font-semibold capitalize">
                                    <CustomButton1 label="Login" className={`bg-first w-full`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;

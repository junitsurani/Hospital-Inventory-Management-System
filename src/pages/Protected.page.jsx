import toast from "react-hot-toast";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FetchData } from "../functions/FetchData.function";

import { GlobalContext } from "../global-context/GlobalContextComponent";

function Protected(props) {
    const { Component } = props;
    let GC = useContext(GlobalContext);
    let navigate = useNavigate();

    if (!localStorage.getItem("token")) navigate("/login");

    useEffect(function () {
        FetchData("POST", "/api/validate-token", {}).then((res) => {
            if (res?.isSuccess) {
                FetchData("POST", "/api/get-master-data", {}).then((res) => {
                    console.log(res);
                    if (res.isSuccess) {
                        GC.setLedgerMasterData(() => res?.data?.ledgerMasterData);
                        GC.setAccountGroupData(() => res?.data?.accountGroupData);
                        GC.setTypeMasterData(() => res?.data?.typeMasterData);
                        GC.setTypeNameMasterData(() => res?.data?.typeNameMasterData);
                        GC.setMenuMasterData(() => res?.data?.menuMasterData);
                        GC.setCompanyMenuMasterData(() => res?.data?.companyMenuMasterData);
                        GC.setItemMasterData(() => res?.data?.itemMasterData);
                        toast.success("Master data fetched");
                    } else {
                        toast.error("Failed Fetch master");
                        navigate("/");
                    }
                });
            } else {
                toast.error("Token Validation Failed");
                navigate("/");
            }
        });
    }, []);

    return <Component />;
}

export default Protected;

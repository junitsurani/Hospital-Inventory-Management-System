import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "../components/NavbarComponents/NavBar.component";
import NavTabs from "../components/NavbarComponents/NavTabs.components";

import Dashboard from "../sections/Dashboard.section";
import LedgerMaster from "../sections/LedgerMaster.section";
import ComapanyMaster from "../sections/ComapayMaster.section";
import TypeMaster from "../sections/TypeMaster.section";
import TypeNameMaster from "../sections/TypeNameMaster.section";
import MenuMaster from "../sections/MenuMaster.section";
import CompanyManuMaster from "../sections/CompanyManuMaster";
import ItemMaster from "../sections/ItemMaster.section";
import Connect from "../sections/Connect.section";
import Purchase from "../sections/Purchase.section";
import ReceiptPayment from "../sections/ReceiptPayment.section";
import Vouchers from "../sections/Vouchers.section";
import ReceiptMaster from "../sections/ReceiptMaster.section";
import PaymentMaster from "../sections/PaymentMaster.section";
import PatientRegistration from "../sections/PatientRegistration.section";
import BillReceipt from "../sections/BillReceipt.section";

let [onlyIcon, setOnlyIcon] = [false, null];

function Admin() {
    [onlyIcon, setOnlyIcon] = useState(true);

    return (
        <section className="flex flex-col h-screen p-2 bg-fifth">
            {/* Top Navigation Bar */}
            <section>
                <Navbar />
            </section>

            {/* Aside Tabs + Dynamic 'Sections' */}
            <section className="flex gap-2 grow h-[85.5vh]">
                {/* Aside */}
                <div
                    className={` bg-white ${
                        onlyIcon ? " w-[70px] min-w-[70px] " : " w-[280px] min-w-[280px] "
                    } p-3 hidden lg:block rounded mt-2 overflow-x-hidden overflow-auto hide-scrollbar`}
                >
                    <NavTabs />
                </div>

                {/* Dynamic Section */}
                <div className="mt-2 overflow-hidden rounded grow hide-scrollbar">
                    <Routes>
                        <Route element={<Dashboard />} />

                        {/* New Routes */}
                        <Route path="company-master" element={<ComapanyMaster />} />
                        <Route path="ledger-master" element={<LedgerMaster />} />
                        <Route path="type-master" element={<TypeMaster />} />
                        <Route path="type-name-master" element={<TypeNameMaster />} />
                        <Route path="menu-master" element={<MenuMaster />} />
                        <Route path="company-menu-master" element={<CompanyManuMaster />} />
                        <Route path="item-master" element={<ItemMaster />} />
                        <Route path="connect" element={<Connect />} />
                        <Route path="patient-registration" element={<PatientRegistration />} />
                        <Route path="purchase" element={<Purchase />} />
                        {/* <Route path="receipt-payment" element={<ReceiptPayment />} /> */}
                        <Route path="voucher" element={<Vouchers />} />
                        <Route path="receiptmaster" element={<ReceiptMaster />} />
                        <Route path="paymentmaster" element={<PaymentMaster />} />
                        <Route path="bill-receipt" element={<BillReceipt />} />
                    </Routes>
                </div>
            </section>
        </section>
    );
}

export default Admin;
export { onlyIcon, setOnlyIcon };

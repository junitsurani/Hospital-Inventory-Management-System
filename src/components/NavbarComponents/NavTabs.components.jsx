import Icon1 from "../../assets/Dashboard.svg";
import Icon2 from "../../assets/Administration.svg";
import Icon3 from "../../assets/Design Master.svg";
import Icon4 from "../../assets/Coustomer.svg";
import Icon5 from "../../assets/Inventory Master.svg";
import Icon6 from "../../assets/Sales Order Creation.svg";
import Icon7 from "../../assets/Order Design Analysis.svg";
import Icon8 from "../../assets/Prodution Analysis.svg";
import Icon9 from "../../assets/Current Stock.svg";
import Icon10 from "../../assets/Stock In.svg";
import Icon11 from "../../assets/Stock Out.svg";
import Icon12 from "../../assets/Service Module.svg";
import Icon13 from "../../assets/Performa Invoice.svg";
import Icon14 from "../../assets/Planning for classified.svg";
import Icon15 from "../../assets/IconVisitors.svg";

import { AiOutlineSearch } from "react-icons/ai";

import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { onlyIcon } from "../../pages/Admin.page";

import { useContext } from "react";
import { GlobalContext } from "../../global-context/GlobalContextComponent";
import toast from "react-hot-toast";

function NavTabs() {
    let GC = useContext(GlobalContext);
    let { asideActiveTab, setAsideActiveTab } = GC;
    let { companyMenuMasterData } = GC;
    let { menuMasterData } = GC;

    const { pathname } = useLocation();
    // let [activeTab, setActiveTab] = useState(asideActiveTab);

    // useEffect(
    //     function () {
    //         setAsideActiveTab(activeTab);
    //     },
    //     [activeTab]
    // );

    // Dynamic menu

    let lmId = localStorage.getItem("lmId");
    let tabIdArray = [];
    let tabDetailArray = [];

    if (companyMenuMasterData) {
        for (let i of companyMenuMasterData) {
            if (i.LM_ID == lmId) {
                tabIdArray.push(i.M_ID);
            }
        }
    }

    if (menuMasterData) {
        for (let i of menuMasterData) {
            if (!i.M_PARENT_ID) {
                tabDetailArray[i.M_ORDER] = {
                    id: i.M_ID,
                    title: i.M_NAME,
                    icon: i.M_ICON,
                    to: i.M_FORM_LINK,
                    subTabs: [],
                    disabled: false,
                };
            }
        }
        for (let i of menuMasterData) {
            if (i.M_PARENT_ID) {
                let parent = menuMasterData.filter((element, index) => {
                    return element.M_ID == i.M_PARENT_ID;
                });
                tabDetailArray[parent[0].M_ORDER]["subTabs"][i.M_ORDER] = [i.M_NAME, i.M_FORM_LINK];
            }
        }
    }

    function handlerClick(index) {
        setAsideActiveTab(index);
    }

    function Tab(props) {
        return (
            <div>
                {/* Tab */}
                <NavLink
                    to={props.to || undefined}
                    className="flex py-2 my-1 pl-[7px] rounded items-center gap-2 cursor-pointer"
                    style={{
                        backgroundColor:
                            asideActiveTab == props.index ? " #F2F2F2 " : " transparent ",
                    }}
                    onClick={() => handlerClick(props.index)}
                >
                    {/* Icon */}
                    <div>
                        <img src={props.icon} className="min-w-[30px]" />
                    </div>

                    {/* Title */}
                    <div className={` ${onlyIcon ? " hidden " : " block "} `}>{props.title}</div>
                </NavLink>

                {/* Sub tab */}
                <div
                    className={`rounded`}
                    style={{
                        display: onlyIcon || asideActiveTab !== props.index ? "none" : "block",
                    }}
                >
                    {props.subtabs.map((element, index) => {
                        return (
                            <NavLink
                                key={index}
                                to={"/admin" + element[1]}
                                className={`py-2 pl-[45px] rounded my-1 block ${
                                    pathname.includes(element[1]) ? "bg-first text-white" : ""
                                }`}
                            >
                                {element[0]}
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        );
    }

    function getIcon(icon) {
        switch (icon) {
            case "icon1":
                return Icon1;
            case "icon2":
                return Icon2;
            case "icon3":
                return Icon3;
            case "icon4":
                return Icon4;
            case "icon5":
                return Icon5;
            case "icon6":
                return Icon6;
            case "icon7":
                return Icon7;
            case "icon8":
                return Icon8;
            case "icon9":
                return Icon9;
            case "icon10":
                return Icon10;
            case "icon11":
                return Icon11;
            case "icon12":
                return Icon12;
            case "icon13":
                return Icon13;
            case "icon14":
                return Icon14;
            case "icon15":
                return Icon15;
        }
    }

    return (
        <div>
            {tabDetailArray.map((element, index) => {
                if (tabIdArray.includes(element.id))
                    return (
                        <Tab
                            key={index}
                            index={index}
                            title={element.title}
                            icon={getIcon(element.icon)}
                            subtabs={element.subTabs}
                        />
                    );
            })}
        </div>
    );
}

export default NavTabs;

// CORE
import { useRef } from "react";

import { onlyIcon } from "../../pages/Admin.page";
import { setOnlyIcon } from "../../pages/Admin.page";

// ICONS
import { AiOutlineCaretLeft } from "react-icons/ai";
import { AiOutlineCaretRight } from "react-icons/ai";

function Tab(props) {
    return (
        <div
            className={` border-b-[3px] ${
                props.activeTab === props.index
                    ? " border-first "
                    : " border-transparent "
            } transition-all ease-in-out grow flex justify-center p-3 capitalize font-[500]`}
            onClick={() => props.setActiveTab(props.index)}
        >
            {props.label}
        </div>
    );
}

function TabContainer(props) {
    let firstRef = useRef(null);
    let lastRef = useRef(null);
    let scrollRef = useRef(null);

    return (
        <div className="flex items-stretch border-b border-gray-400">
            {props.showArrow ? (
                <div
                    onClick={() => scrollRef.current.scrollBy(-100, 0)}
                    onDoubleClick={() =>
                        firstRef.current.scrollIntoView({ behavior: "smooth" })
                    }
                    className="w-[20px] press-3 flex justify-center items-center"
                >
                    <AiOutlineCaretLeft />
                </div>
            ) : (
                ""
            )}

            <div
                className={`flex grow ${
                    props.grow === false ? " justify-center " : " "
                } mx-auto max-w-[85vw] ${
                    onlyIcon ? " lg:max-w-[88vw] " : " lg:max-w-[70vw] "
                } transition ease-out duration-1000 overflow-x-auto hide-scrollbar whitespace-nowrap scroll-smooth`}
                ref={scrollRef}
            >
                <div ref={firstRef}></div>
                <div
                    className={`flex ${props.grow === false ? "" : " grow "} `}
                >
                    {props.children}
                </div>
                <div ref={lastRef}></div>
            </div>
            {props.showArrow ? (
                <div
                    className="w-[20px] press-3 flex justify-center items-center"
                    onClick={() => scrollRef.current.scrollBy(100, 0)}
                    onDoubleClick={() =>
                        lastRef.current.scrollIntoView({ behavior: "smooth" })
                    }
                >
                    <AiOutlineCaretRight />
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

function TabContent(props) {
    return (
        <div
            className={` ${
                props.activeTab === props.index ? " block " : " hidden "
            } `}
        >
            {props.children}
        </div>
    );
}

export { Tab, TabContainer, TabContent };

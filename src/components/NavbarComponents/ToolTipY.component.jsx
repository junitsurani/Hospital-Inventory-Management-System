import { useEffect, useRef } from "react";

function ToolTipY(props) {
    let toolTipRef = useRef(null);
    let overlayRef = useRef(null);
    let containerRef = useRef(null);

    useEffect(function () {
        closeToolTip();

        if (props.direction == "down") {
            toolTipRef.current.style.top = "120%";
        } else if (props.direction == "up") {
            toolTipRef.current.style.bottom = "120%";
        }

        if (props.position == "left") {
            containerRef.current.style.justifyContent = "flex-start";
        } else if (props.position == "right") {
            containerRef.current.style.justifyContent = "flex-end";
        } else if (props.position == "center") {
            containerRef.current.style.justifyContent = "center";
        }
    });

    function openToolTip() {
        toolTipRef.current.style.height = props.height;
        overlayRef.current.style.display = "block";
    }
    function closeToolTip() {
        toolTipRef.current.style.height = "0px";
        overlayRef.current.style.display = "none";
    }
    function ToogleToolTop() {
        if (toolTipRef.current.style.height == "0px") {
            openToolTip();
        } else {
            closeToolTip();
        }
    }

    return (
        <>
            <div className="relative flex items-center" ref={containerRef}>
                <div>
                    <div onClick={ToogleToolTop}>{props.title}</div>
                </div>
                <div
                    className="absolute z-20 h-0 overflow-auto transition-all rounded w-fit hide-scrollbar"
                    ref={toolTipRef}
                >
                    <div>{props.content}</div>
                </div>
            </div>
            {/* overlay */}
            <div
                className="fixed top-0 left-0 w-[100%] h-[100%] z-10 hidden"
                onClick={closeToolTip}
                ref={overlayRef}
            ></div>
        </>
    );
}

export default ToolTipY;

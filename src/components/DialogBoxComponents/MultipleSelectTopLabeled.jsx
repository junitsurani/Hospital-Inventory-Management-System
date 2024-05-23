import { useState } from "react";
import { GrClose } from "react-icons/gr";

function MultipleSelectTopLabeled(props) {
    let [optionVisible, setOptionVisible] = useState(false);
    let [optionData, setOptionData] = useState(props.optionData);

    function handlerRemoveFromSelection(element) {
        props.setState((old) => {
            const index = old.indexOf(element);
            if (index > -1) {
                old.splice(index, 1);
                return [...old];
            }
        });
    }

    function handlerAddToSelection(element) {
        props.setState((old = []) => {
            if (!old.includes(element)) {
                return [...old, element];
            } else {
                return old;
            }
        });
    }

    function filterOptionData(e) {
        setOptionData(() => {
            return props.optionData?.filter((element, index) => {
                if (String(element).toLowerCase().includes(String(e.target.value).toLowerCase())) {
                    return true;
                }
            });
        });
    }

    return (
        <div className="flex flex-col gap-1 grow-0">
            {/* Label */}
            <label htmlFor="id" className="text-xs">
                {props.label}
                {props.required && <span className="ml-1 text-red-500 ">*</span>}
            </label>

            {/* Input element */}
            <input
                type={props.type || "text"}
                className="p-2 border rounded grow min-w-[250px] text-xs placeholder:text-xs"
                placeholder={props.placeholder}
                disabled={props.disabled}
                onKeyDown={props.onKeyDown}
                onChange={(e) => filterOptionData(e)}
                onFocus={() => setOptionVisible(true)}
                onBlur={(e) => {
                    setTimeout(function () {
                        setOptionVisible(false);
                    }, 150);
                }}
            />

            {/* Select & Option */}
            {optionVisible && (
                <div className="absolute bg-white">
                    <div className="w-[270px] top-[57px] absolute z-[100] py-1 bg-white border border-gray-400 rounded">
                        {optionData?.map((element, index) => {
                            return (
                                <div
                                    key={index}
                                    className="px-2 text-sm text-black cursor-pointer min-w-[200px] hover:bg-first hover:text-white"
                                    value={element}
                                    onClick={() => handlerAddToSelection(element)}
                                >
                                    {element}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Selected Valued */}
            <div className="flex flex-wrap rounded" style={{ maxWidth: props.maxWidth }}>
                {props.state?.map((element, index) => {
                    if (!element) return null;
                    return (
                        <div
                            className="flex items-center justify-between gap-2 px-2 py-1 m-1 text-xs bg-gray-300 rounded grow"
                            key={index}
                        >
                            <div>{element}</div>
                            <div
                                className="cursor-pointer"
                                onClick={() => handlerRemoveFromSelection(element)}
                            >
                                <GrClose></GrClose>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MultipleSelectTopLabeled;

import { useRef, useEffect } from "react";

function CustomTextField2(props) {
    const ref = useRef(null);

    useEffect(function () {
        if (props.focus) ref.current.focus();
    }, []);

    return (
        <div className={`flex flex-col ${props.label ? " gap-1 " : " "} grow shrink`}>
            <label className="text-xs">
                {props.label}
                {props.required && <span className="ml-1 text-red-500 ">*</span>}
            </label>
            <input
                type={props.type || "text"}
                className={`p-2 text-xs border rounded grow placeholder:text-xs focus:border-first max-h-[34px]`}
                style={{
                    width: props.width || "auto",
                    minWidth: props.minWidth || "250px",
                }}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
                list={props.list}
                ref={ref}
                id={props.id}
                data-label={props.label}
                onKeyDown={props.onKeyDown}
            />
            {props.children}
        </div>
    );
}

export default CustomTextField2;

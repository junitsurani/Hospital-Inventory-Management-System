import { useState } from "react";

function TextField(props) {
    let [isFocus, setIsFocus] = useState(false);

    return (
        <label className="block text-fourth">
            <span>{props.label}</span>
            <div className="flex mt-1">
                <div className="w-[5px] bg-first rounded-l"></div>
                <div
                    className={`border w-full rounded-r border-l-0 flex items-center gap-2 px-3 py-2.5 ${
                        isFocus && " border-first "
                    } `}
                >
                    <span>{props.icon}</span>
                    <input
                        type={props.type || "text"}
                        className="text-xs text-gray-700 grow"
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                    />
                </div>
            </div>
        </label>
    );
}

export default TextField;

import { BsCheck } from "react-icons/bs";
import { useState } from "react";

function CustomCheckBox2(props) {
    // let [state, setState] = useState(props.state || true);
    let [state, setState] = [props.state, props.setState];

    // if (props.state && props.setState) {
    //     state = props.state;
    //     setState = props.setState;
    // }

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="id" className="text-xs">
                {props.label}
            </label>
            <div className="flex items-center gap-3 mt-1 text-sm cursor-pointer">
                <div
                    className={`${
                        state ? " bg-first " : " bg-white "
                    } border border-gray-300 flex justify-center items-center rounded-full h-[25px] w-[25px]`}
                    onClick={() => setState(!state)}
                >
                    {Boolean(state) && <BsCheck className="text-2xl text-white" />}
                </div>
                <div onClick={() => setState(!state)}>Yes</div>

                <div
                    className={`${
                        !state ? " bg-first " : " bg-white "
                    } border border-gray-300 flex justify-center items-center rounded-full h-[25px] w-[25px]`}
                    onClick={() => setState(!state)}
                >
                    {!state && <BsCheck className="text-2xl text-white" />}
                </div>
                <div onClick={() => setState(!state)}>No</div>
            </div>
        </div>
    );
}

export default CustomCheckBox2;

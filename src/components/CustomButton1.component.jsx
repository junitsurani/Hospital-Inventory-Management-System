import * as React from "react";
import Button from "@mui/material/Button";

function CustomButton1(props) {
    return (
        <Button
            type="submit"
            variant={props.variant ?? "contained"}
            size={props.size ?? "medium"}
            className={` ${props.className} flex gap-2 capitalize justify-center items-center relative`}
        >
            {props.icon && <span className="text-lg">{props.icon}</span>}
            {props.label && <span className=" whitespace-nowrap font-[500]">{props.label}</span>}

            <div onClick={props.onClick} className="absolute top-0 left-0 w-full h-full"></div>
        </Button>
    );
}

export default CustomButton1;

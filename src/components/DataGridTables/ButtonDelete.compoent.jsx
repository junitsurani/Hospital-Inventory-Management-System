import Button from "@mui/material/Button";
import { BiEdit } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

function ButtonDelete(props) {
    return (
        <div title="Delete Record" className="mx-1">
            <Button
                variant="contained"
                size="small"
                className="w-[30px] h-[30px] min-w-[30px] p-0 m-0 bg-red-500"
                onClick={props.onClick}
            >
                <div>{<RiDeleteBin6Line className="text-lg" />}</div>
            </Button>
        </div>
    );
}

export default ButtonDelete;

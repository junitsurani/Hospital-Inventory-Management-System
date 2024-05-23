import Button from "@mui/material/Button";
import { BiEdit } from "react-icons/bi";

function ButtonEdit(props) {
    return (
        <div title="Edit" className="mx-1">
            <Button
                variant="contained"
                size="small"
                className="w-[30px] h-[30px] min-w-[30px] p-0 m-0 bg-first"
                onClick={props.onClick}
            >
                <div>{<BiEdit className="text-lg" />}</div>
            </Button>
        </div>
    );
}

export default ButtonEdit;

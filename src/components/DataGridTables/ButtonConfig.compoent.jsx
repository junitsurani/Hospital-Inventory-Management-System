import Button from "@mui/material/Button";
import { BiEdit } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

function ButtonConfig(props) {
    return (
        <div title="Configure Role" className="mx-1">
            <Button
                variant="contained"
                size="small"
                className="w-[30px] h-[30px] min-w-[30px] p-0 m-0 bg-fourth"
                onClick={props.onClick}
            >
                <div>{<FiSettings className="text-lg" />}</div>
            </Button>
        </div>
    );
}

export default ButtonConfig;

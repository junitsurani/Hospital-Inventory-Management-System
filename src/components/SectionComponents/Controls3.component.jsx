import { Button } from "@mui/material";
import { FaFileImport } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

function Controls3() {
    return (
        <div className="flex flex-wrap justify-between gap-3 sm:flex-nowrap">
            <div className="flex flex-wrap gap-3 grow lg:max-w-[500px]">
                <Button
                    variant="contained"
                    className="capitalize grow shrink bg-first font-['ubuntu'] font-[400]"
                >
                    CSV
                </Button>
                <Button
                    variant="contained"
                    className="capitalize grow shrink bg-first font-['ubuntu'] font-[400]"
                >
                    Excel
                </Button>
                <Button
                    variant="contained"
                    className="capitalize grow shrink bg-first font-['ubuntu'] font-[400]"
                >
                    PDF
                </Button>
                <Button
                    variant="contained"
                    className="capitalize grow shrink bg-first font-['ubuntu'] font-[400]"
                >
                    Print
                </Button>
                <Button
                    variant="contained"
                    className="capitalize grow shrink bg-first font-['ubuntu'] font-[400]"
                >
                    Column Visibility
                </Button>
            </div>

            <div className="flex flex-wrap gap-3 grow lg:max-w-[420px]">
                <Button
                    variant="contained"
                    className="capitalize grow shrink bg-first font-['ubuntu'] font-[400] flex items-center gap-2"
                >
                    <span>
                        <FaFileImport />
                    </span>
                    Import manage user
                </Button>
                <Button
                    variant="contained"
                    className="capitalize grow shrink bg-first font-['ubuntu'] font-[400] flex items-center gap-2"
                >
                    <span>
                        <FiDownload />
                    </span>
                    Download manage user
                </Button>
            </div>
        </div>
    );
}

export default Controls3;

import { Button } from "@mui/material";

function Controls1() {
    return (
        <div className="flex flex-wrap gap-3 max-w-[600px]">
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
    );
}

export default Controls1;

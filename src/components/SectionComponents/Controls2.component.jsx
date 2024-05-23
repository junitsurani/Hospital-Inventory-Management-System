import jsPDF from "jspdf";
import Papa from "papaparse";
import { Button } from "@mui/material";
import autoTable from "jspdf-autotable";
import ToolTipY from "../NavbarComponents/ToolTipY.component";

// Icons
import { IoMdAdd } from "react-icons/io";
import Pdf from "../../assets/file-type-pdf.svg";
import { BsThreeDotsVertical } from "react-icons/bs";
import Excel from "../../assets/file-type-excel.svg";

import { gridFilteredSortedRowIdsSelector } from "@mui/x-data-grid";

function Controls2(props) {
    function handleDownloadPdf() {
        if (!props.apiRef) return;

        let filteredRowIndexArray = gridFilteredSortedRowIdsSelector(props.apiRef);
        let filteredRow = [];
        for (let i of filteredRowIndexArray) {
            filteredRow.push(props.apiRef.current.getRow(i));
        }

        if (filteredRow.length === 0) {
            alert("No data to print");
            return;
        }

        const tableColumns = Object.keys(filteredRow[0]); // Extract column names from the first data object
        const tableRows = [];

        // Prepare the table data
        filteredRow.forEach((item) => {
            const rowData = tableColumns.map((column) => item[column]);
            tableRows.push(rowData);
        });

        let width = tableColumns.length * 3;
        let height = tableColumns.length * 4;

        const doc = new jsPDF({
            orientation: "portrait",
            unit: "cm",
            format: [width, height],
        });

        autoTable(
            doc,
            {
                head: [tableColumns],
                body: tableRows,
            },
            { startY: 20 }
        );

        // Save the PDF
        doc.save("data.pdf");
    }

    function handleDownloadCsv() {
        if (!props.apiRef) return;

        let filteredRowIndexArray = gridFilteredSortedRowIdsSelector(props.apiRef);
        let filteredRow = [];
        for (let i of filteredRowIndexArray) {
            filteredRow.push(props.apiRef.current.getRow(i));
        }

        if (filteredRow.length === 0) {
            alert("No data to print");
            return;
        }

        const csv = Papa.unparse(filteredRow); // Convert the data object to CSV format

        const blob = new Blob([csv], { type: "text/csv" }); // Create a Blob from the CSV data
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.csv"); // Set the download filename
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2 grow md:max-w-[100px]">
                    <Button
                        variant="contained"
                        className="bg-first grow shrink"
                        onClick={props.onClick1}
                    >
                        <div className="flex items-center text-white">
                            <IoMdAdd />
                            <span className="ml-2 capitalize font-[400] whitespace-nowrap">
                                Add
                            </span>
                        </div>
                    </Button>
                    {/* <Button
                        variant="contained"
                        className="bg-first grow shrink"
                        onClick={handleDownloadPdf}
                    >
                        <div className="flex items-center text-white">
                            <img src={Pdf} className="w-[20px]" alt="" />
                            <span className="ml-2 capitalize font-[400] whitespace-nowrap">
                                Print PDF
                            </span>
                        </div>
                    </Button>
                    <Button
                        variant="contained"
                        className="bg-first grow shrink"
                        onClick={handleDownloadCsv}
                    >
                        <div className="flex items-center text-white">
                            <img src={Excel} alt="" />
                            <span className="ml-2 capitalize font-[400] whitespace-nowrap">
                                Export To Excel
                            </span>
                        </div>
                    </Button> */}
                </div>
                {/* <div className="grow md:max-w-[400px] hidden">
                    <div className="flex items-center px-2 py-1 bg-white border border-gray-300 rounded">
                        <input
                            type="text"
                            className="bg-transparent grow shrink"
                            placeholder="Search"
                        />
                        <AiOutlineSearch />
                    </div>
                </div> */}
                <div className="">
                    <ToolTipY
                        title={
                            <div className="p-1 rounded-full cursor-pointer hover:bg-white">
                                <BsThreeDotsVertical />
                            </div>
                        }
                        content={
                            <>
                                <div className="flex flex-col gap-2 p-5 mx-2 bg-white border border-gray-300 shadow-lg rounded-xl">
                                    <Button
                                        variant="text"
                                        className="pl-3 text-gray-600 grow shrink"
                                        onClick={handleDownloadPdf}
                                    >
                                        <div className="flex min-w-[150px] justify-start w-full">
                                            <img src={Pdf} className="w-[20px]" alt="" />
                                            <span className="ml-2 text-gray-600 capitalize whitespace-nowrap">
                                                Print PDF
                                            </span>
                                        </div>
                                    </Button>
                                    <Button
                                        variant="text"
                                        className="text-gray-600 grow shrink"
                                        onClick={handleDownloadCsv}
                                    >
                                        <div className="flex min-w-[150px] justify-start w-full">
                                            <img src={Excel} alt="" />
                                            <span className="ml-2 text-gray-600 capitalize whitespace-nowrap">
                                                Export To Excel
                                            </span>
                                        </div>
                                    </Button>
                                </div>
                            </>
                        }
                        height="300px"
                        direction="down"
                        position="right"
                    ></ToolTipY>
                </div>
            </div>
        </>
    );
}

export default Controls2;

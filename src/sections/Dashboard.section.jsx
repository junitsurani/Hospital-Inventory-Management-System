import * as React from "react";

// Icons
import { MdDateRange } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";

function Dashboard() {
    return (
        <section className="">
            {/* Date Selection */}
            <div className="flex flex-col justify-between gap-3 p-2 bg-white border rounded lg:items-center lg:flex-row">
                {/* Date */}
                <div className="flex justify-center gap-3 grow max-w-[500px]">
                    <div className="flex items-center justify-end p-1 rounded bg-first">
                        <MdDateRange className="text-white icon h-[25px] w-[25px] font-[15px]" />
                    </div>
                    <div className="flex items-center px-2 text-xs bg-white rounded shadow text-first grow shrink ">
                        Start&nbsp;:
                        <input
                            type="date"
                            name=""
                            className="bg-white grow shrink w-[100px]"
                            id=""
                        />
                    </div>
                    <div className="flex items-center px-2 text-xs bg-white rounded shadow text-first grow shrink">
                        end&nbsp;:
                        <input
                            type="date"
                            name=""
                            className="bg-white grow shrink w-[100px]"
                            id=""
                        />
                    </div>
                </div>

                {/* Search */}
                <div className=" items-center gap-1 px-2 py-2 text-white rounded bg-first hidden">
                    <input
                        type="text"
                        className="w-full text-xs capitalize bg-transparent placeholder:text-white"
                        placeholder="Search"
                    />
                    <AiOutlineSearch />
                </div>
            </div>

            {/* Data grid */}
            <div className="mt-3 bg-white rounded"></div>

            {/* Mutiple search */}
            <div className="mt-3"></div>
        </section>
    );
}

export default Dashboard;
